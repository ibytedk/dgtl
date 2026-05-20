import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { tracks } from "@/lib/sample-data";

const igcdDir = resolve(process.cwd(), "public/images/track-map-sources/igcd");
const generatedTrackDir = resolve(process.cwd(), "public/images/tracks");

describe("track map assets", () => {
  it("uses downloaded IGCD in-game circuit maps for every GTR2 layout", () => {
    const manifestPath = resolve(igcdDir, "manifest.json");
    expect(existsSync(manifestPath)).toBe(true);

    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Array<{ slug: string }>;
    expect(manifest).toHaveLength(tracks.length);

    for (const track of tracks) {
      expect(existsSync(resolve(igcdDir, `${track.slug}.jpg`))).toBe(true);

      const svg = readFileSync(resolve(generatedTrackDir, `${track.slug}.svg`), "utf8");
      expect(svg).toContain("IN-GAME MAP / IGCD");
    }
  });
});
