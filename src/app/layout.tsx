import type { Metadata } from "next";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "DGTL - Danish Grand Touring League",
  description: "SIMBIN GTR2 liga med kalender, tilmelding, resultater, teams og downloads."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="da">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
