import { describe, expect, it } from "vitest";

import { cars } from "@/lib/sample-data";
import { getProfileCarChoices, getProfileCarChoicesForLevel } from "./profile-car-choices";

describe("profile car choices", () => {
  it("uses the same GTR2 race car catalog as the cars page", () => {
    expect(getProfileCarChoices().map((car) => car.id)).toEqual(cars.map((car) => car.id));
  });

  it("filters Pro choices to GT and nGT according to the rules page", () => {
    expect(new Set(getProfileCarChoicesForLevel("PRO").map((car) => car.classId))).toEqual(
      new Set(["gt", "ngt"])
    );
  });

  it("filters Am choices to nGT, G2 and G3 according to the rules page", () => {
    expect(new Set(getProfileCarChoicesForLevel("AM").map((car) => car.classId))).toEqual(
      new Set(["ngt", "g2", "g3"])
    );
  });
});
