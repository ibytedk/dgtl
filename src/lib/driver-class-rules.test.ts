import { describe, expect, it } from "vitest";

import { cars } from "@/lib/sample-data";
import { getAllowedClassIdsForDriverLevel, isClassAllowedForDriverLevel } from "./driver-class-rules";

describe("driver class rules", () => {
  it("allows Pro drivers to choose GT and nGT only", () => {
    expect(getAllowedClassIdsForDriverLevel("PRO")).toEqual(["gt", "ngt"]);
    expect(isClassAllowedForDriverLevel("PRO", "gt")).toBe(true);
    expect(isClassAllowedForDriverLevel("PRO", "ngt")).toBe(true);
    expect(isClassAllowedForDriverLevel("PRO", "g2")).toBe(false);
    expect(isClassAllowedForDriverLevel("PRO", "g3")).toBe(false);
  });

  it("allows Am drivers to choose nGT, G2 and G3 only", () => {
    expect(getAllowedClassIdsForDriverLevel("AM")).toEqual(["ngt", "g2", "g3"]);
    expect(isClassAllowedForDriverLevel("AM", "gt")).toBe(false);
    expect(isClassAllowedForDriverLevel("AM", "ngt")).toBe(true);
    expect(isClassAllowedForDriverLevel("AM", "g2")).toBe(true);
    expect(isClassAllowedForDriverLevel("AM", "g3")).toBe(true);
  });

  it("filters the GTR2 car catalog by driver level", () => {
    const amClassIds = new Set(
      cars
        .filter((car) => isClassAllowedForDriverLevel("AM", car.classId))
        .map((car) => car.classId)
    );
    const proClassIds = new Set(
      cars
        .filter((car) => isClassAllowedForDriverLevel("PRO", car.classId))
        .map((car) => car.classId)
    );

    expect(amClassIds.has("gt")).toBe(false);
    expect(proClassIds.has("g3")).toBe(false);
  });
});
