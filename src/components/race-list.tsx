import Link from "next/link";
import { CalendarDays, MapPin, RadioTower } from "lucide-react";

import { ClassTag } from "@/components/class-tag";
import { formatDateTime } from "@/lib/format";
import { races, registrations, trackById } from "@/lib/sample-data";

export function RaceList({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "race-list compact" : "race-list"}>
      {races.map((race) => {
        const track = trackById(race.trackId);
        const entryCount = registrations.filter((registration) => registration.raceId === race.id).length;
        const signupOpen = race.status === "SIGNUP_OPEN";

        return (
          <article key={race.id} className="race-row">
            <div className="race-date">
              <CalendarDays size={20} aria-hidden="true" />
              <span>{formatDateTime(race.startsAt)}</span>
            </div>
            <div className="race-main">
              <h3>{race.title}</h3>
              <div className="race-meta">
                <span>
                  <MapPin size={16} aria-hidden="true" /> {track?.name}
                </span>
                <span>
                  <RadioTower size={16} aria-hidden="true" /> {race.server}
                </span>
                <span>{race.format}</span>
              </div>
              <div className="class-row">
                {race.classIds.map((classId) => (
                  <ClassTag key={classId} classId={classId} />
                ))}
              </div>
            </div>
            <div className="race-status">
              <strong>{entryCount} tilmeldt</strong>
              <span>{signupOpen ? "Tilmelding åben" : "Afventer åbning"}</span>
              <Link className={signupOpen ? "button small" : "button small muted"} href="/kalender">
                {signupOpen ? "Tilmeld" : "Se løb"}
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
