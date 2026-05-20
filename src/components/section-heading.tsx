import type { ReactNode } from "react";

export function SectionHeading({
  title,
  intro,
  action
}: {
  title: string;
  intro?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      {action ? <div className="section-action">{action}</div> : null}
    </div>
  );
}
