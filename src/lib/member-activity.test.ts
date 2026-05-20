import { describe, expect, it } from "vitest";

import { getLatestMembers, getMembersOnTheWayOut, type MemberActivity } from "./member-activity";

const members = [
  {
    id: "old",
    displayName: "Old",
    createdAt: "2026-01-01T12:00:00.000Z",
    lastLoginAt: "2026-04-19T11:59:59.000Z"
  },
  {
    id: "cutoff",
    displayName: "Cutoff",
    createdAt: "2026-05-19T12:00:00.000Z",
    lastLoginAt: "2026-04-20T12:00:00.000Z"
  },
  {
    id: "active",
    displayName: "Active",
    createdAt: "2026-05-18T12:00:00.000Z",
    lastLoginAt: "2026-04-20T12:00:01.000Z"
  },
  {
    id: "never",
    displayName: "Never",
    createdAt: "2026-05-20T12:00:00.000Z",
    lastLoginAt: null
  }
] satisfies MemberActivity[];

describe("member activity", () => {
  it("returns newest members by profile creation date", () => {
    expect(getLatestMembers(members, 2).map((member) => member.id)).toEqual(["never", "cutoff"]);
  });

  it("marks members as on the way out after 30 days without login", () => {
    expect(getMembersOnTheWayOut(members, "2026-05-20T12:00:00.000Z").map((member) => member.id)).toEqual([
      "never",
      "old",
      "cutoff"
    ]);
  });
});
