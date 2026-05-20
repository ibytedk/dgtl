import { driverStandings, teamStandings } from "@/lib/sample-data";

export function DriverStandingsTable({ limit }: { limit?: number }) {
  const rows = typeof limit === "number" ? driverStandings.slice(0, limit) : driverStandings;

  return (
    <div className="table-shell">
      <table>
        <thead>
          <tr>
            <th>Klasse</th>
            <th>Kører</th>
            <th>Team</th>
            <th>Point</th>
            <th>Sejre</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((standing) => (
            <tr key={`${standing.classId}-${standing.driverId}`}>
              <td>{standing.className}</td>
              <td>{standing.driverName}</td>
              <td>{standing.teamName ?? "Privat"}</td>
              <td>{standing.points}</td>
              <td>{standing.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TeamStandingsTable({ limit }: { limit?: number }) {
  const rows = typeof limit === "number" ? teamStandings.slice(0, limit) : teamStandings;

  return (
    <div className="table-shell">
      <table>
        <thead>
          <tr>
            <th>Klasse</th>
            <th>Team</th>
            <th>Point</th>
            <th>Starter</th>
            <th>Sejre</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((standing) => (
            <tr key={`${standing.classId}-${standing.teamId}`}>
              <td>{standing.className}</td>
              <td>{standing.teamName}</td>
              <td>{standing.points}</td>
              <td>{standing.starts}</td>
              <td>{standing.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
