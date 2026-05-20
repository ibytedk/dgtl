import { ShieldCheck } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { defaultRuleDocuments, ruleDocumentSlugs, sanitizeRuleHtml } from "@/lib/rules";

export const dynamic = "force-dynamic";

type RuleViewModel = {
  slug: string;
  title: string;
  scope: string;
  seriesSlug: string | null;
  bodyHtml: string;
  updatedAt: Date | null;
};

async function getRuleDocuments(): Promise<RuleViewModel[]> {
  const storedDocuments = await prisma.ruleDocument.findMany({
    where: { slug: { in: [...ruleDocumentSlugs] } }
  });

  return ruleDocumentSlugs.map((slug) => {
    const storedDocument = storedDocuments.find((document) => document.slug === slug);
    const defaultDocument = defaultRuleDocuments.find((document) => document.slug === slug);

    return {
      slug,
      title: storedDocument?.title ?? defaultDocument?.title ?? slug,
      scope: storedDocument?.scope ?? defaultDocument?.scope ?? "GENERAL",
      seriesSlug: storedDocument?.seriesSlug ?? defaultDocument?.seriesSlug ?? null,
      bodyHtml: sanitizeRuleHtml(storedDocument?.bodyHtml ?? defaultDocument?.bodyHtml ?? ""),
      updatedAt: storedDocument?.updatedAt ?? null
    };
  });
}

export default async function RulesPage() {
  const documents = await getRuleDocuments();

  return (
    <main>
      <section className="page-hero rules-hero">
        <h1>Regler</h1>
        <p>
          Generelle DGTL-regler og tillægsregler for DGTL Endurance. Reglerne redigeres fra
          administrationen og vises her som gældende reference.
        </p>
      </section>
      <section className="section shell rules-layout">
        <aside className="rules-index" aria-label="Regeloversigt">
          <ShieldCheck size={28} aria-hidden="true" />
          <strong>Regelsæt</strong>
          {documents.map((document) => (
            <a key={document.slug} href={`#${document.slug}`}>
              {document.title}
            </a>
          ))}
        </aside>
        <div className="rules-content">
          {documents.map((document) => (
            <article key={document.slug} id={document.slug} className="rule-document">
              <div className="rule-document-heading">
                <span>{document.scope === "SERIES" ? "Tillægsregler" : "Generelle regler"}</span>
                <h2>{document.title}</h2>
                {document.updatedAt ? (
                  <p>
                    Sidst opdateret{" "}
                    {new Intl.DateTimeFormat("da-DK", {
                      dateStyle: "medium",
                      timeZone: "Europe/Copenhagen"
                    }).format(document.updatedAt)}
                  </p>
                ) : null}
              </div>
              <div
                className="rule-rich-text"
                dangerouslySetInnerHTML={{ __html: document.bodyHtml }}
              />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
