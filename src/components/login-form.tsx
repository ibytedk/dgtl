"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function LoginForm() {
  const [pending, setPending] = useState(false);

  return (
    <form
      className="admin-section login-form"
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setPending(true);

        await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          callbackUrl: "/admin"
        });

        setPending(false);
      }}
    >
      <label>
        Email
        <input name="email" type="email" defaultValue="admin@dgtl.dk" required />
      </label>
      <label>
        Password
        <input name="password" type="password" defaultValue="dgtl-dev-password" required />
      </label>
      <button className="button" type="submit" disabled={pending}>
        {pending ? "Logger ind" : "Log ind"}
      </button>
    </form>
  );
}
