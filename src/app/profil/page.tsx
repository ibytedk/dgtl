import { UploadCloud, UserRound } from "lucide-react";

import { getDgtlSession } from "@/auth";
import { ClassTag } from "@/components/class-tag";
import { DriverProfileForm, type ProfileCarChoice } from "@/components/driver-profile-form";
import { driverLevelLabel, type DriverLevel } from "@/lib/driver-level";
import { prisma } from "@/lib/prisma";
import { carById, cars, classById, drivers, skinUploads } from "@/lib/sample-data";

export const dynamic = "force-dynamic";

type ProfileUpload = {
  id: string;
  fileName: string;
  status: string;
};

type ProfileView = {
  name: string;
  handle: string;
  racingNumber?: number;
  level: DriverLevel;
  preferredCarId?: string | null;
  carName?: string;
  carClassId?: string;
  teamLabel: string;
  uploads: ProfileUpload[];
  carChoices: ProfileCarChoice[];
};

function defaultHandle(value: string) {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9æøåÆØÅ_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function sampleCarChoices(): ProfileCarChoice[] {
  return cars.map((car) => ({
    id: car.id,
    name: car.name,
    classId: car.classId,
    className: classById(car.classId)?.name ?? car.classId
  }));
}

async function databaseProfileView(userId: string): Promise<ProfileView | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: {
        include: {
          preferredCar: { include: { class: true } },
          team: true,
          skinUploads: true
        }
      }
    }
  });

  if (!user) {
    return null;
  }

  const dbCars = await prisma.car.findMany({
    include: { class: true },
    orderBy: [{ classId: "asc" }, { name: "asc" }]
  });

  return {
    name: user.name,
    handle: user.profile?.handle ?? defaultHandle(user.name),
    racingNumber: user.profile?.racingNumber,
    level: user.profile?.level ?? "AM",
    preferredCarId: user.profile?.preferredCarId,
    carName: user.profile?.preferredCar?.name,
    carClassId: user.profile?.preferredCar?.classId,
    teamLabel: user.profile?.team?.name ?? "Ikke valgt",
    uploads:
      user.profile?.skinUploads.map((upload) => ({
        id: upload.id,
        fileName: upload.fileName,
        status: upload.status
      })) ?? [],
    carChoices: dbCars.map((car) => ({
      id: car.id,
      name: car.name,
      classId: car.classId,
      className: car.class.name
    }))
  };
}

async function profileView(): Promise<ProfileView> {
  const session = await getDgtlSession();
  const dbProfile = session?.user?.id ? await databaseProfileView(session.user.id) : null;

  if (dbProfile) {
    return dbProfile;
  }

  const driver = drivers[0];
  const car = carById(driver.preferredCarId);

  return {
    name: driver.name,
    handle: driver.handle,
    racingNumber: driver.racingNumber,
    level: driver.level,
    preferredCarId: driver.preferredCarId,
    carName: car?.name,
    carClassId: car?.classId,
    teamLabel: driver.teamId,
    uploads: skinUploads
      .filter((upload) => upload.driverId === driver.id)
      .map((upload) => ({
        id: upload.id,
        fileName: upload.fileName,
        status: upload.status
      })),
    carChoices: sampleCarChoices()
  };
}

export default async function ProfilePage() {
  const profile = await profileView();

  return (
    <main>
      <section className="page-hero">
        <h1>Kørerprofil</h1>
        <p>
          Kørere kan vedligeholde navn, profiltype, bilvalg, løbstilmeldinger og skin uploads.
        </p>
      </section>
      <section className="section split-band profile-split-band">
        <div className="points-panel">
          <UserRound size={34} aria-hidden="true" />
          <h3>
            {profile.racingNumber ? `#${profile.racingNumber} ` : ""}
            {profile.name}
          </h3>
          <p>
            Team: {profile.teamLabel} / Bil: {profile.carName ?? "Ikke valgt endnu"}
          </p>
          <span className={`driver-level-badge ${profile.level.toLowerCase()}`}>
            {driverLevelLabel(profile.level)}
          </span>
          {profile.carClassId ? <ClassTag classId={profile.carClassId} /> : null}
        </div>
        <div>
          <h2>Profiltype og bilvalg</h2>
          <DriverProfileForm
            initialName={profile.name}
            initialHandle={profile.handle}
            initialRacingNumber={profile.racingNumber}
            currentLevel={profile.level}
            preferredCarId={profile.preferredCarId}
            cars={profile.carChoices}
          />
          <h2>Upload skin</h2>
          <form className="admin-form">
            <label>
              Bil
              <input defaultValue={profile.carName ?? "Gem profil og bilvalg først"} name="car" disabled />
            </label>
            <label>
              Skin ZIP
              <input type="file" name="skin" accept=".zip,.rar,.7z" disabled={!profile.preferredCarId} />
            </label>
            <button type="button" className="button" disabled={!profile.preferredCarId}>
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
                {profile.uploads.map((upload) => (
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
