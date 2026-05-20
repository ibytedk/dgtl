import Link from "next/link";
import type { Route } from "next";

const navItems: Array<{ href: Route; label: string }> = [
  { href: "/kalender", label: "Kalender" },
  { href: "/baner", label: "Baner" },
  { href: "/biler", label: "Biler" },
  { href: "/regler" as Route, label: "Regler" },
  { href: "/stillinger", label: "Stillinger" },
  { href: "/downloads", label: "Downloads" },
  { href: "/nyheder", label: "Nyheder" }
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-lockup" aria-label="DGTL forside">
        <span className="brand-mark">DGTL</span>
        <span className="brand-subtitle">Danish Grand Touring League</span>
      </Link>
      <nav className="main-nav" aria-label="Primær navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link className="header-action" href="/login">
          Login
        </Link>
        <Link className="header-action strong" href="/profil">
          Opret konto
        </Link>
      </div>
    </header>
  );
}
