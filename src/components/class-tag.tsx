import type { CSSProperties } from "react";

import { classById } from "@/lib/sample-data";

export function ClassTag({ classId, label }: { classId: string; label?: string }) {
  const racingClass = classById(classId);

  return (
    <span
      className="class-tag"
      style={{ "--tag-color": racingClass?.color ?? "#ffffff" } as CSSProperties}
    >
      {label ?? racingClass?.name ?? classId}
    </span>
  );
}
