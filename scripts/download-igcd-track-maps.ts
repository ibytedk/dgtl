import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

type IgcdTrackMap = {
  slug: string;
  igcdName: string;
  file: string;
};

const gameUrl = "https://www.igcd.net/game.php?id=10000202&type=circuits";
const baseImageUrl = "https://www.igcd.net/images1/002";
const outputDir = resolve(process.cwd(), "public/images/track-map-sources/igcd");

const maps: IgcdTrackMap[] = [
  { slug: "anderstorp-2003", igcdName: "Anderstop GP", file: "762.jpg" },
  { slug: "anderstorp-south", igcdName: "Anderstop South", file: "763.jpg" },
  { slug: "barcelona-2003", igcdName: "Barcelona GP", file: "743.jpg" },
  { slug: "barcelona-national", igcdName: "Barcelona National", file: "744.jpg" },
  { slug: "brno-2003", igcdName: "Brno 2003", file: "748.jpg" },
  { slug: "brno-2004", igcdName: "Brno 2004", file: "749.jpg" },
  { slug: "donington-park-2003", igcdName: "Donington Park 2003", file: "750.jpg" },
  { slug: "donington-park-2004", igcdName: "Donington Park 2004", file: "751.jpg" },
  { slug: "donington-park-national", igcdName: "Donington Park National", file: "752.jpg" },
  { slug: "dubai-club", igcdName: "Dubai Autodrome Club", file: "758.jpg" },
  { slug: "dubai-2004", igcdName: "Dubai Autodrome GP", file: "757.jpg" },
  { slug: "dubai-international", igcdName: "Dubai Autodrome International", file: "760.jpg" },
  { slug: "dubai-national", igcdName: "Dubai Autodrome National", file: "759.jpg" },
  { slug: "enna-pergusa-2003", igcdName: "Enna Pergusa", file: "761.jpg" },
  { slug: "estoril-2003", igcdName: "Estoril", file: "756.jpg" },
  { slug: "hockenheim-2004", igcdName: "Hockenheim GP", file: "739.jpg" },
  { slug: "hockenheim-national", igcdName: "Hockenheim International", file: "741.jpg" },
  { slug: "hockenheim-short", igcdName: "Hockenheim National", file: "740.jpg" },
  { slug: "imola", igcdName: "Imola", file: "742.jpg" },
  { slug: "magny-cours-2003", igcdName: "Magny-Cours 2003", file: "769.jpg" },
  { slug: "magny-cours-2004", igcdName: "Magny-Cours 2004", file: "770.jpg" },
  { slug: "magny-cours-national", igcdName: "Magny-Cours National", file: "771.jpg" },
  { slug: "monza-2003", igcdName: "Monza 2003", file: "766.jpg" },
  { slug: "monza-2004", igcdName: "Monza 2004", file: "767.jpg" },
  { slug: "monza-junior", igcdName: "Monza Junior", file: "768.jpg" },
  { slug: "oschersleben-2003", igcdName: "Oschersleben 2003", file: "745.jpg" },
  { slug: "oschersleben-2004", igcdName: "Oschersleben 2004", file: "746.jpg" },
  { slug: "spa-2003", igcdName: "Spa Francorchamps 2003", file: "764.jpg" },
  { slug: "spa-2004", igcdName: "Spa Francorchamps 2004", file: "765.jpg" },
  { slug: "valencia-2004", igcdName: "Valencia GP", file: "753.jpg" },
  { slug: "valencia-long", igcdName: "Valencia Long", file: "755.jpg" },
  { slug: "valencia-national", igcdName: "Valencia National", file: "754.jpg" },
  { slug: "zhuhai", igcdName: "Zhuhai", file: "738.jpg" }
];

function wait(ms: number) {
  return new Promise((resolveWait) => setTimeout(resolveWait, ms));
}

async function fetchWithRetry(url: string, attempts = 4) {
  let lastResponse: Response | undefined;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        "user-agent": "DGTL.dk/1.0 (local IGCD circuit source fetch)"
      }
    });

    if (response.ok) {
      return response;
    }

    lastResponse = response;
    await wait(1200 * attempt);
  }

  return lastResponse;
}

mkdirSync(outputDir, { recursive: true });

async function main() {
  const manifest = maps.map((map) => ({
    slug: map.slug,
    igcdName: map.igcdName,
    pageUrl: gameUrl,
    sourceUrl: `${baseImageUrl}/${map.file}`,
    localPath: `/images/track-map-sources/igcd/${map.slug}.jpg`,
    usageNote: "Third-party in-game screenshot source. Rights status is not asserted by this script."
  }));

  for (const map of maps) {
    const target = resolve(outputDir, `${map.slug}.jpg`);

    if (existsSync(target)) {
      continue;
    }

    const sourceUrl = `${baseImageUrl}/${map.file}`;
    const response = await fetchWithRetry(sourceUrl);

    if (!response?.ok) {
      throw new Error(`IGCD download failed for ${map.slug}: ${response?.status} ${response?.statusText}`);
    }

    const contentType = response.headers.get("content-type")?.split(";")[0];

    if (contentType !== "image/jpeg") {
      throw new Error(`Unexpected content type for ${map.slug}: ${contentType}`);
    }

    writeFileSync(target, Buffer.from(await response.arrayBuffer()));
    await wait(300);
  }

  writeFileSync(resolve(outputDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
