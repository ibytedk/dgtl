export type DriverIntent = "FUN" | "WIN";
export type DriverLevel = "AM" | "PRO";

export const driverIntentOptions: Array<{
  intent: DriverIntent;
  label: string;
  description: string;
  level: DriverLevel;
}> = [
  {
    intent: "FUN",
    label: "Kører for sjov (Am)",
    description: "Fokus på fair racing, stemning og stabil deltagelse.",
    level: "AM"
  },
  {
    intent: "WIN",
    label: "Kører for at vinde (Pro)",
    description: "Fokus på pace, resultater og mesterskabskamp.",
    level: "PRO"
  }
];

export function classifyDriverIntent(intent: DriverIntent): DriverLevel {
  return intent === "WIN" ? "PRO" : "AM";
}

export function intentForDriverLevel(level: DriverLevel): DriverIntent {
  return level === "PRO" ? "WIN" : "FUN";
}

export function driverLevelLabel(level: DriverLevel) {
  return level === "PRO" ? "Pro" : "Am";
}
