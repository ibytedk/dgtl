import { CheckCircle2, FileArchive, Flag, ShieldCheck, UploadCloud } from "lucide-react";

import { downloads, races, racingClasses, registrations, results, skinUploads } from "@/lib/sample-data";

const workflowItems = [
  {
    icon: Flag,
    title: "Løbskalender",
    metric: `${races.length} afdelinger`,
    body: "Opret løb, vælg klasser, bane, pointskala og tilmeldingsvindue."
  },
  {
    icon: CheckCircle2,
    title: "Resultater",
    metric: `${results.length} resultater`,
    body: "Manuel entry i v1 med klasseplacering, status, straf og override-point."
  },
  {
    icon: UploadCloud,
    title: "Skin approvals",
    metric: `${skinUploads.filter((upload) => upload.status === "PENDING").length} afventer`,
    body: "Køreruploads publiceres først efter admin-godkendelse."
  },
  {
    icon: FileArchive,
    title: "Downloads",
    metric: `${downloads.filter((download) => download.isPublished).length} publiceret`,
    body: "Serverfiler, patches, skins og senere sync-tool styres samlet."
  },
  {
    icon: ShieldCheck,
    title: "Tilmeldinger",
    metric: `${registrations.length} entries`,
    body: "Valideres mod åbent løb, tilladte klasser og valgt bil."
  }
];

export function AdminShell() {
  return (
    <div className="admin-workspace">
      <aside className="admin-sidebar">
        <strong>Admin</strong>
        <a href="#calendar">Kalender</a>
        <a href="#results">Resultater</a>
        <a href="#skins">Skins</a>
        <a href="#downloads">Downloads</a>
        <a href="#news">Nyheder</a>
      </aside>
      <div className="admin-main">
        <div className="admin-title">
          <h1>DGTL kontrolrum</h1>
          <p>Driftsoverblik for kalender, resultater, teams, downloads og køreruploads.</p>
        </div>
        <div className="workflow-grid">
          {workflowItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="workflow-panel">
                <Icon size={24} aria-hidden="true" />
                <span>{item.metric}</span>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
        <section id="results" className="admin-section">
          <h2>Manuel resultatindtastning</h2>
          <form className="admin-form">
            <label>
              Løb
              <select name="raceId" defaultValue="spa-500">
                {races.map((race) => (
                  <option key={race.id} value={race.id}>
                    {race.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Kører-id
              <input name="driverId" defaultValue="mads-holm" />
            </label>
            <label>
              Klasse
              <select name="classId" defaultValue="gt">
                {racingClasses.map((racingClass) => (
                  <option key={racingClass.id} value={racingClass.id}>
                    {racingClass.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Placering
              <input name="position" type="number" min="1" defaultValue="1" />
            </label>
            <button type="button" className="button">
              Gem resultat
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
