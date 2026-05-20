import type { Gtr2CarClassId } from "@/lib/gtr2-cars";
import type { DriverLevel } from "@/lib/driver-level";

export const driverLevelAllowedClassIds = {
  PRO: ["gt", "ngt"],
  AM: ["ngt", "g2", "g3"]
} as const satisfies Record<DriverLevel, readonly Gtr2CarClassId[]>;

export function getAllowedClassIdsForDriverLevel(level: DriverLevel) {
  return driverLevelAllowedClassIds[level];
}

export function isClassAllowedForDriverLevel(level: DriverLevel, classId: string) {
  return (getAllowedClassIdsForDriverLevel(level) as readonly string[]).includes(classId);
}

export function driverLevelClassRuleText(level: DriverLevel) {
  return level === "PRO" ? "Pro må vælge GT eller nGT." : "Am må vælge nGT, G2 eller G3.";
}
