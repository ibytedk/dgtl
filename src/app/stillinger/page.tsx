import { SectionHeading } from "@/components/section-heading";
import { DriverStandingsTable, TeamStandingsTable } from "@/components/standings-table";

export default function StandingsPage() {
  return (
    <main>
      <section className="page-hero">
        <h1>Stillinger</h1>
        <p>
          DGTL v1 viser mesterskabet klassevis. Teamstillingen tæller kun de to bedste
          teamkørere pr. løb og klasse.
        </p>
      </section>
      <section className="section shell">
        <SectionHeading
          title="Kørermesterskab"
          intro="Placeringer, DNF/DNS/DSQ og point-overrides kan indtastes manuelt fra admin."
        />
        <DriverStandingsTable />
      </section>
      <section className="section shell">
        <SectionHeading
          title="Teammesterskab"
          intro="Store teams får ikke automatisk fordel: kun de to bedste scorende kørere tæller pr. afdeling."
        />
        <TeamStandingsTable />
      </section>
    </main>
  );
}
