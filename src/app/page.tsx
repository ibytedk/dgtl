import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  CalendarDays,
  CloudRain,
  Download,
  Flag,
  Gauge,
  Settings,
  UsersRound,
  Wrench
} from "lucide-react";

import { formatDate } from "@/lib/format";
import {
  carById,
  cars,
  downloads,
  driverStandings,
  newsPosts,
  races,
  racingClasses,
  registrations,
  teamStandings,
  trackById,
  tracks
} from "@/lib/sample-data";

function ClassPill({ classId }: { classId: string }) {
  const racingClass = racingClasses.find((item) => item.id === classId);

  return (
    <span className="concept-class-pill" style={{ "--pill": racingClass?.color ?? "#fff" } as CSSProperties}>
      {racingClass?.name ?? classId}
    </span>
  );
}

function shortDate(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("da-DK", {
    day: "2-digit",
    month: "short",
    timeZone: "Europe/Copenhagen"
  })
    .format(date)
    .replace(".", "")
    .toUpperCase();
}

export default function HomePage() {
  const nextRace = races[0];
  const nextTrack = trackById(nextRace.trackId);
  const featuredTrack = trackById("spa-2004") ?? tracks[0];
  const featuredCar = carById("maserati-mc12-gt1-2004") ?? cars[0];
  const nextRaceEntries = registrations.filter((item) => item.raceId === nextRace.id).length;
  const publishedDownloads = downloads.filter((download) => download.isPublished);

  return (
    <main className="concept-home">
      <section className="concept-hero">
        <Image
          className="concept-hero-image"
          src="/images/dgtl-hero-bg.png"
          alt="Fiktive GT-biler på våd nattebane"
          fill
          priority
          sizes="100vw"
        />
        <div className="concept-hero-vignette" />
        <div className="concept-hero-copy">
          <h1>DGTL</h1>
          <p className="concept-hero-title">Danish Grand Touring League</p>
          <p className="concept-hero-text">
            Danmarks SIMBIN GTR2 liga for seriøs GT racing.
            <br />
            Hård konkurrence, ikoniske baner og fede biler.
            <br />
            Bliv en del af fællesskabet.
          </p>
          <div className="concept-hero-actions">
            <Link className="concept-button primary" href="/kalender">
              Tilmeld dig næste løb <ArrowRight size={24} />
            </Link>
            <Link className="concept-button outline" href="/kalender">
              Se kalender
            </Link>
          </div>
        </div>
        <div className="concept-slider" aria-hidden="true">
          <span className="active" />
          <span />
        </div>
      </section>

      <section className="concept-dashboard" aria-label="DGTL ligaoverblik">
        <div className="concept-top-grid">
          <article className="concept-panel next-race-panel">
            <div className="concept-panel-title">
              <h2>Næste løb</h2>
              <span />
            </div>
            <div className="next-race-layout">
              <Image src="/images/dgtl-hero-bg.png" alt="" width={520} height={292} />
              <div>
                <h3>{nextTrack?.name}</h3>
                <strong>{formatDate(nextRace.startsAt)}</strong>
                <div className="race-icons">
                  <span>
                    <Gauge size={16} /> 90 minutter
                  </span>
                  <span>
                    <CloudRain size={16} /> Dag / aften
                  </span>
                </div>
                <small>Klasser</small>
                <div className="concept-pill-row">
                  {nextRace.classIds.map((classId) => (
                    <ClassPill key={classId} classId={classId} />
                  ))}
                </div>
              </div>
            </div>
            <div className="entry-progress">
              <span>{nextRaceEntries} / 30 pladser optaget</span>
              <div>
                <i style={{ width: `${(nextRaceEntries / 30) * 100}%` }} />
              </div>
            </div>
            <div className="panel-actions">
              <Link className="concept-button primary compact" href="/kalender">
                Tilmeld dig løbet
              </Link>
              <Link className="concept-button outline compact" href="/kalender">
                Se detaljer
              </Link>
            </div>
          </article>

          <article className="concept-panel standings-panel">
            <div className="concept-panel-title">
              <h2>Mesterskabsstilling</h2>
              <span />
            </div>
            <div className="standings-tabs">
              <button>Samlet</button>
              {racingClasses.map((racingClass) => (
                <button key={racingClass.id}>{racingClass.name}</button>
              ))}
            </div>
            <table className="concept-table">
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Kører</th>
                  <th>Team</th>
                  <th>Point</th>
                </tr>
              </thead>
              <tbody>
                {driverStandings.slice(0, 5).map((standing, index) => (
                  <tr key={`${standing.classId}-${standing.driverId}`}>
                    <td>{index + 1}</td>
                    <td>{standing.driverName}</td>
                    <td>{standing.teamName ?? "Privat"}</td>
                    <td>{standing.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link className="concept-wide-link" href="/stillinger">
              Se hele stillingen
            </Link>
          </article>

          <article className="concept-panel calendar-panel">
            <div className="concept-panel-title with-link">
              <h2>Kommende kalender</h2>
              <Link href="/kalender">Se hele kalenderen</Link>
            </div>
            <div className="calendar-list">
              {races.map((race) => (
                <div key={race.id} className="calendar-row">
                  <time>{shortDate(race.startsAt)}</time>
                  <span>{trackById(race.trackId)?.name}</span>
                  <div className="concept-pill-row">
                    {race.classIds.map((classId) => (
                      <ClassPill key={classId} classId={classId} />
                    ))}
                  </div>
                  <strong>{race.status === "SIGNUP_OPEN" ? "Tilmelding åben" : "Kommer snart"}</strong>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="concept-bottom-grid">
          <article className="concept-panel track-panel">
            <div className="concept-panel-title with-link">
              <h2>Banebiblioteket</h2>
              <Link href="/baner">Se alle baner</Link>
            </div>
            <div className="track-image">
              <Image src={featuredTrack.screenshotUrl} alt="" width={720} height={420} />
              <strong>{featuredTrack.name}</strong>
            </div>
            <div className="stats-strip">
              <span>Længde <strong>{featuredTrack.lengthKm.toFixed(3)} km</strong></span>
              <span>Layout <strong>{featuredTrack.data.layout}</strong></span>
              <span>Æra <strong>{featuredTrack.data.era}</strong></span>
              <span>Retning <strong>{featuredTrack.data.direction}</strong></span>
            </div>
          </article>

          <article className="concept-panel car-panel">
            <div className="concept-panel-title with-link">
              <h2>Biler & klasser</h2>
              <Link href="/biler">Se alle biler</Link>
            </div>
            <div className="car-feature">
              <Image
                src={featuredCar.screenshotUrl ?? "/images/cars/maserati-mc12-gt1-2004.png"}
                alt={`${featuredCar.name} - original AI-genereret DGTL-billede`}
                width={1536}
                height={864}
              />
              <h3>{featuredCar.name}</h3>
              <ClassPill classId={featuredCar.classId} />
            </div>
            <div className="stats-strip">
              <span>Motor <strong>{featuredCar.specs.engine}</strong></span>
              <span>Vægt <strong>{featuredCar.specs.weight}</strong></span>
              <span>Effekt <strong>{featuredCar.specs.power}</strong></span>
              <span>Klasse <strong>GT</strong></span>
            </div>
          </article>

          <article className="concept-panel downloads-panel">
            <div className="concept-panel-title with-link">
              <h2>Downloads & skins</h2>
              <Link href="/downloads">Se alle downloads</Link>
            </div>
            <div className="download-menu">
              {publishedDownloads.map((download) => (
                <Link key={download.id} href="/downloads">
                  <Download size={22} />
                  <span>
                    {download.title}
                    <small>{download.category}</small>
                  </span>
                  <strong>Browse</strong>
                </Link>
              ))}
              <Link href="/downloads">
                <Wrench size={22} />
                <span>
                  Værktøj & utilities
                  <small>Sync tool senere</small>
                </span>
                <strong>Browse</strong>
              </Link>
            </div>
          </article>

          <article className="concept-panel teams-panel">
            <div className="concept-panel-title with-link">
              <h2>Teams</h2>
              <Link href="/stillinger">Se alle teams</Link>
            </div>
            <ol className="team-list">
              {teamStandings.slice(0, 5).map((standing) => (
                <li key={`${standing.classId}-${standing.teamId}`}>
                  <span>{standing.teamName}</span>
                  <strong>{standing.points} pts</strong>
                </li>
              ))}
            </ol>
          </article>

          <article className="concept-panel news-panel">
            <div className="concept-panel-title with-link">
              <h2>Seneste nyheder</h2>
              <Link href="/nyheder">Se alle nyheder</Link>
            </div>
            <div className="concept-news-list">
              {newsPosts.slice(0, 3).map((post, index) => (
                <Link key={post.id} href="/nyheder">
                  <Image
                    src={index === 0 ? "/images/car-mc12.svg" : "/images/car-viper.svg"}
                    alt=""
                    width={180}
                    height={100}
                  />
                  <span>
                    {post.title}
                    <small>{post.publishedAt ? formatDate(post.publishedAt) : "Kladde"}</small>
                  </span>
                </Link>
              ))}
            </div>
          </article>
        </div>
      </section>

      <footer className="concept-footer">
        <Link href="/" className="footer-logo">
          DGTL
        </Link>
        <p>
          Danish Grand Touring League
          <br />
          SIMBIN GTR2 liga siden 2026.
        </p>
        <div>
          <span>Følg os</span>
          <UsersRound size={22} />
          <CalendarDays size={22} />
          <Flag size={22} />
          <Settings size={22} />
        </div>
      </footer>
    </main>
  );
}
