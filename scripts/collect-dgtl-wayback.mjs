import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { JSDOM, VirtualConsole } from "jsdom";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "docs", "archive-research");
const CACHE_DIR = path.join(ROOT, "tmp", "dgtl-wayback-cache-v2");
const FULL_TEXT_FILE = path.join(CACHE_DIR, "wayback-pages-full.json");
const FROM_YEAR = "2005";
const TO_YEAR = "2020";
const CDX_FIELDS = ["timestamp", "original", "statuscode", "mimetype", "digest", "length"];

function cdxUrl(filters) {
  const params = new URLSearchParams({
    url: "dgtl.dk/*",
    from: FROM_YEAR,
    to: TO_YEAR,
    output: "json",
    fl: CDX_FIELDS.join(","),
    collapse: "digest",
  });
  for (const filter of filters) {
    params.append("filter", filter);
  }
  return `https://web.archive.org/cdx?${params.toString()}`;
}

const CDX_HTML_URL = cdxUrl(["statuscode:200", "mimetype:text/html"]);
const CDX_ALL_URL = cdxUrl(["statuscode:200"]);

function timestampToIso(timestamp) {
  return `${timestamp.slice(0, 4)}-${timestamp.slice(4, 6)}-${timestamp.slice(6, 8)}T${timestamp.slice(8, 10)}:${timestamp.slice(10, 12)}:${timestamp.slice(12, 14)}Z`;
}

function waybackUrl(timestamp, original) {
  return `https://web.archive.org/web/${timestamp}/${original}`;
}

function waybackRawUrl(timestamp, original) {
  return `https://web.archive.org/web/${timestamp}id_/${original}`;
}

function stableId(record) {
  return crypto
    .createHash("sha1")
    .update(`${record.timestamp}\n${record.original}\n${record.digest}`)
    .digest("hex")
    .slice(0, 12);
}

function cachePathFor(record) {
  return path.join(CACHE_DIR, `${record.timestamp}-${stableId(record)}.html`);
}

function normalizeText(text) {
  return text
    .replace(/\u00a0/g, " ")
    .replace(/[ \t\r\f\v]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function textSnippet(text, max = 260) {
  const clean = normalizeText(text).replace(/\n+/g, " ");
  return clean.length > max ? `${clean.slice(0, max - 1).trim()}...` : clean;
}

function getMeta(document, name) {
  const selector = [
    `meta[name="${name}"]`,
    `meta[name="${name.toLowerCase()}"]`,
    `meta[name="${name.toUpperCase()}"]`,
    `meta[http-equiv="${name}"]`,
    `meta[http-equiv="${name.toLowerCase()}"]`,
    `meta[http-equiv="${name.toUpperCase()}"]`,
  ].join(",");
  return document.querySelector(selector)?.getAttribute("content")?.trim() ?? "";
}

function getUrlParts(original) {
  try {
    const parsed = new URL(original);
    return {
      host: parsed.host,
      path: parsed.pathname,
      query: Object.fromEntries(parsed.searchParams.entries()),
    };
  } catch {
    return { host: "", path: original, query: {} };
  }
}

function categoryFor(original, mimetype = "text/html") {
  const { path: urlPath, query } = getUrlParts(original);
  const lowerPath = urlPath.toLowerCase();
  const sub = query.sub ?? "";
  const part = (query.part ?? "").toLowerCase();
  const teamPage = (query.teampage ?? "").toLowerCase();

  if (!mimetype.includes("html")) return "asset";
  if (lowerPath === "/" || lowerPath.endsWith("/default.asp") || lowerPath.endsWith("/default.asp/")) {
    if (query.newssub === "comment") return "news-comment";
    if (sub === "35" && part === "regler") return "series-rules";
    if (sub === "35" && part === "filer") return "series-files";
    if (sub === "46" && query.team_id && teamPage) return `team-${teamPage}`;
    if (sub === "46" && query.team_id) return "team-profile";
    if (sub === "45") return "password-recovery";
    if (sub === "22") return "calendar";
    if (sub) return `sub-${sub}`;
    return "front-page";
  }
  if (part === "forum") return "forum-index";
  if (part === "topics") return "forum-topics";
  if (part === "posts") return "forum-posts";
  if (part === "result") return "forum-search-result";
  if (part === "opretpost") return "forum-compose-post";
  if (part === "oprettopic") return "forum-compose-topic";
  if (lowerPath.includes("chat")) return "chat";
  if (lowerPath.includes("live")) return "live-server";
  if (lowerPath.includes("img_upload")) return "image-upload";
  if (lowerPath.includes("robots.txt")) return "robots";
  return "other-html";
}

function extractLinks(document) {
  const links = [];
  for (const anchor of document.querySelectorAll("a[href]")) {
    const href = anchor.getAttribute("href")?.trim();
    if (!href) continue;
    links.push({
      text: textSnippet(anchor.textContent ?? "", 80),
      href,
    });
  }
  return links.slice(0, 200);
}

function extractImages(document) {
  const images = [];
  for (const image of document.querySelectorAll("img[src]")) {
    const src = image.getAttribute("src")?.trim();
    if (!src) continue;
    images.push({
      alt: image.getAttribute("alt")?.trim() ?? "",
      src,
    });
  }
  return images.slice(0, 100);
}

function extractTables(document) {
  const tables = [];
  for (const table of document.querySelectorAll("table")) {
    const rows = [];
    for (const row of table.querySelectorAll("tr")) {
      const cells = Array.from(row.querySelectorAll("th,td"))
        .map((cell) => textSnippet(cell.textContent ?? "", 160))
        .filter(Boolean);
      if (cells.length > 0) rows.push(cells);
    }
    if (rows.length > 0) tables.push(rows.slice(0, 80));
  }
  return tables.slice(0, 20);
}

function extractPage(html, record) {
  const dom = new JSDOM(html, { virtualConsole: new VirtualConsole() });
  const { document } = dom.window;

  for (const element of document.querySelectorAll("script,style,noscript")) {
    element.remove();
  }

  const title = normalizeText(document.querySelector("title")?.textContent ?? "");
  const bodyText = normalizeText(document.body?.textContent ?? document.documentElement.textContent ?? "");
  const headings = Array.from(document.querySelectorAll("h1,h2,h3,h4"))
    .map((heading) => ({
      level: heading.tagName.toLowerCase(),
      text: textSnippet(heading.textContent ?? "", 140),
    }))
    .filter((heading) => heading.text);

  return {
    id: stableId(record),
    timestamp: record.timestamp,
    date: timestampToIso(record.timestamp),
    original: record.original,
    waybackUrl: waybackUrl(record.timestamp, record.original),
    rawUrl: waybackRawUrl(record.timestamp, record.original),
    mimetype: record.mimetype,
    digest: record.digest,
    length: record.length ?? "",
    category: categoryFor(record.original, record.mimetype),
    title,
    meta: {
      description: getMeta(document, "Description"),
      keywords: getMeta(document, "Keywords"),
      copyright: getMeta(document, "Copyright"),
      generator: getMeta(document, "Generator"),
      author: getMeta(document, "Author"),
      replyTo: getMeta(document, "Reply-to"),
      contentType: getMeta(document, "Content-type"),
    },
    headings,
    links: extractLinks(document),
    images: extractImages(document),
    tables: extractTables(document),
    text: bodyText,
    textLength: bodyText.length,
    textHash: crypto.createHash("sha1").update(bodyText).digest("hex"),
    snippet: textSnippet(bodyText, 500),
  };
}

function detectCharset(buffer, contentType = "") {
  const head = buffer.toString("latin1", 0, Math.min(buffer.length, 8192));
  const metaMatch = head.match(/charset\s*=\s*["']?\s*([A-Za-z0-9._-]+)/i);
  const headerMatch = contentType.match(/charset\s*=\s*["']?\s*([A-Za-z0-9._-]+)/i);
  const charset = (metaMatch?.[1] ?? headerMatch?.[1] ?? "windows-1252").toLowerCase();
  if (charset.includes("utf")) return "utf-8";
  if (charset.includes("8859") || charset.includes("latin") || charset.includes("windows")) return "windows-1252";
  return charset;
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "DGTL.dk archive research script (local Codex workspace)",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  const decoder = new TextDecoder(detectCharset(buffer, response.headers.get("content-type") ?? ""));
  return decoder.decode(buffer);
}

async function fetchJson(url) {
  const text = await fetchText(url);
  return JSON.parse(text);
}

function rowsToRecords(rows) {
  const [header, ...items] = rows;
  return items.map((item) => Object.fromEntries(header.map((field, index) => [field, item[index] ?? ""])));
}

async function fetchWithCache(record) {
  const file = cachePathFor(record);
  try {
    return await fs.readFile(file, "utf8");
  } catch {
    const html = await fetchText(waybackRawUrl(record.timestamp, record.original));
    await fs.writeFile(file, html, "utf8");
    return html;
  }
}

async function runLimited(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: limit }, async () => {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

function countBy(items, getKey) {
  const counts = new Map();
  for (const item of items) {
    const key = getKey(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Array.from(counts.entries()).sort(([a], [b]) => String(a).localeCompare(String(b)));
}

function markdownTable(rows) {
  if (rows.length === 0) return "";
  const header = rows[0].map((cell) => String(cell));
  const body = rows.slice(1).map((row) => row.map((cell) => String(cell)));
  const widths = header.map((cell, index) =>
    Math.max(cell.length, ...body.map((row) => row[index]?.length ?? 0), 3),
  );
  const renderRow = (row) => `| ${row.map((cell, index) => String(cell).padEnd(widths[index])).join(" | ")} |`;
  return [
    renderRow(header),
    renderRow(widths.map((width) => "-".repeat(width))),
    ...body.map(renderRow),
  ].join("\n");
}

function buildSourceIndexMarkdown(allRecords, pages, failed) {
  const byYearRows = [["Year", "All 200 captures", "HTML pages"]];
  const allByYear = new Map(countBy(allRecords, (record) => record.timestamp.slice(0, 4)));
  const htmlByYear = new Map(countBy(pages, (page) => page.timestamp.slice(0, 4)));
  for (const year of Array.from(new Set([...allByYear.keys(), ...htmlByYear.keys()])).sort()) {
    byYearRows.push([year, String(allByYear.get(year) ?? 0), String(htmlByYear.get(year) ?? 0)]);
  }

  const mimeRows = [["Mimetype", "Count"]];
  for (const [mime, count] of countBy(allRecords, (record) => record.mimetype || "(blank)").sort((a, b) => b[1] - a[1])) {
    mimeRows.push([mime, String(count)]);
  }

  const categoryRows = [["Category", "Count", "First capture", "Last capture"]];
  for (const [category, count] of countBy(pages, (page) => page.category).sort((a, b) => b[1] - a[1])) {
    const items = pages.filter((page) => page.category === category).sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    categoryRows.push([category, String(count), items[0]?.date.slice(0, 10) ?? "", items.at(-1)?.date.slice(0, 10) ?? ""]);
  }

  const examples = pages
    .slice()
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
    .slice(0, 40)
    .map((page) => `- ${page.date.slice(0, 10)} - ${page.category} - [${page.original}](${page.waybackUrl})`)
    .join("\n");

  const failures = failed.length
    ? failed.map((failure) => `- ${failure.timestamp} - ${failure.original} - ${failure.error}`).join("\n")
    : "- Ingen HTML-fetch-fejl registreret af scriptet.";

  return `# DGTL.dk Wayback Source Index

Kildegrundlag: Internet Archive CDX API for \`dgtl.dk/*\`, \`${FROM_YEAR}\` til \`${TO_YEAR}\`, \`statuscode:200\`, digest-collapse. HTML-sider er hentet som Wayback \`id_\` snapshots uden toolbar.

CDX HTML query: <${CDX_HTML_URL}>

CDX all-assets query: <${CDX_ALL_URL}>

## Dækning pr. år

${markdownTable(byYearRows)}

## MIME-typer

${markdownTable(mimeRows)}

## HTML-kategorier

${markdownTable(categoryRows)}

## Tidlige HTML-captures

${examples}

## Fetch-fejl

${failures}
`;
}

function buildLookupMarkdown(pages) {
  const byCategory = new Map();
  for (const page of pages) {
    if (!byCategory.has(page.category)) byCategory.set(page.category, []);
    byCategory.get(page.category).push(page);
  }

  const sections = [];
  for (const [category, items] of Array.from(byCategory.entries()).sort(([a], [b]) => a.localeCompare(b))) {
    const sorted = items.slice().sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    const rows = [["Date", "ID", "Original URL", "Title", "Snippet"]];
    for (const page of sorted.slice(0, 250)) {
      rows.push([
        page.date.slice(0, 10),
        page.id,
        `[source](${page.waybackUrl})`,
        page.title.replace(/\|/g, "\\|").slice(0, 80),
        page.snippet.replace(/\|/g, "\\|").slice(0, 180),
      ]);
    }
    const truncated = sorted.length > 250 ? `\n\nViser 250 af ${sorted.length}. Brug \`wayback-pages.json\` til fuld liste.` : "";
    sections.push(`## ${category}\n\n${markdownTable(rows)}${truncated}`);
  }

  return `# DGTL.dk Wayback Lookup

Dette er et opslag efter automatisk kategori. Brug \`id\` til at finde samme post i \`wayback-pages.json\`.

${sections.join("\n\n")}
`;
}

function slimPage(page) {
  const rest = { ...page };
  delete rest.text;
  delete rest.tables;
  return rest;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(CACHE_DIR, { recursive: true });

  console.log("Fetching CDX indexes...");
  const [htmlRows, allRows] = await Promise.all([fetchJson(CDX_HTML_URL), fetchJson(CDX_ALL_URL)]);
  const htmlRecords = rowsToRecords(htmlRows);
  const allRecords = rowsToRecords(allRows);
  console.log(`CDX records: ${htmlRecords.length} HTML, ${allRecords.length} total 200 responses`);

  const failed = [];
  const pages = await runLimited(htmlRecords, 5, async (record, index) => {
    if ((index + 1) % 100 === 0 || index === 0) {
      console.log(`Fetching HTML ${index + 1}/${htmlRecords.length}`);
    }
    try {
      const html = await fetchWithCache(record);
      return extractPage(html, record);
    } catch (error) {
      failed.push({
        timestamp: record.timestamp,
        original: record.original,
        error: error instanceof Error ? error.message : String(error),
      });
      return null;
    }
  });

  const extractedPages = pages.filter(Boolean);
  extractedPages.sort((a, b) => a.timestamp.localeCompare(b.timestamp) || a.original.localeCompare(b.original));
  const slimPages = extractedPages.map(slimPage);

  await fs.writeFile(
    path.join(OUT_DIR, "wayback-cdx-2005-2020.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), cdxHtmlUrl: CDX_HTML_URL, cdxAllUrl: CDX_ALL_URL, records: allRecords }, null, 2),
    "utf8",
  );
  await fs.writeFile(
    path.join(OUT_DIR, "wayback-pages.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), source: CDX_HTML_URL, pages: slimPages, failed }, null, 2),
    "utf8",
  );
  await fs.writeFile(
    FULL_TEXT_FILE,
    JSON.stringify({ generatedAt: new Date().toISOString(), source: CDX_HTML_URL, pages: extractedPages, failed }, null, 2),
    "utf8",
  );
  await fs.writeFile(
    path.join(OUT_DIR, "wayback-source-index.md"),
    buildSourceIndexMarkdown(allRecords, slimPages, failed),
    "utf8",
  );
  await fs.writeFile(
    path.join(OUT_DIR, "wayback-lookup.md"),
    buildLookupMarkdown(slimPages),
    "utf8",
  );

  console.log(`Wrote ${extractedPages.length} parsed pages to ${OUT_DIR}`);
  if (failed.length > 0) {
    console.log(`Failed HTML fetches: ${failed.length}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
