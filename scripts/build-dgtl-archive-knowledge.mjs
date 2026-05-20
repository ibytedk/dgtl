import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "docs", "archive-research");
const FULL_TEXT_FILE = path.join(ROOT, "tmp", "dgtl-wayback-cache-v2", "wayback-pages-full.json");
const CDX_FILE = path.join(OUT_DIR, "wayback-cdx-2005-2020.json");
const FACTS_FILE = path.join(OUT_DIR, "dgtl-old-site-facts.json");
const KNOWLEDGE_FILE = path.join(OUT_DIR, "dgtl-old-site-knowledge-base.md");
const NEWS_FILE = path.join(OUT_DIR, "dgtl-old-site-news-index.md");
const TEAMS_FILE = path.join(OUT_DIR, "dgtl-old-site-team-index.md");
const SERIES_FILE = path.join(OUT_DIR, "dgtl-old-site-series-index.md");

function compact(text) {
  return String(text ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function mdEscape(text) {
  return compact(text).replace(/\|/g, "\\|");
}

function snippet(text, max = 320) {
  const clean = compact(text);
  return clean.length > max ? `${clean.slice(0, max - 1).trim()}...` : clean;
}

function markdownTable(rows) {
  if (rows.length === 0) return "";
  const widths = rows[0].map((_, index) =>
    Math.max(...rows.map((row) => String(row[index] ?? "").length), 3),
  );
  const render = (row) => `| ${row.map((cell, index) => String(cell ?? "").padEnd(widths[index])).join(" | ")} |`;
  return [
    render(rows[0]),
    render(widths.map((width) => "-".repeat(width))),
    ...rows.slice(1).map(render),
  ].join("\n");
}

function originalParams(original) {
  try {
    return new URL(original).searchParams;
  } catch {
    return new URLSearchParams();
  }
}

function groupCount(items, getKey) {
  const counts = new Map();
  for (const item of items) {
    const key = getKey(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Array.from(counts.entries()).sort((a, b) => String(a[0]).localeCompare(String(b[0])));
}

function findPage(pages, predicate) {
  return pages.find(predicate);
}

function findTextEvidence(page, pattern, label, max = 260) {
  const text = page?.text ?? "";
  const index = typeof pattern === "string" ? text.indexOf(pattern) : text.search(pattern);
  const excerpt = index >= 0 ? snippet(text.slice(Math.max(0, index - 80), index + max), max) : "Ikke bekræftet endnu";
  return {
    label,
    pageId: page?.id ?? "",
    date: page?.date?.slice(0, 10) ?? "",
    source: page?.waybackUrl ?? "",
    excerpt,
  };
}

function buildNewsIndex(pages) {
  const titleVotes = new Map();
  for (const page of pages) {
    for (const link of page.links ?? []) {
      let params;
      try {
        params = new URL(link.href, "http://dgtl.dk/").searchParams;
      } catch {
        continue;
      }
      const id = params.get("id");
      if (!id || params.get("newssub") !== "comment") continue;
      const text = compact(link.text);
      if (!text || /^Kommenter$/i.test(text) || /^\d+\s+kommentar/i.test(text)) continue;
      if (!titleVotes.has(id)) titleVotes.set(id, new Map());
      const votes = titleVotes.get(id);
      votes.set(text, (votes.get(text) ?? 0) + 1);
    }
  }

  const dayPattern = "(mandag|tirsdag|onsdag|torsdag|fredag|lørdag|søndag)";
  const monthPattern = "(januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december)";
  const datePattern = new RegExp(`${dayPattern} d\\. \\d{1,2}\\. ${monthPattern} \\d{4}`, "i");
  const byId = new Map();

  for (const page of pages.filter((item) => item.category === "news-comment")) {
    const id = originalParams(page.original).get("id");
    if (!id) continue;
    const votes = titleVotes.get(id);
    const titleFromLinks = votes
      ? Array.from(votes.entries()).sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)[0]?.[0]
      : "";
    const articleStart = page.text.indexOf("TilbageKommenter");
    const articleText = articleStart >= 0 ? page.text.slice(articleStart + "TilbageKommenter".length) : page.text;
    const dateMatch = articleText.match(datePattern);
    const fallbackTitle = dateMatch ? articleText.slice(0, dateMatch.index).trim() : articleText.slice(0, 120);
    const title = titleFromLinks || compact(fallbackTitle);
    const current = {
      id,
      title,
      articleDate: dateMatch?.[0] ?? "",
      firstCapture: page.date.slice(0, 10),
      source: page.waybackUrl,
      pageId: page.id,
      excerpt: snippet(articleText, 420),
    };
    const existing = byId.get(id);
    if (!existing || current.firstCapture < existing.firstCapture) byId.set(id, current);
  }

  return Array.from(byId.values()).sort((a, b) => Number(a.id) - Number(b.id));
}

function buildSeriesIndex(pages) {
  const byKey = new Map();
  for (const page of pages.filter((item) => item.category === "series-rules")) {
    const id = originalParams(page.original).get("id") ?? "";
    const markerIndex = page.text.indexOf(" - Tillægsregler Regler");
    const title = markerIndex >= 0
      ? page.text.slice(Math.max(0, markerIndex - 100), markerIndex).split("\n").pop().trim()
      : "";
    const key = `${id}:${title}`;
    if (!title || byKey.has(key)) continue;
    byKey.set(key, {
      id,
      title,
      firstCapture: page.date.slice(0, 10),
      source: page.waybackUrl,
      pageId: page.id,
      excerpt: snippet(page.text.slice(Math.max(0, markerIndex), markerIndex + 1200), 520),
    });
  }
  return Array.from(byKey.values()).sort((a, b) => Number(a.id) - Number(b.id) || a.firstCapture.localeCompare(b.firstCapture));
}

function buildTeamIndex(pages) {
  const teams = new Map();
  const markerRegex = /([^\n]{2,90})\s+Nyheder\s+Resultater\s+Team Profil\s+Mission\s+Kørere\s+Partnere\s+Links\s+Tidsstatistik/;
  for (const page of pages.filter((item) => item.category === "team-profile")) {
    const id = originalParams(page.original).get("team_id");
    const match = page.text.match(markerRegex);
    const name = match?.[1]?.split("\n").pop()?.trim().replace(/\s+/g, " ");
    if (!id || !name || name.length > 80) continue;
    if (!teams.has(id)) {
      teams.set(id, { id, names: new Map(), firstCapture: page.date.slice(0, 10), lastCapture: page.date.slice(0, 10), sources: [] });
    }
    const team = teams.get(id);
    team.names.set(name, (team.names.get(name) ?? 0) + 1);
    if (page.date.slice(0, 10) < team.firstCapture) team.firstCapture = page.date.slice(0, 10);
    if (page.date.slice(0, 10) > team.lastCapture) team.lastCapture = page.date.slice(0, 10);
    team.sources.push(page.waybackUrl);
  }
  return Array.from(teams.values())
    .map((team) => ({
      id: team.id,
      primaryName: Array.from(team.names.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "",
      observedNames: Array.from(team.names.keys()),
      firstCapture: team.firstCapture,
      lastCapture: team.lastCapture,
      source: team.sources[0] ?? "",
    }))
    .sort((a, b) => Number(a.id) - Number(b.id));
}

function buildCalendarIndex(pages) {
  const seen = new Set();
  const events = [];
  const eventRegex = /(\d{1,2}\/\d{1,2}-\d{2}\s+\d{2}:\d{2})\n([^\n]{3,120})\n([^\n]{3,120})/g;
  for (const page of pages.filter((item) => item.category === "calendar")) {
    for (const match of page.text.matchAll(eventRegex)) {
      const event = {
        dateTime: compact(match[1]),
        event: compact(match[2]),
        track: compact(match[3]),
        firstCapture: page.date.slice(0, 10),
        source: page.waybackUrl,
        pageId: page.id,
      };
      const key = `${event.dateTime}|${event.event}|${event.track}`;
      if (seen.has(key)) continue;
      seen.add(key);
      events.push(event);
    }
  }
  return events.sort((a, b) => a.dateTime.localeCompare(b.dateTime));
}

function buildDownloadIndex(pages) {
  const seen = new Set();
  const downloads = [];
  const wanted = /\.(zip|rar|exe|vcr|svm|wmv|mp3|pdf)(\?|$)/i;
  for (const page of pages) {
    for (const link of page.links ?? []) {
      const href = link.href || "";
      if (!wanted.test(href) && !/download|frederichsen|woofiles|megaupload/i.test(href)) continue;
      const key = `${href}|${compact(link.text)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      downloads.push({
        text: compact(link.text),
        href,
        firstSeen: page.date.slice(0, 10),
        pageId: page.id,
        source: page.waybackUrl,
      });
    }
  }
  return downloads.sort((a, b) => a.firstSeen.localeCompare(b.firstSeen)).slice(0, 500);
}

function buildEvidence(pages) {
  const om2010 = findPage(pages, (page) => page.original.includes("/om/") && page.timestamp.startsWith("20100908"));
  const hall2010 = findPage(pages, (page) => page.original.includes("/hall-of-fame/") && page.timestamp.startsWith("20100908"));
  const front2007 = findPage(pages, (page) => page.timestamp === "20070606210454");
  const rules2007 = findPage(pages, (page) => page.original.includes("part=regler&id=21") && page.timestamp === "20070606204521");
  const front2008 = findPage(pages, (page) => page.timestamp === "20080313095703");
  const future2008 = findPage(pages, (page) => page.text.includes("DGTL's fremtid") && page.timestamp.startsWith("20080913"));
  const concept2010 = findPage(pages, (page) => page.original.includes("/dgtl-2010-koncept/"));
  const nordic2009 = findPage(pages, (page) => page.text.includes("Nordic GT") && page.timestamp.startsWith("20090324"));
  const wordpress2010 = findPage(pages, (page) => page.original.includes("/servere/") && page.timestamp.startsWith("20100908"));
  const gt32015 = findPage(pages, (page) => page.timestamp.startsWith("20150802") && page.category === "front-page");

  return [
    findTextEvidence(om2010, "DGTL 1.0 var en online sim racing liga", "DGTL 1.0 periode og stifterhistorie"),
    findTextEvidence(om2010, "Da DGTL var på toppen i januar 2007", "Peak-statistik januar 2007"),
    findTextEvidence(hall2010, "Top 10 mest succesfulde kørere", "Hall of Fame og historiske vindere"),
    findTextEvidence(front2007, "DGTL - Danish Grand Touring League er en forening og liga", "2007-positionering"),
    findTextEvidence(front2008, "DGTL er kontingentet er 50kr. pr. kvartal", "2008 kontingent"),
    findTextEvidence(rules2007, "Deltagerne skal være godkendte medlemmer", "Generelle løbsregler"),
    findTextEvidence(future2008, "DGTL's fremtid", "September 2008 fremtidsafstemning"),
    findTextEvidence(nordic2009, "Nordic GT", "2009 Nordic GT-overgang"),
    findTextEvidence(concept2010, "Danish Endurance Rank", "DGTL 2.0 2010-koncept"),
    findTextEvidence(wordpress2010, "Data logger", "2010 servere/live timing"),
    findTextEvidence(gt32015, "GT3 Pro", "2015 GT3 Pro/Am-frontpage"),
  ];
}

function buildHallOfFame() {
  return [
    ["2005", "GT", "ThomasBP (Team WKK)"],
    ["2005", "nGT", "Lupiae (Team WKK)"],
    ["2006 S1", "GT", "Alex Riis"],
    ["2006 S1", "nGT", "Casper Hedegaard"],
    ["2006 S2", "GT", "Lasse J O"],
    ["2006 S2", "nGT", "Ingemann"],
    ["2007 S1", "GT1", "Jesper Nielsen"],
    ["2007 S1", "GT2", "Michael Rasmussen"],
    ["2007 S2", "GT1", "Michael Rasmussen"],
    ["2007 S2", "GT2", "Martin Aldal"],
    ["2008 S1", "GT1", "Peter Munkholm"],
    ["2008 S1", "GT2", "Lasse J O"],
    ["2008 S2 (uafsluttet)", "LMP", "Peter Munkholm"],
    ["2008 S2 (uafsluttet)", "GT1", "Jesper Nielsen"],
    ["2008 S2 (uafsluttet)", "GT2", "Jan Molbech"],
  ];
}

function buildMarkdown({ pages, allRecords, news, series, teams, calendar, downloads, evidence }) {
  const earliest = pages[0];
  const latest = pages.at(-1);
  const byYear = groupCount(pages, (page) => page.timestamp.slice(0, 4));
  const generators = groupCount(pages, (page) => page.meta.generator || "(blank)").sort((a, b) => b[1] - a[1]);
  const evidenceRows = [["Emne", "Dato", "Kilde", "Uddrag"]];
  for (const item of evidence) {
    evidenceRows.push([mdEscape(item.label), item.date, `[source](${item.source})`, mdEscape(item.excerpt)]);
  }

  const yearRows = [["År", "HTML-captures"]];
  for (const [year, count] of byYear) yearRows.push([year, String(count)]);

  const timelineRows = [
    ["Periode", "Hvad der er bekræftet", "Primær kilde"],
    ["Forår 2005", "DGTL 1.0 eksisterede fra foråret 2005; 2005 havde GT/nGT Hall of Fame-vindere.", "[Om 2010](https://web.archive.org/web/20100908100006/http://www.dgtl.dk:80/om/) / [Hall of Fame](https://web.archive.org/web/20100908091459/http://www.dgtl.dk:80/hall-of-fame/)"],
    ["2006", "Tidlig ASP/Dreamweaver-side med downloads, hold, info, kalender, forum, stillinger og hotlap-liste.", "[2006 capture](https://web.archive.org/web/20060830044059/http://dgtl.dk:80/)"],
    ["Januar-juni 2007", "Forening/liga med faste ugentlige løb i GTR2 og GT Legends, egne modifikationer, begyndere og hardcore/pro-simracere.", "[2007 frontpage](https://web.archive.org/web/20070606210454/http://dgtl.dk/default.asp)"],
    ["2008 S1", "Kontingent på 50 kr. pr. kvartal, licens/vedtægter, Endurance, Le Mans, Vertigo, Ford Escort og DTM-aktiviteter.", "[2008 frontpage](https://web.archive.org/web/20080313095703/http://dgtl.dk:80/)"],
    ["September 2008", "DGTLs fremtid blev afstemt; 2010 Om-siden siger DGTL blev lukket i september 2008 af en enstemmig bestyrelse.", "[2008 poll](https://web.archive.org/web/20080913133328/http://www.dgtl.dk:80/default.asp?page=0&sub=44)"],
    ["Marts 2009", "Det gamle ASP-site fremstår som Nordic GT, på engelsk, med GTR2/GTR Evolution-positionering.", "[2009 capture](https://web.archive.org/web/20090324041439/http://dgtl.dk:80/)"],
    ["August-september 2010", "DGTL 2.0/WordPress: GTR2/rFactor-servere, Danish Endurance Rank, VLN-serie, Facebook Connect og live timing.", "[2010 concept](https://web.archive.org/web/20100907174705/http://www.dgtl.dk:80/dgtl-2010-koncept/)"],
    ["2013-2014", "Sitet beskriver sig på engelsk som community for sports car and endurance sim racers; VEC/DGTL Classic-regler ses i navigation.", "[2014 capture](https://web.archive.org/web/20140906202649/http://www.dgtl.dk:80/)"],
    ["2015-2016", "Forsiden er GT3 Pro/Am-orienteret med enroll-flow og Facebook-gruppe.", "[2015 capture](https://web.archive.org/web/20150802163014/http://www.dgtl.dk/)"],
    ["2020", "dgtl.dk viser en adgangslåst WordPress/Julekort-side; ikke bekræftet som DGTL-historik.", "[2020 capture](https://web.archive.org/web/20200805222126/http://dgtl.dk/)"],
  ];

  const hallRows = [["År/sæson", "Klasse", "Vinder"], ...buildHallOfFame()];
  const seriesRows = [["ID", "Serie", "Først set", "Kilde", "Kort indhold"]];
  for (const item of series) {
    seriesRows.push([item.id, mdEscape(item.title), item.firstCapture, `[source](${item.source})`, mdEscape(item.excerpt.slice(0, 220))]);
  }

  const teamRows = [["Team ID", "Primært navn", "Observerede navne", "Capture-periode", "Kilde"]];
  for (const item of teams) {
    teamRows.push([
      item.id,
      mdEscape(item.primaryName),
      mdEscape(item.observedNames.join(" / ")),
      `${item.firstCapture} - ${item.lastCapture}`,
      `[source](${item.source})`,
    ]);
  }

  const calendarRows = [["Dato/tid", "Event", "Bane", "Først set", "Kilde"]];
  for (const item of calendar.slice(0, 80)) {
    calendarRows.push([mdEscape(item.dateTime), mdEscape(item.event), mdEscape(item.track), item.firstCapture, `[source](${item.source})`]);
  }

  const generatorRows = [["Generator/platform", "Captures"]];
  for (const [generator, count] of generators.slice(0, 12)) generatorRows.push([mdEscape(generator), String(count)]);

  const downloadsRows = [["Først set", "Tekst", "Href", "Kildeside"]];
  for (const item of downloads.slice(0, 80)) {
    downloadsRows.push([item.firstSeen, mdEscape(item.text || "(ingen linktekst)"), mdEscape(item.href), `[source](${item.source})`]);
  }

  return `# DGTL.dk Old Site Knowledge Base

Dette opslagsværk er bygget fra Internet Archive Wayback CDX + HTML-captures for \`dgtl.dk/*\`, 2005-2020. Det er ikke en genskabt fuld kopi af websitet; det er et kildeindeks, en struktureret faktabase og en kurateret historisk oversigt med links tilbage til arkivet.

## Brug

- Start her for historie, struktur og bekræftede facts.
- Brug \`dgtl-old-site-facts.json\` til maskinlæsbare teams, serier, nyheder, kalender og downloads.
- Brug \`wayback-lookup.md\` til at finde en bestemt capture efter kategori.
- Brug \`wayback-pages.json\` til metadata, snippets og page IDs.
- Det fulde tekstkorpus ligger i \`tmp/dgtl-wayback-cache-v2/wayback-pages-full.json\` og kan genskabes med \`node scripts/collect-dgtl-wayback.mjs\`.

## Kildedækning

- HTML-captures parseable: ${pages.length}.
- Alle \`statuscode:200\` CDX records: ${allRecords.length}.
- Tidligste parsebare HTML-capture: ${earliest.date.slice(0, 10)} - [${earliest.original}](${earliest.waybackUrl}).
- Seneste parsebare HTML-capture: ${latest.date.slice(0, 10)} - [${latest.original}](${latest.waybackUrl}).
- 2005 i CDX: Ikke bekræftet endnu via direkte 2005 capture. 2005-historikken er bekræftet via senere DGTL-sider, især \`/om/\` og \`/hall-of-fame/\`.

${markdownTable(yearRows)}

## Kort svar: hvad var DGTL.dk?

DGTL.dk var Danish Grand Touring League: en dansk online sim-racing liga/forening omkring især GTR2, GT Legends og senere rFactor/GTR Evolution. DGTL 1.0 beskrives som aktiv fra foråret 2005 til efteråret/september 2008, hvorefter sitet senere kom tilbage som DGTL 2.0 i 2010.

Kernen var endurance- og sportsvognsløb, egne bil-/banepakker, hotlaps, kalender/tilmelding, teamprofiler, resultater, forum, live timing og medlemsstyret drift. På toppen i januar 2007 havde Endurance-serien ifølge DGTL selv mere end 60 aktive kørere.

## Evidens

${markdownTable(evidenceRows)}

## Årslinje

${markdownTable(timelineRows)}

## Hall Of Fame 2005-2008

Kilde: [2010 Hall of Fame](https://web.archive.org/web/20100908091459/http://www.dgtl.dk:80/hall-of-fame/).

${markdownTable(hallRows)}

## Informationsarkitektur

ASP-perioden brugte \`default.asp\` med \`sub\`-parametre. Bekræftet fra 2008-forside-links:

- \`sub=2\`: Email adresser.
- \`sub=6\`: Galleri.
- \`sub=9\`: Opret Login / Register.
- \`sub=14\`: Nyheder.
- \`sub=22\`: Kalender.
- \`sub=23\`: Vedtægter.
- \`sub=29\`: Forum.
- \`sub=33\`: Kører Stilling.
- \`sub=35\`: Regler og seriespecifikke regler/filer.
- \`sub=37\`: Baner.
- \`sub=40\`: Generelle Regler.
- \`sub=44\`: Hold Stilling.
- \`sub=45\`: Hent password / password recovery.
- \`sub=46\`: Teamprofiler med \`team_id\`.
- \`sub=47\`: Kom igang.
- \`sub=52\`: Hot-Lap Liste.
- \`sub=65\`: Generel Info.
- \`sub=69\`: FAQ.

2010+ WordPress-perioden brugte bl.a. \`/forum/\`, \`/servere/\`, \`/hot-laps/\`, \`/hall-of-fame/\`, \`/om/\`, kategorier/tags og Facebook Connect.

## Serier Og Regler

${markdownTable(seriesRows)}

## Kalenderudtræk

Automatisk udtræk fra kalender-captures. Fuld liste ligger i \`dgtl-old-site-facts.json\`.

${markdownTable(calendarRows)}

## Teams

Automatisk udtræk fra \`sub=46&team_id=...\` teamprofiler.

${markdownTable(teamRows)}

## Teknisk Platform

${markdownTable(generatorRows)}

Bekræftede tekniske spor:

- ASP/\`default.asp\`-site i 2006-2009 med Dreamweaver metadata.
- FCKeditor assets, billed-upload endpoints, Flash-chat/live-positioning og RSS-links findes i CDX/source index.
- 2010+ skifter til WordPress; flere captures viser WordPress 3.x og senere 4.x/5.x.
- 2010-servere-siden nævner SimUtils Race Manager, data logger og live timing.

## Downloads Og Artefakter

Udvalgte links til mods, trackpacks, replays, resultater, setup-filer og video. Fuld maskinliste ligger i \`dgtl-old-site-facts.json\`.

${markdownTable(downloadsRows)}

## Nyhedsindeks

Der er ${news.length} unikke nyhedskommentar-sider i korpusset. Den fulde liste ligger i \`dgtl-old-site-news-index.md\` og \`dgtl-old-site-facts.json\`.

## Ukendt / Ikke Bekræftet Endnu

- Direkte Wayback HTML-capture fra 2005: Ikke bekræftet endnu. Næste verificerbare skridt er at søge andre hostnames/eksterne linkkilder eller gamle backupfiler, hvis de findes.
- Komplet databaseindhold, alle brugerprofiler og alle forumtråde: Ikke bekræftet endnu. Wayback har mange captures, men ikke nødvendigvis hele databasen.
- Om alle download-filer stadig kan hentes fra arkivet: Ikke bekræftet endnu. CDX viser nogle assets, men eksterne hosts som frederichsen.dk/woofiles/megaupload kræver separat verifikation.
`;
}

function buildNewsMarkdown(news) {
  const rows = [["ID", "Nyhedsdato", "Titel", "Først set", "Kilde", "Uddrag"]];
  for (const item of news) {
    rows.push([
      item.id,
      mdEscape(item.articleDate),
      mdEscape(item.title),
      item.firstCapture,
      `[source](${item.source})`,
      mdEscape(item.excerpt.slice(0, 180)),
    ]);
  }
  return `# DGTL.dk Old Site News Index

Automatisk nyhedsindeks fra \`newssub=comment&id=...\` captures. Titler er primært hentet fra linktekster i arkiverede forsider/nyhedslister og fallback fra selve artikelsiden.

${markdownTable(rows)}
`;
}

function buildTeamsMarkdown(teams) {
  const rows = [["Team ID", "Primært navn", "Observerede navne", "Capture-periode", "Kilde"]];
  for (const item of teams) {
    rows.push([
      item.id,
      mdEscape(item.primaryName),
      mdEscape(item.observedNames.join(" / ")),
      `${item.firstCapture} - ${item.lastCapture}`,
      `[source](${item.source})`,
    ]);
  }
  return `# DGTL.dk Old Site Team Index

Automatisk teamindeks fra \`default.asp?page=&sub=46&team_id=...\`.

${markdownTable(rows)}
`;
}

function buildSeriesMarkdown(series) {
  const rows = [["ID", "Serie", "Først set", "Kilde", "Uddrag"]];
  for (const item of series) {
    rows.push([
      item.id,
      mdEscape(item.title),
      item.firstCapture,
      `[source](${item.source})`,
      mdEscape(item.excerpt.slice(0, 300)),
    ]);
  }
  return `# DGTL.dk Old Site Series Index

Automatisk serie-/regelindeks fra \`default.asp?sub=35&part=regler&id=...\`.

${markdownTable(rows)}
`;
}

async function main() {
  const full = JSON.parse(await fs.readFile(FULL_TEXT_FILE, "utf8"));
  const cdx = JSON.parse(await fs.readFile(CDX_FILE, "utf8"));
  const pages = full.pages.sort((a, b) => a.timestamp.localeCompare(b.timestamp) || a.original.localeCompare(b.original));
  const news = buildNewsIndex(pages);
  const series = buildSeriesIndex(pages);
  const teams = buildTeamIndex(pages);
  const calendar = buildCalendarIndex(pages);
  const downloads = buildDownloadIndex(pages);
  const evidence = buildEvidence(pages);

  const facts = {
    generatedAt: new Date().toISOString(),
    coverage: {
      pages: pages.length,
      allStatus200Records: cdx.records.length,
      firstHtmlCapture: pages[0],
      lastHtmlCapture: pages.at(-1),
    },
    evidence,
    hallOfFame: buildHallOfFame(),
    series,
    teams,
    news,
    calendar,
    downloads,
  };

  await fs.writeFile(FACTS_FILE, JSON.stringify(facts, null, 2), "utf8");
  await fs.writeFile(KNOWLEDGE_FILE, buildMarkdown({ pages, allRecords: cdx.records, news, series, teams, calendar, downloads, evidence }), "utf8");
  await fs.writeFile(NEWS_FILE, buildNewsMarkdown(news), "utf8");
  await fs.writeFile(TEAMS_FILE, buildTeamsMarkdown(teams), "utf8");
  await fs.writeFile(SERIES_FILE, buildSeriesMarkdown(series), "utf8");
  console.log(`Wrote knowledge base and indexes to ${OUT_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
