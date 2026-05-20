"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      className="header-action header-action-button"
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Log ud
    </button>
  );
}
