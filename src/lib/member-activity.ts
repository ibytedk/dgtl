const dayMs = 24 * 60 * 60 * 1000;

export type MemberActivity = {
  id: string;
  displayName: string;
  createdAt: string;
  lastLoginAt: string | null;
};

function timeValue(value: string | null) {
  return value ? Date.parse(value) : Number.NEGATIVE_INFINITY;
}

export function getLatestMembers<TMember extends MemberActivity>(members: readonly TMember[], limit = 5) {
  return [...members]
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, limit);
}

export function getMembersOnTheWayOut<TMember extends MemberActivity>(
  members: readonly TMember[],
  nowIso: string,
  inactiveDays = 30,
  limit = 10
) {
  const cutoff = Date.parse(nowIso) - inactiveDays * dayMs;

  return [...members]
    .filter((member) => timeValue(member.lastLoginAt) <= cutoff)
    .sort((a, b) => timeValue(a.lastLoginAt) - timeValue(b.lastLoginAt))
    .slice(0, limit);
}
