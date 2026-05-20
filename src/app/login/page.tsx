import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main>
      <section className="page-hero">
        <h1>Login</h1>
        <p>Admin og kørere logger ind med de brugere, der ligger i DGTL-databasen.</p>
      </section>
      <section className="section shell">
        <LoginForm />
      </section>
    </main>
  );
}
