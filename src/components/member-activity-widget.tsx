import type { MemberActivity } from "@/lib/member-activity";

type MemberActivityWidgetProps = {
  latestMembers: readonly MemberActivity[];
  inactiveMembers: readonly MemberActivity[];
};

function MemberList({ members }: { members: readonly MemberActivity[] }) {
  return (
    <ul className="retro-member-list">
      {members.map((member) => (
        <li key={member.id}>{member.displayName}</li>
      ))}
    </ul>
  );
}

export function MemberActivityWidget({ latestMembers, inactiveMembers }: MemberActivityWidgetProps) {
  return (
    <aside className="retro-member-widget" aria-label="Medlemsaktivitet">
      <section>
        <h3 className="retro-member-heading">Nyeste medlemmer</h3>
        <MemberList members={latestMembers} />
      </section>
      <section>
        <h3 className="retro-member-heading">På vej ud...</h3>
        <MemberList members={inactiveMembers} />
      </section>
    </aside>
  );
}
