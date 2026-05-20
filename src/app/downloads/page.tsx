import { Download, LockKeyhole, UploadCloud } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { formatFileSize } from "@/lib/format";
import { downloads, skinUploads } from "@/lib/sample-data";

export default function DownloadsPage() {
  return (
    <main>
      <section className="page-hero">
        <h1>Downloads</h1>
        <p>
          Godkendte skins, serverfiler, baner, patches og senere sync-tool samles her, så
          feltet kører på samme filer.
        </p>
      </section>
      <section className="section download-band">
        <div>
          <SectionHeading title="Publicerede filer" />
          <div className="download-list">
            {downloads
              .filter((download) => download.isPublished)
              .map((download) => (
                <article key={download.id} className="download-row">
                  <Download size={22} aria-hidden="true" />
                  <div>
                    <h3>{download.title}</h3>
                    <p>
                      {download.category} / {download.version} / {formatFileSize(download.fileSize)}
                    </p>
                    <p>{download.description}</p>
                  </div>
                  <a className="button small secondary" href={`/api/downloads/${download.slug}`}>
                    Hent
                  </a>
                </article>
              ))}
          </div>
        </div>
        <aside className="upload-status">
          <UploadCloud size={34} aria-hidden="true" />
          <strong>{skinUploads.filter((upload) => upload.status === "APPROVED").length}</strong>
          <span>godkendte skin uploads</span>
        </aside>
      </section>
      <section className="section shell">
        <SectionHeading
          title="Skin moderation"
          intro="Køreruploads starter som pending og bliver først synlige efter admin approval."
        />
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>Fil</th>
                <th>Status</th>
                <th>Størrelse</th>
                <th>Synlighed</th>
              </tr>
            </thead>
            <tbody>
              {skinUploads.map((upload) => (
                <tr key={upload.id}>
                  <td>{upload.fileName}</td>
                  <td>{upload.status}</td>
                  <td>{formatFileSize(upload.fileSize)}</td>
                  <td>
                    {upload.status === "APPROVED" ? (
                      "Downloadsektion"
                    ) : (
                      <span>
                        <LockKeyhole size={14} aria-hidden="true" /> Afventer
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
