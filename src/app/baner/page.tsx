import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

import { SectionHeading } from "@/components/section-heading";
import { tracks } from "@/lib/sample-data";

export default function TracksPage() {
  return (
    <main>
      <section className="page-hero">
        <h1>Baner</h1>
        <p>
          Banekataloget viser alle GTR2-layouts med verificerede længder, kildelinks,
          setup-noter, historie og en kort anekdote til hver bane.
        </p>
      </section>
      <section className="section shell">
        <SectionHeading
          title="GTR2 banekatalog"
          intro={`${tracks.length} layouts fra den klassiske FIA GT/GTR2-æra.`}
        />
        <div className="media-rail track-grid">
          {tracks.map((track) => (
            <article key={track.id} className="media-tile">
              <Link
                href={`/baner/${track.slug}` as Route}
                aria-label={`Læs baneprofil for ${track.name}`}
              >
                <Image
                  src={track.screenshotUrl}
                  alt={`Banevisual for ${track.name}`}
                  width={720}
                  height={420}
                  loading="eager"
                />
              </Link>
              <h3>{track.name}</h3>
              <div className="track-card-meta" aria-label={`${track.name} data`}>
                <span>{track.country}</span>
                <span>{track.lengthKm.toFixed(3)} km</span>
                <span>{track.data.corners ? `${track.data.corners} sving` : "Sving: Ikke bekræftet endnu"}</span>
                <span>{track.data.direction}</span>
              </div>
              <p>{track.data.setupFocus}</p>
              <dl className="track-card-story">
                <div>
                  <dt>Historie</dt>
                  <dd>{track.data.history}</dd>
                </div>
                <div>
                  <dt>Anekdote</dt>
                  <dd>{track.data.anecdote}</dd>
                </div>
              </dl>
              <a className="track-source-link" href={track.data.sources[0].url} target="_blank" rel="noreferrer">
                Trackmap og data: {track.data.sources[0].label}
              </a>
              <Link className="track-detail-link" href={`/baner/${track.slug}` as Route}>
                Læs hele baneprofilen
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
