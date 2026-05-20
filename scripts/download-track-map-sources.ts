import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { extname, resolve } from "node:path";

type SourceMap = {
  id: string;
  title: string;
};

const maps: SourceMap[] = [
  { id: "anderstorp", title: "Scandinavian Raceway.svg" },
  { id: "barcelona-catalunya", title: "Formula1 Circuit Catalunya.svg" },
  { id: "brno", title: "Brno (formerly Masarykův okruh).svg" },
  { id: "donington-gp", title: "Donington as of 2006.svg" },
  { id: "donington-national", title: "Donington Park short.svg" },
  { id: "dubai-club", title: "Dubai Autodrome--Club Course.svg" },
  { id: "dubai-gp", title: "Dubai Autodrome--Grand Prix Course.svg" },
  { id: "dubai-international", title: "Dubai Autodrome--International Course.svg" },
  { id: "dubai-national", title: "Dubai Autodrome--National Course.svg" },
  { id: "enna-pergusa", title: "Pergusa circuit.png" },
  { id: "estoril", title: "Estoril track map.svg" },
  { id: "hockenheim-gp", title: "Circuit Hockenheimring-2002.svg" },
  { id: "imola", title: "Imola.svg" },
  { id: "magny-cours", title: "Circuit de Nevers Magny-Cours.svg" },
  { id: "monza", title: "Monza track map.svg" },
  { id: "oschersleben", title: "Motorsport Arena Oschersleben.svg" },
  { id: "spa", title: "Spa-Francorchamps of Belgium.svg" },
  { id: "valencia", title: "Valencia (Ricardo Tormo) track map.svg" },
  { id: "zhuhai", title: "Zhuhai International Circuit track map.svg" }
];

const outputDir = resolve(process.cwd(), "public/images/track-map-sources");

function extensionFromMime(mime: string, fallbackTitle: string) {
  if (mime === "image/png") return ".png";
  if (mime === "image/svg+xml") return ".svg";
  return extname(fallbackTitle);
}

function wait(ms: number) {
  return new Promise((resolveWait) => setTimeout(resolveWait, ms));
}

async function fetchWithRetry(url: string, attempts = 4) {
  let lastResponse: Response | undefined;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        "user-agent": "DGTL.dk/1.0 (local track map source fetch)"
      }
    });

    if (response.ok) {
      return response;
    }

    lastResponse = response;
    await wait(2500 * attempt);
  }

  return lastResponse;
}

const titles = maps.map((map) => `File:${map.title}`).join("|");
const apiUrl =
  "https://commons.wikimedia.org/w/api.php?" +
  new URLSearchParams({
    action: "query",
    titles,
    prop: "imageinfo",
    iiprop: "url|mime|size",
    iiurlwidth: "900",
    format: "json",
    origin: "*"
  });

mkdirSync(outputDir, { recursive: true });

async function main() {
  const response = await fetch(apiUrl, {
    headers: {
      "user-agent": "DGTL.dk/1.0 (local track map source fetch)"
    }
  });

  if (!response.ok) {
    throw new Error(`Wikimedia API failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  const pages = Object.values(payload.query.pages) as Array<{
    title: string;
    missing?: string;
    imageinfo?: Array<{ url: string; mime: string; thumburl?: string }>;
  }>;
  const pageByTitle = new Map(pages.map((page) => [page.title, page]));

  for (const map of maps) {
    const page = pageByTitle.get(`File:${map.title}`);

    if (!page || page.missing || !page.imageinfo?.[0]) {
      throw new Error(`Missing Wikimedia image info for ${map.title}`);
    }

    const image = page.imageinfo[0];
    const sourceUrl = image.thumburl ?? image.url;
    const guessedPath = resolve(outputDir, `${map.id}.png`);

    if (existsSync(guessedPath)) {
      continue;
    }

    const fileResponse = await fetchWithRetry(sourceUrl);

    if (!fileResponse?.ok) {
      throw new Error(
        `Download failed for ${map.title}: ${fileResponse?.status} ${fileResponse?.statusText}`
      );
    }

    const buffer = Buffer.from(await fileResponse.arrayBuffer());
    const mime = fileResponse.headers.get("content-type")?.split(";")[0] ?? image.mime;
    const extension = extensionFromMime(mime, map.title);
    writeFileSync(resolve(outputDir, `${map.id}${extension}`), buffer);
    await wait(750);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
