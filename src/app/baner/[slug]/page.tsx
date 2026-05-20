import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getTrackDossier } from "@/lib/track-dossiers";
import { getTrackArticle } from "@/lib/track-articles";
import { tracks } from "@/lib/sample-data";

type TrackPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tracks.map((track) => ({ slug: track.slug }));
}

export async function generateMetadata({ params }: TrackPageProps) {
  const { slug } = await params;
  const track = tracks.find((item) => item.slug === slug);

  if (!track) {
    return {};
  }

  return {
    title: `${track.name} | DGTL banebibliotek`,
    description: `${track.name}: dansk GTR2 baneprofil med fakta, historie, setup-noter og kilder.`
  };
}

export default async function TrackDetailPage({ params }: TrackPageProps) {
  const { slug } = await params;
  const track = tracks.find((item) => item.slug === slug);

  if (!track) {
    notFound();
  }

  const article = getTrackArticle(track);
  const dossier = getTrackDossier(track);

  return (
    <main>
      <section className="track-detail-hero">
        <div className="track-detail-copy">
          <Link href="/baner">Tilbage til baner</Link>
          <h1>{track.name}</h1>
          <p>{article.intro}</p>
          <p className="track-reading-time">
            Udvidet banedossier: ca. {dossier.readingMinutes} min. koncentreret læsning for denne banefamilie.
          </p>
        </div>
        <Image
          src={track.screenshotUrl}
          alt={`Banevisual for ${track.name}`}
          width={960}
          height={560}
          priority
        />
      </section>

      <section className="section shell track-detail-layout">
        <aside className="track-fact-panel" aria-label={`${track.name} fakta`}>
          <h2>Fakta</h2>
          <dl>
            {article.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <article className="track-story-panel">
          <section>
            <h2>Baneprofil</h2>
            <p>{article.layoutNote}</p>
            <p>{article.gtr2Context}</p>
          </section>

          <section>
            <h2>Historie</h2>
            {article.history.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section>
            <h2>Køreprofil i GTR2</h2>
            <p>{article.setupNote}</p>
            <ul>
              {article.drivingProfile.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Anekdote</h2>
            <p>{article.anecdote}</p>
          </section>
        </article>
      </section>

      <section className="section shell track-dossier-section">
        <div className="track-dossier-intro">
          <p>DGTL banedossier</p>
          <h2>{dossier.title}</h2>
          <p>{dossier.summary}</p>
        </div>

        <div className="track-dossier-grid">
          {dossier.sections.map((section) => (
            <section key={section.title} className="track-dossier-card">
              <h3>{section.title}</h3>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <section className="track-dossier-card track-variant-card">
          <h3>Layoutnote for {track.name}</h3>
          {dossier.variantNotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </section>

        <section className="track-race-reports">
          <div>
            <p>FIA GT-årene</p>
            <h2>Løbsrapporter og resultatnedslag</h2>
          </div>
          <div className="track-race-report-grid">
            {dossier.fiaGtReports.map((report) => (
              <article key={`${report.season}-${report.event}`} className="track-race-report">
                <div className="track-race-report-meta">
                  <span>{report.season}</span>
                  <span>{report.round}</span>
                  <span>{report.date}</span>
                </div>
                <h3>{report.event}</h3>
                <dl>
                  <div>
                    <dt>Format</dt>
                    <dd>{report.format}</dd>
                  </div>
                  <div>
                    <dt>GT-vinder</dt>
                    <dd>{report.gtWinner}</dd>
                  </div>
                  <div>
                    <dt>N-GT-vinder</dt>
                    <dd>{report.nGtWinner}</dd>
                  </div>
                </dl>
                {report.report.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="track-famous-stories">
          <div>
            <p>Historiske nedslag</p>
            <h2>Berømte løb og det der stadig er værd at huske</h2>
          </div>
          <div className="track-dossier-grid">
            {dossier.famousStories.map((story) => (
              <article key={story.title} className="track-dossier-card">
                <h3>{story.title}</h3>
                {story.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="track-research-gaps">
          <h2>Researchstatus</h2>
          {dossier.researchGaps.map((gap) => (
            <p key={gap}>{gap}</p>
          ))}
        </section>
      </section>

      <section className="section shell track-reference-band">
        <div className="track-timeline">
          <h2>Tidslinje</h2>
          <ol>
            {article.timeline.map((item) => (
              <li key={`${item.year}-${item.text}`}>
                <strong>{item.year}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="track-sources">
          <h2>Kilder</h2>
          <p>
            Længder, layoutår, historiske hoveddata og kort er holdt op mod kilderne herunder.
            Hvor der findes frie kort fra Wikimedia Commons, bruger siden dem. For enkelte korte
            GTR2-varianter bruger DGTL egne silhuetter, indtil der findes et frit kort der kan
            dokumenteres.
          </p>
          {article.sources.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
              {source.label}
            </a>
          ))}
          {dossier.sources.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
              {source.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
