import type { MemberActivity } from "@/lib/member-activity";

type MemberActivityWidgetProps = {
  latestMembers: readonly MemberActivity[];
  inactiveMembers: readonly MemberActivity[];
};

function MemberList({ members }: { members: readonly MemberActivity[] }) {
  return (
    <ul className="member-activity-list">
      {members.map((member) => (
        <li key={member.id}>{member.displayName}</li>
      ))}
    </ul>
  );
}

export function MemberActivityWidget({ latestMembers, inactiveMembers }: MemberActivityWidgetProps) {
  return (
    <aside className="member-activity-widget" aria-label="Medlemsaktivitet">
      <div className="concept-panel-title member-activity-title">
        <h2>Medlemmer</h2>
      </div>
      <section>
        <h3>Nyeste medlemmer</h3>
        <MemberList members={latestMembers} />
      </section>
      <section>
        <h3>På vej ud...</h3>
        <MemberList members={inactiveMembers} />
      </section>
    </aside>
  );
}
