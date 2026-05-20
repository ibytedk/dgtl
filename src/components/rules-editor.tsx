"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bold, Heading2, Italic, List, ListOrdered, Pilcrow, Redo2, Save, Undo2 } from "lucide-react";

import { ruleDocumentSlugs, type RuleDocumentSlug } from "@/lib/rules";

type EditableRuleDocument = {
  id: string;
  slug: RuleDocumentSlug;
  title: string;
  scope: "GENERAL" | "SERIES";
  seriesSlug: string | null;
  bodyHtml: string;
  updatedAt: string;
};

const toolbarButtons = [
  { label: "Overskrift", icon: Heading2, command: "formatBlock", value: "h2" },
  { label: "Afsnit", icon: Pilcrow, command: "formatBlock", value: "p" },
  { label: "Fed", icon: Bold, command: "bold" },
  { label: "Kursiv", icon: Italic, command: "italic" },
  { label: "Punktopstilling", icon: List, command: "insertUnorderedList" },
  { label: "Nummereret liste", icon: ListOrdered, command: "insertOrderedList" },
  { label: "Fortryd", icon: Undo2, command: "undo" },
  { label: "Gentag", icon: Redo2, command: "redo" }
];

function sortRuleDocuments(documents: EditableRuleDocument[]) {
  return [...documents].sort(
    (a, b) => ruleDocumentSlugs.indexOf(a.slug) - ruleDocumentSlugs.indexOf(b.slug)
  );
}

export function RulesEditor() {
  const [documents, setDocuments] = useState<EditableRuleDocument[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<RuleDocumentSlug>("generelle-regler");
  const [status, setStatus] = useState("Henter regler...");
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const selectedDocument = useMemo(
    () => documents.find((document) => document.slug === selectedSlug),
    [documents, selectedSlug]
  );

  useEffect(() => {
    let isMounted = true;

    async function loadDocuments() {
      const response = await fetch("/api/admin/rules");
      const data = await response.json().catch(() => null);

      if (!isMounted) {
        return;
      }

      if (!response.ok) {
        setStatus(data?.error ?? "Kunne ikke hente regler.");
        return;
      }

      const loadedDocuments = sortRuleDocuments(data.documents);
      setDocuments(loadedDocuments);
      setSelectedSlug(loadedDocuments[0]?.slug ?? "generelle-regler");
      setStatus("Regler hentet.");
    }

    loadDocuments().catch(() => {
      if (isMounted) {
        setStatus("Kunne ikke hente regler.");
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  function runCommand(command: string, value?: string) {
    window.document.execCommand(command, false, value);
    editorRef.current?.focus();
  }

  async function saveDocument() {
    if (!selectedDocument) {
      return;
    }

    setIsSaving(true);
    setStatus("Gemmer regler...");

    const response = await fetch("/api/admin/rules", {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        slug: selectedDocument.slug,
        title: selectedDocument.title,
        bodyHtml: editorRef.current?.innerHTML ?? selectedDocument.bodyHtml
      })
    });
    const data = await response.json().catch(() => null);
    setIsSaving(false);

    if (!response.ok) {
      setStatus(data?.error ?? "Kunne ikke gemme regler.");
      return;
    }

    setDocuments((currentDocuments) =>
      sortRuleDocuments(
        currentDocuments.map((document) =>
          document.slug === data.document.slug ? data.document : document
        )
      )
    );
    setStatus("Regler gemt.");
  }

  function updateSelectedTitle(title: string) {
    setDocuments((currentDocuments) =>
      currentDocuments.map((document) =>
        document.slug === selectedSlug ? { ...document, title } : document
      )
    );
  }

  return (
    <section id="rules" className="admin-section rules-editor-panel">
      <div className="admin-section-heading">
        <div>
          <h2>Regler</h2>
          <p>Rediger de generelle regler og DGTL Endurance-tillægsreglerne.</p>
        </div>
        <button className="button" type="button" disabled={!selectedDocument || isSaving} onClick={saveDocument}>
          <Save size={18} aria-hidden="true" /> Gem regler
        </button>
      </div>

      <div className="rules-editor-tabs" role="tablist" aria-label="Regeldokumenter">
        {documents.map((document) => (
          <button
            key={document.slug}
            type="button"
            className={document.slug === selectedSlug ? "active" : ""}
            onClick={() => setSelectedSlug(document.slug)}
          >
            {document.scope === "SERIES" ? "Endurance" : "Generelle"}
          </button>
        ))}
      </div>

      {selectedDocument ? (
        <div className="rules-editor">
          <label>
            Titel
            <input
              value={selectedDocument.title}
              onChange={(event) => updateSelectedTitle(event.target.value)}
            />
          </label>
          <div className="rules-editor-toolbar" aria-label="WYSIWYG værktøjer">
            {toolbarButtons.map((button) => {
              const Icon = button.icon;

              return (
                <button
                  key={`${button.command}-${button.value ?? "default"}`}
                  type="button"
                  aria-label={button.label}
                  title={button.label}
                  onClick={() => runCommand(button.command, button.value)}
                >
                  <Icon size={17} aria-hidden="true" />
                </button>
              );
            })}
          </div>
          <div
            key={selectedDocument.slug}
            ref={editorRef}
            className="rules-wysiwyg"
            contentEditable
            suppressContentEditableWarning
            dangerouslySetInnerHTML={{ __html: selectedDocument.bodyHtml }}
          />
        </div>
      ) : (
        <p className="form-status">Ingen regeldokumenter fundet.</p>
      )}
      <p className="form-status">{status}</p>
    </section>
  );
}
