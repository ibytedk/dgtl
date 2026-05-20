import { UploadCloud, UserRound } from "lucide-react";

import { ClassTag } from "@/components/class-tag";
import { ProfileLevelSelector } from "@/components/profile-level-selector";
import { driverLevelLabel } from "@/lib/driver-level";
import { carById, drivers, skinUploads } from "@/lib/sample-data";

export default function ProfilePage() {
  const driver = drivers[0];
  const car = carById(driver.preferredCarId);

  return (
    <main>
      <section className="page-hero">
        <h1>Kørerprofil</h1>
        <p>
          Kørere kan vedligeholde profil, team, bilvalg, løbstilmeldinger og skin uploads.
        </p>
      </section>
      <section className="section split-band">
        <div className="points-panel">
          <UserRound size={34} aria-hidden="true" />
          <h3>
            #{driver.racingNumber} {driver.name}
          </h3>
          <p>
            Team: {driver.teamId} / Bil: {car?.name}
          </p>
          <span className={`driver-level-badge ${driver.level.toLowerCase()}`}>
            {driverLevelLabel(driver.level)}
          </span>
          {car ? <ClassTag classId={car.classId} /> : null}
        </div>
        <div>
          <h2>Profiltype</h2>
          <ProfileLevelSelector currentLevel={driver.level} />
          <h2>Upload skin</h2>
          <form className="admin-form">
            <label>
              Bil
              <input defaultValue={car?.name} name="car" />
            </label>
            <label>
              Skin ZIP
              <input type="file" name="skin" accept=".zip,.rar,.7z" />
            </label>
            <button type="button" className="button">
              <UploadCloud size={18} aria-hidden="true" /> Send til godkendelse
            </button>
          </form>
          <div className="table-shell" style={{ marginTop: 24 }}>
            <table>
              <thead>
                <tr>
                  <th>Fil</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {skinUploads
                  .filter((upload) => upload.driverId === driver.id)
                  .map((upload) => (
                    <tr key={upload.id}>
                      <td>{upload.fileName}</td>
                      <td>{upload.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
