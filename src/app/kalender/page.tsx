import { RaceList } from "@/components/race-list";
import { SectionHeading } from "@/components/section-heading";
import { ClassTag } from "@/components/class-tag";
import { carById, driverById, registrations, races, trackById } from "@/lib/sample-data";

export default function CalendarPage() {
  return (
    <main>
      <section className="page-hero">
        <h1>Løbskalender</h1>
        <p>
          Kalenderen samler løbsformat, bane, åbne klasser, serverinfo og tilmeldinger for
          hver DGTL-afdeling.
        </p>
      </section>
      <section className="section shell">
        <RaceList />
      </section>
      <section className="section split-band">
        <div>
          <SectionHeading
            title="Tilmeldte entries"
            intro="Dette er den offentlige startliste for næste åbne afdeling."
          />
          <div className="table-shell">
            <table>
              <thead>
                <tr>
                  <th>Løb</th>
                  <th>Kører</th>
                  <th>Klasse</th>
                  <th>Bil</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((registration) => (
                  <tr key={`${registration.raceId}-${registration.driverId}`}>
                    <td>{races.find((race) => race.id === registration.raceId)?.title}</td>
                    <td>{driverById(registration.driverId)?.name}</td>
                    <td>
                      <ClassTag classId={registration.classId} />
                    </td>
                    <td>{carById(registration.carId)?.name}</td>
                    <td>{registration.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <aside className="points-panel">
          <h3>Næste tilmelding</h3>
          <p>
            Vælg løb, klasse og bil. API’et afviser lukkede løb og klasser, der ikke er slået
            til på løbet.
          </p>
          <p>
            Primær bane:{" "}
            <strong>{trackById(races[0].trackId)?.name}</strong>
          </p>
        </aside>
      </section>
    </main>
  );
}
