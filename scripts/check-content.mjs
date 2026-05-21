import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const articlePath = path.join(root, "src", "data", "articles.ts");
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

function extractArticleBlocks(source) {
  const start = source.indexOf("const baseArticles");
  const authorityStart = source.indexOf("const authorityArticleUpgrades");

  if (start === -1 || authorityStart === -1) {
    errors.push("Could not locate baseArticles or authorityArticleUpgrades in src/data/articles.ts.");
    return [];
  }

  const arrayStart = source.indexOf("[", start);
  const body = source.slice(arrayStart + 1, authorityStart);
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

const articleSource = fs.readFileSync(articlePath, "utf8");
const blocks = extractArticleBlocks(articleSource);
const articleSlugs = new Set(blocks.map((block) => getStringField(block, "slug")).filter(Boolean));
const routes = buildRoutes(articleSlugs);

checkArticleBlocks(blocks, articleSlugs, routes);
checkInternalReferences(routes);

console.log(`Content check scanned ${blocks.length} articles and ${routes.size} routes/articles.`);

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
