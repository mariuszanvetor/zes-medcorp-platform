import "./load-env.mjs";
import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  createSession,
  domainFromUrl,
  importCandidates,
  initDb,
  loadDb,
  outputDir,
  projectRoot,
  saveDb,
  writeCsv,
} from "./core.mjs";
import { categories, categoryById } from "./config.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (name, fallback = "") => {
  const prefix = `--${name}=`;
  const inline = args.find((arg) => arg.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] || fallback : fallback;
};
const hasFlag = (name) => args.includes(`--${name}`);
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const limit = Math.min(Math.max(Number(flag("limit", "30")) || 30, 1), 100);
const categoryId = flag("category", "centre-radiologie-rx");
const city = flag("city", "Bucuresti");
const queryOverride = flag("query");
const fixturePath = flag("fixture");
const skipExport = hasFlag("skip-export");
const dryRun = hasFlag("dry-run");
const category = categoryById(categoryId);
const excludedDomains = new Set([
  "google.com",
  "bing.com",
  "google.ro",
  "facebook.com",
  "instagram.com",
  "linkedin.com",
  "youtube.com",
  "maps.google.com",
]);
const googlePlaceDetailsCache = new Map();

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function normalizeUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    url.hash = "";
    return url.toString();
  } catch {
    return "";
  }
}

function redactSecrets(value) {
  let redacted = String(value ?? "");
  for (const secret of [
    process.env.GOOGLE_CUSTOM_SEARCH_API_KEY,
    process.env.GOOGLE_PLACES_API_KEY,
    process.env.BING_SEARCH_API_KEY,
  ].filter(Boolean)) {
    redacted = redacted.replaceAll(secret, "<redacted>");
  }
  return redacted
    .replace(/([?&]key=)[^&\s"]+/gi, "$1<redacted>")
    .replace(/("key"\s*:\s*")[^"]+/gi, '$1<redacted>')
    .replace(/(X-Goog-Api-Key["']?\s*[:=]\s*["']?)[^"',\s]+/gi, "$1<redacted>");
}

function logPlacesRequest(url) {
  console.log(`[google-places] request ${redactSecrets(url)}`);
}

function logPlacesError(label, body) {
  console.error(`[google-places] ${label} response ${redactSecrets(body).slice(0, 4000)}`);
}

async function fetchPlacesJson(url) {
  logPlacesRequest(url);
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  const body = await response.text();
  if (!response.ok) {
    logPlacesError(`HTTP ${response.status}`, body);
    throw new Error(`Google Places HTTP ${response.status}`);
  }
  try {
    return JSON.parse(body);
  } catch {
    logPlacesError("invalid JSON", body);
    throw new Error("Google Places returned invalid JSON");
  }
}

function queryList() {
  if (queryOverride) return [queryOverride];
  return category.queries.map((query) => query.replaceAll("{city}", city));
}

function auditEntry({ sessionId, provider, query, candidate = {}, domain = "", event, reason = "", sourceUrls = [] }) {
  return {
    auditId: `AUDIT-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    sessionId,
    provider,
    query,
    event,
    reason,
    companyName: candidate.companyName || "",
    domain,
    website: candidate.website || "",
    sourceUrls: unique(sourceUrls),
    recordedAt: new Date().toISOString(),
  };
}

async function googleCustomSearch(query) {
  const key = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY;
  const cx = process.env.GOOGLE_CUSTOM_SEARCH_CX;
  if (!key || !cx) return { provider: "google-custom-search", skipped: "Missing GOOGLE_CUSTOM_SEARCH_API_KEY or GOOGLE_CUSTOM_SEARCH_CX", candidates: [] };
  const candidates = [];
  for (let start = 1; candidates.length < limit && start <= 91; start += 10) {
    const url = new URL("https://customsearch.googleapis.com/customsearch/v1");
    url.searchParams.set("key", key);
    url.searchParams.set("cx", cx);
    url.searchParams.set("q", query);
    url.searchParams.set("num", String(Math.min(10, limit - candidates.length)));
    url.searchParams.set("start", String(start));
    const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(`Google Custom Search HTTP ${response.status}`);
    const payload = await response.json();
    for (const item of payload.items || []) {
      candidates.push({
        provider: "google-custom-search",
        companyName: item.title || "",
        website: normalizeUrl(item.link),
        sourceUrls: [normalizeUrl(item.link)],
        providerSnippet: item.snippet || "",
      });
    }
    if (!(payload.items || []).length) break;
    await delay(300);
  }
  return { provider: "google-custom-search", candidates };
}

async function googlePlacesSearch(query) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return { provider: "google-places", skipped: "Missing GOOGLE_PLACES_API_KEY", candidates: [] };
  const candidates = [];
  let pageToken = "";
  do {
    const url = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
    url.searchParams.set("query", query);
    url.searchParams.set("language", "ro");
    url.searchParams.set("key", key);
    if (pageToken) url.searchParams.set("pagetoken", pageToken);
    const data = await fetchPlacesJson(url);
    if (!["OK", "ZERO_RESULTS"].includes(data.status)) {
      logPlacesError(`legacy status ${data.status || "UNKNOWN"}`, JSON.stringify(data));
      throw new Error(`Google Places legacy status ${data.status || "UNKNOWN"}`);
    }
    for (const place of data.results || []) {
      let detailsPromise = googlePlaceDetailsCache.get(place.place_id);
      if (!detailsPromise) {
        const detailsUrl = new URL("https://maps.googleapis.com/maps/api/place/details/json");
        detailsUrl.searchParams.set("place_id", place.place_id);
        detailsUrl.searchParams.set(
          "fields",
          "name,formatted_address,website,formatted_phone_number,international_phone_number,url",
        );
        detailsUrl.searchParams.set("language", "ro");
        detailsUrl.searchParams.set("key", key);
        detailsPromise = fetchPlacesJson(detailsUrl);
        googlePlaceDetailsCache.set(place.place_id, detailsPromise);
      }
      const detailsData = await detailsPromise;
      if (!["OK", "ZERO_RESULTS"].includes(detailsData.status)) {
        logPlacesError(`legacy details status ${detailsData.status || "UNKNOWN"}`, JSON.stringify(detailsData));
        continue;
      }
      const details = detailsData.result || {};
      candidates.push({
        provider: "google-places",
        companyName: details.name || place.name || "",
        website: normalizeUrl(details.website),
        publicPhone: details.international_phone_number || details.formatted_phone_number || "",
        city,
        sourceUrls: unique([details.url, details.website].map(normalizeUrl)),
        providerSnippet: details.formatted_address || place.formatted_address || "",
      });
      if (candidates.length >= limit) break;
      await delay(150);
    }
    pageToken = data.next_page_token || "";
    if (pageToken) await delay(2000);
  } while (pageToken && candidates.length < limit);
  return { provider: "google-places", candidates };
}

async function bingApprovedEndpointSearch(query) {
  const endpoint = process.env.BING_SEARCH_ENDPOINT;
  const key = process.env.BING_SEARCH_API_KEY;
  if (!endpoint || !key) {
    return {
      provider: "bing-approved-endpoint",
      skipped:
        "Bing Search APIs were retired by Microsoft on 2025-08-11. Configure BING_SEARCH_ENDPOINT and BING_SEARCH_API_KEY only for an approved compatible endpoint.",
      candidates: [],
    };
  }
  const candidates = [];
  for (let offset = 0; candidates.length < limit; offset += 10) {
    const url = new URL(endpoint);
    url.searchParams.set("q", query);
    url.searchParams.set("count", String(Math.min(10, limit - candidates.length)));
    url.searchParams.set("offset", String(offset));
    const response = await fetch(url, {
      headers: { "Ocp-Apim-Subscription-Key": key },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`Approved Bing-compatible endpoint HTTP ${response.status}`);
    const payload = await response.json();
    const values = payload.webPages?.value || [];
    values.forEach((item) =>
      candidates.push({
        provider: "bing-approved-endpoint",
        companyName: item.name || "",
        website: normalizeUrl(item.url),
        sourceUrls: [normalizeUrl(item.url)],
        providerSnippet: item.snippet || "",
      }),
    );
    if (!values.length) break;
    await delay(300);
  }
  return { provider: "bing-approved-endpoint", candidates };
}

function textFromHtml(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function emailsFromHtml(html) {
  const mailtos = [...html.matchAll(/mailto:([^"'? >]+)/gi)].map((match) => match[1]);
  const text = textFromHtml(html);
  const inline = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [];
  return unique([...mailtos, ...inline].map((email) => email.toLowerCase())).filter(
    (email) => !/example\.com|domain\.com|wixpress|sentry|cloudflare/i.test(email),
  );
}

function phonesFromHtml(html) {
  const tels = [...html.matchAll(/tel:([^"'? >]+)/gi)].map((match) => match[1].replaceAll("%20", " "));
  const text = textFromHtml(html);
  const inline = text.match(/(?:\+40|0040|0)[\s().-]*(?:\d[\s().-]*){8,10}/g) || [];
  return unique([...tels, ...inline].map((phone) => phone.trim()));
}

export function extractPublicBusinessContacts(html) {
  return {
    publicEmails: emailsFromHtml(html),
    publicPhones: phonesFromHtml(html),
  };
}

function contactPaths(homepage) {
  const url = new URL(homepage);
  return unique([
    url.toString(),
    new URL("/contact", url).toString(),
    new URL("/contact/", url).toString(),
    new URL("/contacte", url).toString(),
    new URL("/contact-us", url).toString(),
  ]);
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "ZESCORPLeadResearchAssistant/1.0 (+https://zescorp.ro)" },
    redirect: "follow",
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`Official website HTTP ${response.status}`);
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) throw new Error(`Unsupported content-type ${contentType}`);
  return { html: await response.text(), finalUrl: response.url };
}

async function inspectOfficialWebsite(candidate) {
  if (candidate.fixtureHtml) {
    const contacts = extractPublicBusinessContacts(candidate.fixtureHtml);
    return {
      website: candidate.website,
      contactPage: candidate.website,
      publicEmail: contacts.publicEmails[0] || candidate.publicEmail || "",
      publicPhone: contacts.publicPhones[0] || candidate.publicPhone || "",
      sourceUrls: unique(candidate.sourceUrls || [candidate.website]),
      pagesChecked: [candidate.website],
    };
  }
  const website = normalizeUrl(candidate.website);
  const domain = domainFromUrl(website);
  if (!website || !domain) throw new Error("Missing official website");
  const pagesChecked = [];
  const sourceUrls = [];
  const publicEmails = [];
  const publicPhones = [];
  let contactPage = "";
  for (const page of contactPaths(website).slice(0, 3)) {
    try {
      const result = await fetchHtml(page);
      if (domainFromUrl(result.finalUrl) !== domain) continue;
      pagesChecked.push(result.finalUrl);
      sourceUrls.push(result.finalUrl);
      const contacts = extractPublicBusinessContacts(result.html);
      publicEmails.push(...contacts.publicEmails);
      publicPhones.push(...contacts.publicPhones);
      if (page !== website && (contacts.publicEmails.length || contacts.publicPhones.length)) contactPage = result.finalUrl;
      if (publicEmails.length && publicPhones.length) break;
    } catch {
      // A missing conventional contact path is expected. Continue with the official homepage.
    }
    await delay(350);
  }
  return {
    website,
    contactPage: contactPage || pagesChecked[0] || website,
    publicEmail: unique([candidate.publicEmail, ...publicEmails])[0] || "",
    publicPhone: unique([candidate.publicPhone, ...publicPhones])[0] || "",
    sourceUrls: unique([...(candidate.sourceUrls || []), ...sourceUrls]),
    pagesChecked,
  };
}

function confidenceFor(candidate, official) {
  return Math.min(
    100,
    45 +
      (official.website ? 15 : 0) +
      (official.contactPage ? 10 : 0) +
      (official.publicEmail ? 15 : 0) +
      (official.publicPhone ? 10 : 0) +
      (candidate.companyName ? 5 : 0),
  );
}

async function loadFixture(file) {
  if (!file) return null;
  return JSON.parse(await fs.readFile(path.resolve(projectRoot, file), "utf8"));
}

function providerSummary(providerResults) {
  return providerResults.map(({ provider, skipped = "", candidates = [], error = "" }) => ({
    provider,
    skipped,
    error,
    candidates: candidates.length,
  }));
}

async function runProvider(provider, query) {
  try {
    return await provider(query);
  } catch (error) {
    return { provider: provider.name, error: error.message, candidates: [] };
  }
}

async function exportWorkbook() {
  const builder = path.join(scriptDir, "build-workbook.mjs");
  const result = spawnSync(process.execPath, [builder], { cwd: projectRoot, encoding: "utf8" });
  const workbook = path.join(outputDir, "ZESCORP-Verified-Lead-Research-Assistant.xlsx");
  try {
    await fs.access(workbook);
    return { exported: true, workbook, builderExitCode: result.status, stdout: result.stdout.trim() };
  } catch {
    throw new Error(`Workbook export failed: ${result.stderr || result.stdout}`);
  }
}

await initDb();
const session = await createSession({
  query: queryOverride || queryList().join(" | "),
  category: category.id,
  city,
  notes: "Autonomous discovery session. Search APIs only; official website crawl is same-domain, limited and public-business-only.",
});
const db = await loadDb();
const processedDomains = new Map((db.processedDomains || []).map((entry) => [entry.domain, entry]));
for (const lead of db.leads) {
  const domain = domainFromUrl(lead.website);
  if (domain && !processedDomains.has(domain)) {
    processedDomains.set(domain, {
      domain,
      firstProcessedAt: lead.dateDiscovered,
      lastProcessedAt: lead.lastSeenAt,
      status: "verified-existing",
      leadId: lead.leadId,
    });
  }
}

const fixture = await loadFixture(fixturePath);
const providerResults = fixture
  ? [{ provider: "fixture", candidates: fixture }]
  : (
      await Promise.all(
        queryList().flatMap((query) => [
          runProvider(googleCustomSearch, query),
          runProvider(googlePlacesSearch, query),
          runProvider(bingApprovedEndpointSearch, query),
        ]),
      )
    );
const candidates = providerResults.flatMap((result) =>
  (result.candidates || []).map((candidate) => ({ ...candidate, provider: candidate.provider || result.provider })),
);
const pending = [];
let skippedProcessedDomains = 0;
let rejectedWithoutWebsite = 0;

for (const candidate of candidates) {
  if (pending.length >= limit) break;
  const website = normalizeUrl(candidate.website);
  const domain = domainFromUrl(website);
  if (!domain || excludedDomains.has(domain)) {
    db.discoveryAudit.push(
      auditEntry({
        sessionId: session.sessionId,
        provider: candidate.provider,
        query: queryOverride || "",
        candidate,
        domain,
        event: "rejected",
        reason: "Missing or unsupported official website domain",
        sourceUrls: candidate.sourceUrls,
      }),
    );
    rejectedWithoutWebsite += 1;
    continue;
  }
  if (processedDomains.has(domain)) {
    const existing = processedDomains.get(domain);
    existing.lastSeenAt = new Date().toISOString();
    existing.skipCount = Number(existing.skipCount || 0) + 1;
    db.discoveryAudit.push(
      auditEntry({
        sessionId: session.sessionId,
        provider: candidate.provider,
        query: queryOverride || "",
        candidate,
        domain,
        event: "skipped-processed-domain",
        reason: "Persistent processed domain memory",
        sourceUrls: candidate.sourceUrls,
      }),
    );
    skippedProcessedDomains += 1;
    continue;
  }
  processedDomains.set(domain, {
    domain,
    firstProcessedAt: new Date().toISOString(),
    lastProcessedAt: new Date().toISOString(),
    status: "processing",
    provider: candidate.provider,
  });
  try {
    const official = await inspectOfficialWebsite(candidate);
    const confidenceScore = confidenceFor(candidate, official);
    const enriched = {
      companyName: candidate.companyName || domain,
      category: category.id,
      subcategory: category.label,
      city: candidate.city || city,
      county: "",
      country: "Romania",
      website: official.website,
      contactPage: official.contactPage,
      publicEmail: official.publicEmail,
      publicPhone: official.publicPhone,
      sourceUrls: official.sourceUrls,
      sourceType: `Official website after ${candidate.provider}`,
      fieldSources: {
        companyName: candidate.sourceUrls?.[0] || official.website,
        website: official.website,
        contactPage: official.contactPage,
        publicEmail: official.publicEmail ? official.contactPage : "",
        publicPhone: official.publicPhone ? official.contactPage : "",
      },
      confidenceScore,
      outreachStatus: confidenceScore >= 80 && (official.publicEmail || official.publicPhone)
        ? "Verified Public Contact"
        : "Needs Manual Verification",
      notes: `Auto-discovered via ${candidate.provider}. Human review required before Ready for Outreach.`,
    };
    pending.push(enriched);
    db.discoveryAudit.push(
      auditEntry({
        sessionId: session.sessionId,
        provider: candidate.provider,
        query: queryOverride || "",
        candidate: enriched,
        domain,
        event: "official-website-inspected",
        reason: `confidence=${confidenceScore}`,
        sourceUrls: official.sourceUrls,
      }),
    );
    processedDomains.get(domain).status = "inspected";
  } catch (error) {
    processedDomains.get(domain).status = "inspection-error";
    processedDomains.get(domain).error = error.message;
    db.discoveryAudit.push(
      auditEntry({
        sessionId: session.sessionId,
        provider: candidate.provider,
        query: queryOverride || "",
        candidate,
        domain,
        event: "inspection-error",
        reason: error.message,
        sourceUrls: candidate.sourceUrls,
      }),
    );
  }
  await delay(500);
}

db.processedDomains = [...processedDomains.values()];
const currentSession = db.sessions.find((entry) => entry.sessionId === session.sessionId);
if (currentSession) {
  currentSession.notes += ` Providers: ${JSON.stringify(providerSummary(providerResults))}`;
  currentSession.sourceUrlsChecked = unique(candidates.flatMap((candidate) => candidate.sourceUrls || []));
}
await saveDb(db);
const imported = dryRun
  ? { sessionId: session.sessionId, added: [], duplicates: [], rejected: [], dryRun: true }
  : await importCandidates(pending, { sessionId: session.sessionId, sourceLabel: "autonomous-discovery" });
const workbook = skipExport ? { exported: false, skipped: true } : await exportWorkbook();
await writeCsv(path.join(outputDir, `${session.sessionId}-auto-discovery-audit.csv`), (await loadDb()).discoveryAudit);

console.log(
  JSON.stringify(
    {
      ok: true,
      sessionId: session.sessionId,
      category: category.id,
      city,
      limit,
      providers: providerSummary(providerResults),
      discoveredCandidates: candidates.length,
      processedOfficialSites: pending.length,
      skippedProcessedDomains,
      rejectedWithoutWebsite,
      added: imported.added.length,
      duplicatesMerged: imported.duplicates.length,
      rejected: imported.rejected.length,
      humanReviewRequired: true,
      automaticSending: false,
      workbook,
    },
    null,
    2,
  ),
);
