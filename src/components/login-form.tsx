"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

type LoginFormProps = {
  googleEnabled: boolean;
};

export function LoginForm({ googleEnabled }: LoginFormProps) {
  const [pending, setPending] = useState(false);
  const [googlePending, setGooglePending] = useState(false);

  return (
    <section className="admin-section login-form">
      <button
        className="button google-login-button"
        type="button"
        disabled={!googleEnabled || googlePending}
        onClick={async () => {
          setGooglePending(true);
          await signIn("google", { callbackUrl: "/profil" });
          setGooglePending(false);
        }}
      >
        {googlePending ? "Sender videre til Google" : "Log ind med Google"}
      </button>

      {!googleEnabled ? (
        <p className="login-help">Google SSO mangler GOOGLE_CLIENT_ID og GOOGLE_CLIENT_SECRET.</p>
      ) : null}

      <div className="login-divider">
        <span>eller</span>
      </div>

      <form
        className="credential-login-form"
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
          {pending ? "Logger ind" : "Log ind med email"}
        </button>
      </form>
    </section>
  );
}
