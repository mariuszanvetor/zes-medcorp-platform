import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const articlePath = path.join(root, "src", "data", "articles.ts");
const authorityBatchPath = path.join(root, "src", "data", "authority-batch-70.ts");
const comparisonPath = path.join(root, "src", "data", "comparisons.ts");
const glossaryPath = path.join(root, "src", "data", "glossary.ts");
const calculatorPath = path.join(root, "src", "data", "calculators.ts");
const serviceFunnelsPath = path.join(root, "src", "data", "service-funnels.ts");
const planningPath = path.join(root, "src", "data", "planning-journeys.ts");
const seoIndexingPath = path.join(root, "src", "data", "seo-indexing-priorities.ts");
const appDir = path.join(root, "src", "app");
const publicDir = path.join(root, "public");

const errors = [];
const warnings = [];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, out);
    } else {
      out.push(fullPath);
    }
  }

  return out;
}

function extractArticleBlocks(source, startToken, endToken = null) {
  const start = source.indexOf(startToken);

  if (start === -1) {
    errors.push(`Could not locate ${startToken} in article source.`);
    return [];
  }

  const arrayStart = source.indexOf("[", start);
  const end = endToken ? source.indexOf(endToken, arrayStart) : source.length;
  const body = source.slice(arrayStart + 1, end === -1 ? source.length : end);
  const blocks = [];
  let depth = 0;
  let blockStart = -1;
  let quote = "";
  let escaped = false;

  for (let index = 0; index < body.length; index += 1) {
    const char = body[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = "";
      }
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "{") {
      if (depth === 0) blockStart = index;
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0 && blockStart !== -1) {
        blocks.push(body.slice(blockStart, index + 1));
        blockStart = -1;
      }
    }
  }

  return blocks.filter((block) => /slug:\s*"/.test(block));
}

function extractGlossarySlugs(source) {
  const start = source.indexOf("const glossarySeeds");
  const end = source.indexOf("function buildFaqs");

  if (start === -1 || end === -1) {
    errors.push("Could not locate glossarySeeds in src/data/glossary.ts.");
    return [];
  }

  const body = source.slice(start, end);
  return [...body.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
}

function extractPlanningSlugs(source) {
  const start = source.indexOf("export const planningJourneys");
  const end = source.indexOf("export function getPlanningJourneyBySlug");

  if (start === -1 || end === -1) {
    errors.push("Could not locate planningJourneys in src/data/planning-journeys.ts.");
    return [];
  }

  const body = source.slice(start, end);
  return [...body.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
}

function extractSeoIndexingUrls(source) {
  const start = source.indexOf("export const seoIndexingPriorityGroups");
  const end = source.indexOf("export const seoIndexingPriorityItems");

  if (start === -1 || end === -1) {
    errors.push("Could not locate seoIndexingPriorityGroups in src/data/seo-indexing-priorities.ts.");
    return [];
  }

  const body = source.slice(start, end);
  return [...body.matchAll(/item\("([^"]+)"/g)].map((match) => match[1]);
}

function extractComparisonBlocks(source) {
  const start = source.indexOf("export const comparisonPages");

  if (start === -1) {
    errors.push("Could not locate comparisonPages in src/data/comparisons.ts.");
    return [];
  }

  const arrayStart = source.indexOf("[", start);
  const body = source.slice(arrayStart + 1);
  const blocks = [];
  let depth = 0;
  let blockStart = -1;
  let quote = "";
  let escaped = false;

  for (let index = 0; index < body.length; index += 1) {
    const char = body[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = "";
      }
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "{") {
      if (depth === 0) blockStart = index;
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0 && blockStart !== -1) {
        blocks.push(body.slice(blockStart, index + 1));
        blockStart = -1;
      }
    }
  }

  return blocks.filter((block) => /slug:\s*"/.test(block));
}

function extractCalculatorBlocks(source) {
  const start = source.indexOf("export const programmaticCalculators");
  const end = source.indexOf("function specificBudget");

  if (start === -1 || end === -1) {
    errors.push("Could not locate programmaticCalculators in src/data/calculators.ts.");
    return [];
  }

  const arrayStart = source.indexOf("[", start);
  const body = source.slice(arrayStart + 1, end);
  const blocks = [];
  let depth = 0;
  let blockStart = -1;
  let quote = "";
  let escaped = false;

  for (let index = 0; index < body.length; index += 1) {
    const char = body[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = "";
      }
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "{") {
      if (depth === 0) blockStart = index;
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0 && blockStart !== -1) {
        blocks.push(body.slice(blockStart, index + 1));
        blockStart = -1;
      }
    }
  }

  return blocks.filter((block) => /slug:\s*"/.test(block));
}

function extractServiceFunnelSlugs(source) {
  return [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
}

function buildRoutes(articleSlugs) {
  const routes = new Set(["/"]);

  for (const file of walk(appDir)) {
    const relative = path.relative(appDir, file).replace(/\\/g, "/");

    if (relative.endsWith("/page.tsx")) {
      let route = `/${relative.replace(/\/page\.tsx$/, "")}`;
      route = route.replace(/\/\([^/]+\)/g, "");
      if (route === "/page") route = "/";
      if (!route.includes("[")) routes.add(route);
    }

    if (relative.endsWith("/route.ts")) {
      const route = `/${relative.replace(/\/route\.ts$/, "")}`;
      if (!route.includes("[")) routes.add(route);
    }
  }

  for (const slug of articleSlugs) {
    routes.add(`/knowledge-hub/${slug}`);
  }

  return routes;
}

function publicAssetExists(urlPath) {
  const cleanPath = urlPath.replace(/^\//, "");
  return fs.existsSync(path.join(publicDir, cleanPath)) || fs.existsSync(path.join(appDir, cleanPath));
}

function getStringField(block, field) {
  return block.match(new RegExp(`${field}:\\s*"([^"]+)"`))?.[1] ?? "";
}

function getArrayBlock(block, field) {
  return block.match(new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`))?.[1] ?? "";
}

function getQuotedValues(source) {
  return [...source.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

function checkArticleBlocks(blocks, articleSlugs, routes) {
  const seen = new Set();
  const seenTitles = new Map();
  const seenTargetKeywords = new Map();
  const requiredFields = [
    "slug",
    "title",
    "description",
    "category",
    "tags",
    "readingTime",
    "targetKeyword",
    "intro",
    "sections",
    "faqs",
    "relatedServices",
    "relatedTools",
    "relatedArticles",
    "cta",
    "publishedAt",
    "updatedAt",
  ];

  for (const block of blocks) {
    const slug = getStringField(block, "slug") || "(missing slug)";

    if (seen.has(slug)) errors.push(`Duplicate article slug: ${slug}`);
    seen.add(slug);

    for (const field of requiredFields) {
      if (!new RegExp(`${field}:`).test(block)) {
        errors.push(`${slug}: missing required field "${field}".`);
      }
    }

    const title = getStringField(block, "title");
    const description = getStringField(block, "description");
    const targetKeyword = getStringField(block, "targetKeyword");
    const questionCount = (block.match(/question:\s*"/g) ?? []).length;
    const sectionCount = (block.match(/id:\s*"/g) ?? []).length;
    const serviceLinks = getQuotedValues(getArrayBlock(block, "relatedServices")).filter((href) =>
      href.startsWith("/services/"),
    );
    const toolLinks = [...block.matchAll(/href:\s*"([^"]+)"/g)]
      .map((match) => match[1])
      .filter((href) => href.startsWith("/"));
    const relatedArticles = getQuotedValues(getArrayBlock(block, "relatedArticles"));
    const ctaHref = block.match(/cta:\s*{[\s\S]*?href:\s*"([^"]+)"/)?.[1];

    if (!title || title.length < 20) warnings.push(`${slug}: title may be too short.`);
    if (title) {
      const normalizedTitle = title.toLowerCase();
      const previousSlug = seenTitles.get(normalizedTitle);
      if (previousSlug) {
        errors.push(`${slug}: duplicate title also used by ${previousSlug}.`);
      }
      seenTitles.set(normalizedTitle, slug);
    }
    if (!description || description.length < 90) warnings.push(`${slug}: description may be too short.`);
    if (description.length > 220) warnings.push(`${slug}: description may be too long for clean SERP snippets.`);
    if (!targetKeyword) errors.push(`${slug}: missing targetKeyword.`);
    if (targetKeyword) {
      const normalizedKeyword = targetKeyword.toLowerCase();
      const previousSlug = seenTargetKeywords.get(normalizedKeyword);
      if (previousSlug) {
        errors.push(`${slug}: duplicate targetKeyword also used by ${previousSlug}.`);
      }
      seenTargetKeywords.set(normalizedKeyword, slug);
    }
    if (sectionCount < 3) errors.push(`${slug}: expected at least 3 sections.`);
    if (questionCount < 3) errors.push(`${slug}: expected at least 3 FAQ questions.`);
    if (serviceLinks.length < 1) errors.push(`${slug}: expected at least one related service.`);
    if (toolLinks.length < 1) errors.push(`${slug}: expected at least one related tool or CTA URL.`);

    for (const href of [...serviceLinks, ...toolLinks, ctaHref].filter(Boolean)) {
      if (href.startsWith("/api/")) continue;
      if (!routes.has(href) && !/\.[a-z0-9]{2,5}$/i.test(href)) {
        errors.push(`${slug}: unresolved internal URL "${href}".`);
      }
    }

    for (const relatedSlug of relatedArticles) {
      if (!articleSlugs.has(relatedSlug)) {
        errors.push(`${slug}: related article slug does not exist: ${relatedSlug}`);
      }
    }

    const lower = block.toLowerCase();
    const hypeTerms = ["premium", "enterprise", "advanced", "ai-assisted", "world-class"];
    const hypeCount = hypeTerms.reduce(
      (sum, term) => sum + (lower.match(new RegExp(term, "g")) ?? []).length,
      0,
    );

    if (hypeCount > 8) {
      warnings.push(`${slug}: repeated marketing terms detected. Review for AI-spam tone.`);
    }

    if (toolLinks.length > 16) {
      warnings.push(`${slug}: many internal links detected. Review for over-linking and anchor repetition.`);
    }

    const locationTerms = ["bucuresti", "cluj", "iasi", "timisoara", "brasov", "constanta"];
    const locationMentions = locationTerms.filter((term) => lower.includes(term));
    if (locationMentions.length > 3) {
      warnings.push(`${slug}: multiple city terms detected. Review to avoid location-doorway patterns.`);
    }

    const mentionsRmnAndLead = lower.includes("rmn") && (lower.includes("plumb") || lower.includes("lead"));
    const hasSeparationLanguage =
      lower.includes("nu ") ||
      lower.includes("nu este") ||
      lower.includes("nu trebuie confund") ||
      lower.includes("separ");

    if (mentionsRmnAndLead && !hasSeparationLanguage) {
      warnings.push(`${slug}: mentions RMN and lead/plumb without obvious separation language.`);
    }

    if (lower.includes("cncan") && lower.includes("rf shielding") && !hasSeparationLanguage) {
      warnings.push(`${slug}: mentions CNCAN and RF shielding without obvious distinction language.`);
    }
  }
}

function checkComparisonBlocks(blocks, comparisonSlugs, articleSlugs, glossarySlugs, routes) {
  const seen = new Set();
  const seenTitles = new Map();
  const seenTargetKeywords = new Map();
  const requiredFields = [
    "slug",
    "title",
    "description",
    "targetKeyword",
    "intent",
    "hubGroup",
    "category",
    "intro",
    "summaryVerdict",
    "entities",
    "comparisonTable",
    "decisionFactors",
    "costImplications",
    "infrastructureImplications",
    "regulatoryNotes",
    "mistakesToAvoid",
    "faqs",
    "relatedServices",
    "relatedCalculators",
    "relatedArticles",
    "relatedGlossaryTerms",
    "cta",
    "publishedAt",
    "updatedAt",
  ];

  for (const block of blocks) {
    const slug = getStringField(block, "slug") || "(missing slug)";

    if (seen.has(slug)) errors.push(`Duplicate comparison slug: ${slug}`);
    seen.add(slug);

    for (const field of requiredFields) {
      if (!new RegExp(`${field}:`).test(block)) {
        errors.push(`${slug}: missing required field "${field}".`);
      }
    }

    const title = getStringField(block, "title");
    const description = getStringField(block, "description");
    const targetKeyword = getStringField(block, "targetKeyword");
    const questionCount = (block.match(/question:\s*"/g) ?? []).length;
    const entityCount = (block.match(/chooseWhen:\s*\[/g) ?? []).length;
    const rowCount = (block.match(/label:\s*"/g) ?? []).length;
    const serviceLinks = getQuotedValues(getArrayBlock(block, "relatedServices")).filter((href) =>
      href.startsWith("/services/"),
    );
    const calculatorLinks = getQuotedValues(getArrayBlock(block, "relatedCalculators")).filter((href) =>
      href.startsWith("/calculatoare/"),
    );
    const articleLinks = getQuotedValues(getArrayBlock(block, "relatedArticles")).filter((href) =>
      href.startsWith("/knowledge-hub/"),
    );
    const glossaryLinks = getQuotedValues(getArrayBlock(block, "relatedGlossaryTerms")).filter((href) =>
      href.startsWith("/glosar/"),
    );
    const ctaHref = block.match(/cta:\s*{[\s\S]*?href:\s*"([^"]+)"/)?.[1];

    if (!title || title.length < 24) warnings.push(`${slug}: title may be too short.`);
    if (title) {
      const normalizedTitle = title.toLowerCase();
      const previousSlug = seenTitles.get(normalizedTitle);
      if (previousSlug) {
        errors.push(`${slug}: duplicate title also used by ${previousSlug}.`);
      }
      seenTitles.set(normalizedTitle, slug);
    }
    if (!description || description.length < 90) warnings.push(`${slug}: description may be too short.`);
    if (description.length > 220) warnings.push(`${slug}: description may be too long for clean SERP snippets.`);
    if (!targetKeyword) errors.push(`${slug}: missing targetKeyword.`);
    if (targetKeyword) {
      const normalizedKeyword = targetKeyword.toLowerCase();
      const previousSlug = seenTargetKeywords.get(normalizedKeyword);
      if (previousSlug) {
        errors.push(`${slug}: duplicate targetKeyword also used by ${previousSlug}.`);
      }
      seenTargetKeywords.set(normalizedKeyword, slug);
    }
    if (entityCount < 2) errors.push(`${slug}: expected at least 2 comparison entities.`);
    if (rowCount < 4) errors.push(`${slug}: expected at least 4 comparison rows.`);
    if (questionCount < 4) errors.push(`${slug}: expected at least 4 FAQ questions.`);
    if (serviceLinks.length < 1) errors.push(`${slug}: expected at least one related service.`);
    if (calculatorLinks.length < 1) errors.push(`${slug}: expected at least one related calculator.`);
    if (articleLinks.length < 1) errors.push(`${slug}: expected at least one related article.`);
    if (glossaryLinks.length < 1) errors.push(`${slug}: expected at least one related glossary term.`);

    for (const href of [...serviceLinks, ...calculatorLinks, ...articleLinks, ...glossaryLinks, ctaHref].filter(Boolean)) {
      if (href.startsWith("/api/")) continue;
      if (!routes.has(href) && !/\.[a-z0-9]{2,5}$/i.test(href)) {
        errors.push(`${slug}: unresolved internal URL "${href}".`);
      }
    }

    for (const relatedSlug of [...articleLinks, ...glossaryLinks]) {
      const cleanSlug = relatedSlug.split("/").pop();
      if (relatedSlug.startsWith("/knowledge-hub/")) {
        if (!articleSlugs.has(cleanSlug)) {
          errors.push(`${slug}: related article slug does not exist: ${cleanSlug}`);
        }
      }
      if (relatedSlug.startsWith("/glosar/")) {
        if (!glossarySlugs.has(cleanSlug)) {
          errors.push(`${slug}: related glossary slug does not exist: ${cleanSlug}`);
        }
      }
    }

    const lower = block.toLowerCase();
    const hypeTerms = ["premium", "enterprise", "advanced", "ai-assisted", "world-class"];
    const hypeCount = hypeTerms.reduce(
      (sum, term) => sum + (lower.match(new RegExp(term, "g")) ?? []).length,
      0,
    );

    if (hypeCount > 8) {
      warnings.push(`${slug}: repeated marketing terms detected. Review for AI-spam tone.`);
    }

    if (lower.includes("rf shielding") && lower.includes("plumb") && !lower.includes("nu ")) {
      warnings.push(`${slug}: mentions RMN/RF and plumb without obvious separation language.`);
    }

    if (lower.includes("cncan") && lower.includes("rf shielding") && !lower.includes("nu ")) {
      warnings.push(`${slug}: mentions CNCAN and RF shielding without obvious distinction language.`);
    }
  }
}

function checkCalculatorBlocks(blocks, routes) {
  const seen = new Set();
  const seenTitles = new Map();
  const seenTargetKeywords = new Map();
  const requiredFields = [
    "slug",
    "title",
    "description",
    "eyebrow",
    "purpose",
    "targetKeyword",
    "keywords",
    "fields",
    "faq",
    "primaryCta",
    "secondaryCta",
    "relatedLinks",
  ];

  for (const block of blocks) {
    const slug = getStringField(block, "slug") || "(missing slug)";

    if (seen.has(slug)) errors.push(`Duplicate calculator slug: ${slug}`);
    seen.add(slug);

    for (const field of requiredFields) {
      if (!new RegExp(`${field}:`).test(block)) {
        errors.push(`${slug}: missing required field "${field}".`);
      }
    }

    const title = getStringField(block, "title");
    const description = getStringField(block, "description");
    const targetKeyword = getStringField(block, "targetKeyword");
    const questionCount = (block.match(/question:\s*"/g) ?? []).length;
    const relatedLinks = getQuotedValues(getArrayBlock(block, "relatedLinks")).filter((href) =>
      href.startsWith("/"),
    );
    const ctaHrefs = [
      ...block.matchAll(/primaryCta:\s*{[\s\S]*?href:\s*"([^"]+)"/g),
      ...block.matchAll(/secondaryCta:\s*{[\s\S]*?href:\s*"([^"]+)"/g),
    ]
      .map((match) => match[1])
      .filter(Boolean);

    if (!title || title.length < 18) warnings.push(`${slug}: title may be too short.`);
    if (title) {
      const normalizedTitle = title.toLowerCase();
      const previousSlug = seenTitles.get(normalizedTitle);
      if (previousSlug) {
        errors.push(`${slug}: duplicate title also used by ${previousSlug}.`);
      }
      seenTitles.set(normalizedTitle, slug);
    }
    if (!description || description.length < 80) warnings.push(`${slug}: description may be too short.`);
    if (!targetKeyword) errors.push(`${slug}: missing targetKeyword.`);
    if (targetKeyword) {
      const normalizedKeyword = targetKeyword.toLowerCase();
      const previousSlug = seenTargetKeywords.get(normalizedKeyword);
      if (previousSlug) {
        errors.push(`${slug}: duplicate targetKeyword also used by ${previousSlug}.`);
      }
      seenTargetKeywords.set(normalizedKeyword, slug);
    }
    if (questionCount < 2) warnings.push(`${slug}: expected at least 2 FAQ questions.`);
    if (relatedLinks.length < 2) warnings.push(`${slug}: expected at least 2 related links.`);

    for (const href of [...relatedLinks, ...ctaHrefs]) {
      if (href.startsWith("/api/")) continue;
      if (!routes.has(href) && !/\.[a-z0-9]{2,5}$/i.test(href)) {
        errors.push(`${slug}: unresolved internal URL "${href}".`);
      }
    }

    const lower = block.toLowerCase();
    if (lower.includes("rf shielding") && lower.includes("plumb") && !lower.includes("nu ")) {
      warnings.push(`${slug}: mentions RF shielding and plumb without obvious separation language.`);
    }
    if (lower.includes("cncan") && lower.includes("rf shielding") && !lower.includes("nu ")) {
      warnings.push(`${slug}: mentions CNCAN and RF shielding without obvious distinction language.`);
    }
  }
}

function checkInternalReferences(routes) {
  const sourceFiles = walk(path.join(root, "src")).filter((file) => /\.(tsx?|jsx?)$/.test(file));
  const linkPatterns = [
    /href\s*=\s*"([^"]+)"/g,
    /href\s*=\s*'([^']+)'/g,
    /href:\s*"([^"]+)"/g,
    /href:\s*'([^']+)'/g,
    /src\s*=\s*"([^"]+)"/g,
    /src:\s*"([^"]+)"/g,
  ];

  for (const file of sourceFiles) {
    const source = fs.readFileSync(file, "utf8");

    for (const pattern of linkPatterns) {
      for (const match of source.matchAll(pattern)) {
        const raw = match[1];

        if (!raw || !raw.startsWith("/") || raw.startsWith("//") || raw.includes("${") || raw.includes("[")) {
          continue;
        }

        const clean = raw.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
        if (clean.startsWith("/api/")) continue;

        if (/\.[a-z0-9]{2,5}$/i.test(clean)) {
          if (!publicAssetExists(clean)) {
            errors.push(`${path.relative(root, file)}: missing asset reference "${raw}".`);
          }
        } else if (!routes.has(clean)) {
          errors.push(`${path.relative(root, file)}: unresolved internal link "${raw}".`);
        }
      }
    }
  }
}

function checkHubCoverage(routes, sitemapSource) {
  const requiredHubRoutes = [
    "/",
    "/servicii",
    "/calculatoare",
    "/comparatii",
    "/glosar",
    "/knowledge-hub",
    "/planificare",
    "/proposal-builder",
    "/project-intake",
    "/services",
    "/contact",
  ];

  const requiredCoreFunnelRoutes = [
    "/servicii/proiectare-camera-rmn",
    "/servicii/proiectare-camera-ct",
    "/servicii/rf-shielding-rmn",
    "/calculatoare/cost-camera-rmn",
    "/calculatoare/cost-camera-ct",
    "/comparatii/rmn-vs-ct",
    "/glosar/faraday-cage-explicatie",
    "/planificare/nu-stiu-de-unde-sa-incep",
  ];

  for (const route of requiredHubRoutes) {
    if (!routes.has(route)) {
      errors.push(`Required public hub route missing: ${route}`);
    }
  }

  for (const route of requiredCoreFunnelRoutes) {
    if (!routes.has(route)) {
      errors.push(`Required funnel route missing: ${route}`);
    }
  }

  const adminRoutes = ["/admin/leads", "/admin/lead-flow", "/admin/content-ops", "/admin/seo-launch"];
  for (const route of adminRoutes) {
    if (sitemapSource.includes(route)) {
      errors.push(`Admin route leaked into sitemap source: ${route}`);
    }
  }
}

const articleSource = fs.readFileSync(articlePath, "utf8");
const blocks = extractArticleBlocks(
  articleSource,
  "const baseArticles",
  "const authorityArticleUpgrades",
);
const batchSource = fs.readFileSync(authorityBatchPath, "utf8");
const batchBlocks = extractArticleBlocks(batchSource, "export const authorityBatch70");
const articleBlocks = [...blocks, ...batchBlocks];
const articleSlugs = new Set(
  articleBlocks.map((block) => getStringField(block, "slug")).filter(Boolean),
);
const comparisonSource = fs.readFileSync(comparisonPath, "utf8");
const comparisonBlocks = extractComparisonBlocks(comparisonSource);
const comparisonSlugs = new Set(
  comparisonBlocks.map((block) => getStringField(block, "slug")).filter(Boolean),
);
const glossarySource = fs.readFileSync(glossaryPath, "utf8");
const glossarySlugs = extractGlossarySlugs(glossarySource);
const planningSource = fs.readFileSync(planningPath, "utf8");
const planningSlugs = extractPlanningSlugs(planningSource);
const seoIndexingSource = fs.readFileSync(seoIndexingPath, "utf8");
const seoIndexingUrls = extractSeoIndexingUrls(seoIndexingSource);
const calculatorSource = fs.readFileSync(calculatorPath, "utf8");
const calculatorBlocks = extractCalculatorBlocks(calculatorSource);
const calculatorSlugs = new Set(
  calculatorBlocks.map((block) => getStringField(block, "slug")).filter(Boolean),
);
const serviceFunnelSource = fs.readFileSync(serviceFunnelsPath, "utf8");
const serviceFunnelSlugs = extractServiceFunnelSlugs(serviceFunnelSource);
const routes = buildRoutes(articleSlugs);
const sitemapSource = fs.readFileSync(path.join(appDir, "sitemap.ts"), "utf8");

for (const slug of glossarySlugs) {
  routes.add(`/glosar/${slug}`);
}

for (const slug of comparisonSlugs) {
  routes.add(`/comparatii/${slug}`);
}

for (const slug of planningSlugs) {
  routes.add(`/planificare/${slug}`);
}

for (const url of seoIndexingUrls) {
  routes.add(url);
}

for (const slug of calculatorSlugs) {
  routes.add(`/calculatoare/${slug}`);
}

for (const slug of serviceFunnelSlugs) {
  routes.add(`/servicii/${slug}`);
}

checkArticleBlocks(articleBlocks, articleSlugs, routes);
checkComparisonBlocks(comparisonBlocks, comparisonSlugs, articleSlugs, new Set(glossarySlugs), routes);
checkCalculatorBlocks(calculatorBlocks, routes);
checkInternalReferences(routes);
checkHubCoverage(routes, sitemapSource);

console.log(
  `Content check scanned ${articleBlocks.length} articles, ${comparisonBlocks.length} comparison pages, ${calculatorBlocks.length} calculators, ${glossarySlugs.length} glossary terms and ${routes.size} routes/articles.`,
);

if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const warning of warnings.slice(0, 60)) {
    console.log(`- ${warning}`);
  }
}

if (errors.length) {
  console.error(`Errors (${errors.length}):`);
  for (const error of errors.slice(0, 100)) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Content check passed.");
