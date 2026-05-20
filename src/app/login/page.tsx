import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

  return (
    <main>
      <section className="page-hero">
        <h1>Login</h1>
        <p>Admin og kørere logger ind med DGTL-bruger eller Google SSO.</p>
      </section>
      <section className="section shell">
        <LoginForm googleEnabled={googleEnabled} />
      </section>
    </main>
  );
}
