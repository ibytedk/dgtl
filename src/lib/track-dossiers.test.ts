import { describe, expect, it } from "vitest";

import { getTrackDossier } from "@/lib/track-dossiers";
import { tracks } from "@/lib/sample-data";

describe("track dossiers", () => {
  it("adds sourced FIA GT depth to every GTR2 track page", () => {
    for (const track of tracks) {
      const dossier = getTrackDossier(track);

      expect(dossier.readingMinutes).toBeGreaterThanOrEqual(4);
      expect(dossier.sections.length).toBeGreaterThanOrEqual(2);
      expect(dossier.fiaGtReports.length).toBeGreaterThanOrEqual(1);
      expect(dossier.famousStories.length).toBeGreaterThanOrEqual(1);
      expect(dossier.sources.some((source) => source.label.includes("Racing Sports Cars"))).toBe(true);
      expect(dossier.researchGaps.some((gap) => gap.startsWith("Ikke bekræftet endnu"))).toBe(true);
    }
  });

  it("keeps Spa focused on the 24-hour FIA GT context", () => {
    const spa = tracks.find((track) => track.id === "spa-2004");
    expect(spa).toBeDefined();

    const dossier = getTrackDossier(spa!);

    expect(dossier.fiaGtReports.some((report) => report.format.includes("24 timer"))).toBe(true);
    expect(dossier.summary).toContain("24-timersløb");
    expect(dossier.sources.some((source) => source.label.includes("Spa 24 Hours 2004"))).toBe(true);
  });
});
