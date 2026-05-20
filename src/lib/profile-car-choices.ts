import { isClassAllowedForDriverLevel } from "@/lib/driver-class-rules";
import type { DriverLevel } from "@/lib/driver-level";
import { cars, classById } from "@/lib/sample-data";

export type ProfileCarChoice = {
  id: string;
  name: string;
  classId: string;
  className: string;
};

export function getProfileCarChoices(): ProfileCarChoice[] {
  return cars.map((car) => ({
    id: car.id,
    name: car.name,
    classId: car.classId,
    className: classById(car.classId)?.name ?? car.classId
  }));
}

export function getProfileCarChoicesForLevel(level: DriverLevel) {
  return getProfileCarChoices().filter((car) => isClassAllowedForDriverLevel(level, car.classId));
}
