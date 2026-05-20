import { describe, expect, it } from "vitest";
import {
  calculateDriverStandings,
  calculateTeamStandings,
  pointsForResult,
  type PointAwardInput,
  type RaceResultInput
} from "./standings";

const awards: PointAwardInput[] = [
  { position: 1, points: 25 },
  { position: 2, points: 18 },
  { position: 3, points: 15 },
  { position: 4, points: 12 },
  { position: 5, points: 10 }
];

const results: RaceResultInput[] = [
  {
    raceId: "spa",
    raceName: "Spa 500",
    classId: "gt",
    className: "GT",
    driverId: "driver-1",
    driverName: "Mads Holm",
    teamId: "team-a",
    teamName: "Nordic Apex",
    position: 1,
    status: "CLASSIFIED"
  },
  {
    raceId: "spa",
    raceName: "Spa 500",
    classId: "gt",
    className: "GT",
    driverId: "driver-2",
    driverName: "Jonas Vang",
    teamId: "team-a",
    teamName: "Nordic Apex",
    position: 3,
    status: "CLASSIFIED"
  },
  {
    raceId: "spa",
    raceName: "Spa 500",
    classId: "gt",
    className: "GT",
    driverId: "driver-3",
    driverName: "Rasmus Falk",
    teamId: "team-a",
    teamName: "Nordic Apex",
    position: 4,
    status: "CLASSIFIED"
  },
  {
    raceId: "spa",
    raceName: "Spa 500",
    classId: "gt",
    className: "GT",
    driverId: "driver-4",
    driverName: "Emil Riis",
    teamId: "team-b",
    teamName: "Jylland Racing",
    position: 2,
    status: "CLASSIFIED"
  },
  {
    raceId: "spa",
    raceName: "Spa 500",
    classId: "ngt",
    className: "nGT",
    driverId: "driver-5",
    driverName: "Sara Lund",
    teamId: "team-c",
    teamName: "Copenhagen GT",
    position: 1,
    status: "CLASSIFIED"
  }
];

describe("standings", () => {
  it("scores classified positions from the active point scale", () => {
    expect(pointsForResult({ position: 2, status: "CLASSIFIED" }, awards)).toBe(18);
    expect(pointsForResult({ position: 2, status: "DNF" }, awards)).toBe(0);
    expect(pointsForResult({ position: 20, status: "CLASSIFIED" }, awards)).toBe(0);
  });

  it("keeps championship standings separated by class", () => {
    const standings = calculateDriverStandings(results, awards);

    expect(standings.find((standing) => standing.className === "GT")?.driverName).toBe(
      "Mads Holm"
    );
    expect(standings.find((standing) => standing.className === "nGT")?.driverName).toBe(
      "Sara Lund"
    );
  });

  it("uses only the two best team drivers per race and class", () => {
    const standings = calculateTeamStandings(results, awards);
    const nordicApex = standings.find(
      (standing) => standing.className === "GT" && standing.teamName === "Nordic Apex"
    );

    expect(nordicApex?.points).toBe(40);
  });
});
