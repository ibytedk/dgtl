import { describe, expect, it } from "vitest";

import { getTrackArticle } from "@/lib/track-articles";
import { getTrackDossier } from "@/lib/track-dossiers";
import { cars, racingClasses, tracks } from "@/lib/sample-data";

const bannedPhrases = [
  /fortælling/i,
  /repræsenterer/i,
  /GTR2-kontekst/i,
  /FIA GT-perioden/i,
  /GTR2-perioden/i,
  /historisk relevant/i,
  /er interessant, fordi/i,
  /Det er vigtigt, fordi/i,
  /power-bane/i,
  /racevåben/i,
  /track position/i,
  /ren pace/i
];

function collectEditorialText() {
  const chunks: string[] = [];

  for (const track of tracks) {
    const article = getTrackArticle(track);
    const dossier = getTrackDossier(track);

    chunks.push(
      track.data.history,
      track.data.anecdote,
      track.data.setupFocus,
      article.title,
      article.intro,
      article.layoutNote,
      article.gtr2Context,
      article.setupNote,
      article.anecdote,
      ...article.history,
      ...article.drivingProfile,
      ...article.timeline.map((item) => item.text),
      dossier.title,
      dossier.summary,
      ...dossier.sections.flatMap((section) => [
        section.title,
        ...section.paragraphs,
        ...(section.bullets ?? [])
      ]),
      ...dossier.fiaGtReports.flatMap((report) => [
        report.event,
        report.format,
        report.gtWinner,
        report.nGtWinner,
        ...report.report
      ]),
      ...dossier.famousStories.flatMap((story) => [story.title, ...story.paragraphs]),
      ...dossier.variantNotes,
      ...dossier.researchGaps
    );
  }

  for (const racingClass of racingClasses) {
    chunks.push(racingClass.name, racingClass.description);
  }

  for (const car of cars) {
    chunks.push(
      car.name,
      car.manufacturer,
      car.model,
      car.history,
      car.specs.engine,
      car.specs.power,
      car.specs.weight,
      car.specs.team,
      car.specs.character
    );
  }

  return chunks.join("\n");
}

describe("editorial style", () => {
  it("keeps the track library free of synthetic filler phrases", () => {
    const text = collectEditorialText();

    for (const phrase of bannedPhrases) {
      expect(text).not.toMatch(phrase);
    }
  });
});
