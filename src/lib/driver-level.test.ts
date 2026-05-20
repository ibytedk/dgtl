import { describe, expect, it } from "vitest";

import {
  classifyDriverIntent,
  driverIntentOptions,
  driverLevelLabel,
  intentForDriverLevel
} from "./driver-level";

describe("driver level classification", () => {
  it("classifies fun drivers as Am", () => {
    expect(classifyDriverIntent("FUN")).toBe("AM");
    expect(driverLevelLabel("AM")).toBe("Am");
  });

  it("classifies win-focused drivers as Pro", () => {
    expect(classifyDriverIntent("WIN")).toBe("PRO");
    expect(driverLevelLabel("PRO")).toBe("Pro");
  });

  it("can derive the selected intent from an existing level", () => {
    expect(intentForDriverLevel("AM")).toBe("FUN");
    expect(intentForDriverLevel("PRO")).toBe("WIN");
  });

  it("labels public choices with Pro and Am", () => {
    expect(driverIntentOptions.map((option) => option.label)).toEqual([
      "Kører for sjov (Am)",
      "Kører for at vinde (Pro)"
    ]);
  });
});
