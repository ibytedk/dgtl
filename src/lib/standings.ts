export type ResultStatus = "CLASSIFIED" | "DNF" | "DNS" | "DSQ";

export type PointAwardInput = {
  position: number;
  points: number;
};

export type RaceResultInput = {
  raceId: string;
  raceName: string;
  classId: string;
  className: string;
  driverId: string;
  driverName: string;
  teamId?: string | null;
  teamName?: string | null;
  position?: number | null;
  status: ResultStatus;
  pointsOverride?: number | null;
};

export type DriverStanding = {
  classId: string;
  className: string;
  driverId: string;
  driverName: string;
  teamName?: string | null;
  points: number;
  starts: number;
  wins: number;
  podiums: number;
};

export type TeamStanding = {
  classId: string;
  className: string;
  teamId: string;
  teamName: string;
  points: number;
  starts: number;
  wins: number;
};

const classifiedStatuses = new Set<ResultStatus>(["CLASSIFIED"]);

export function pointsForResult(
  result: Pick<RaceResultInput, "position" | "status" | "pointsOverride">,
  awards: PointAwardInput[]
) {
  if (typeof result.pointsOverride === "number") {
    return result.pointsOverride;
  }

  if (!classifiedStatuses.has(result.status) || !result.position) {
    return 0;
  }

  return awards.find((award) => award.position === result.position)?.points ?? 0;
}

export function calculateDriverStandings(
  results: RaceResultInput[],
  awards: PointAwardInput[]
): DriverStanding[] {
  const standings = new Map<string, DriverStanding>();

  for (const result of results) {
    const key = `${result.classId}:${result.driverId}`;
    const current =
      standings.get(key) ??
      {
        classId: result.classId,
        className: result.className,
        driverId: result.driverId,
        driverName: result.driverName,
        teamName: result.teamName,
        points: 0,
        starts: 0,
        wins: 0,
        podiums: 0
      };

    const points = pointsForResult(result, awards);
    current.points += points;
    current.starts += result.status === "DNS" ? 0 : 1;
    current.wins += result.position === 1 && result.status === "CLASSIFIED" ? 1 : 0;
    current.podiums +=
      typeof result.position === "number" &&
      result.position <= 3 &&
      result.status === "CLASSIFIED"
        ? 1
        : 0;

    standings.set(key, current);
  }

  return Array.from(standings.values()).sort(compareDriverStandings);
}

export function calculateTeamStandings(
  results: RaceResultInput[],
  awards: PointAwardInput[],
  scoringDriversPerRace = 2
): TeamStanding[] {
  const standings = new Map<string, TeamStanding>();
  const raceClassTeamResults = new Map<string, RaceResultInput[]>();

  for (const result of results) {
    if (!result.teamId || !result.teamName) {
      continue;
    }

    const bucket = `${result.classId}:${result.raceId}:${result.teamId}`;
    raceClassTeamResults.set(bucket, [...(raceClassTeamResults.get(bucket) ?? []), result]);
  }

  for (const teamResults of raceClassTeamResults.values()) {
    const [firstResult] = teamResults;

    if (!firstResult?.teamId || !firstResult.teamName) {
      continue;
    }

    const key = `${firstResult.classId}:${firstResult.teamId}`;
    const scoredDrivers = teamResults
      .map((result) => ({
        result,
        points: pointsForResult(result, awards)
      }))
      .sort((a, b) => b.points - a.points || comparePosition(a.result, b.result))
      .slice(0, scoringDriversPerRace);

    const racePoints = scoredDrivers.reduce((total, item) => total + item.points, 0);
    const raceWin = teamResults.some(
      (result) => result.position === 1 && result.status === "CLASSIFIED"
    );
    const current =
      standings.get(key) ??
      {
        classId: firstResult.classId,
        className: firstResult.className,
        teamId: firstResult.teamId,
        teamName: firstResult.teamName,
        points: 0,
        starts: 0,
        wins: 0
      };

    current.points += racePoints;
    current.starts += 1;
    current.wins += raceWin ? 1 : 0;

    standings.set(key, current);
  }

  return Array.from(standings.values()).sort(compareTeamStandings);
}

function compareDriverStandings(a: DriverStanding, b: DriverStanding) {
  return (
    a.className.localeCompare(b.className) ||
    b.points - a.points ||
    b.wins - a.wins ||
    b.podiums - a.podiums ||
    a.driverName.localeCompare(b.driverName)
  );
}

function compareTeamStandings(a: TeamStanding, b: TeamStanding) {
  return (
    a.className.localeCompare(b.className) ||
    b.points - a.points ||
    b.wins - a.wins ||
    a.teamName.localeCompare(b.teamName)
  );
}

function comparePosition(a: RaceResultInput, b: RaceResultInput) {
  return (a.position ?? Number.MAX_SAFE_INTEGER) - (b.position ?? Number.MAX_SAFE_INTEGER);
}
