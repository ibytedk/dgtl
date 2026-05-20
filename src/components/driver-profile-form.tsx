"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  driverLevelClassRuleText,
  isClassAllowedForDriverLevel
} from "@/lib/driver-class-rules";
import {
  classifyDriverIntent,
  driverIntentOptions,
  driverLevelLabel,
  intentForDriverLevel,
  type DriverIntent,
  type DriverLevel
} from "@/lib/driver-level";
import type { ProfileCarChoice } from "@/lib/profile-car-choices";

type DriverProfileFormProps = {
  initialName: string;
  initialHandle: string;
  initialRacingNumber?: number;
  currentLevel: DriverLevel;
  preferredCarId?: string | null;
  cars: readonly ProfileCarChoice[];
};

export function DriverProfileForm({
  initialName,
  initialHandle,
  initialRacingNumber,
  currentLevel,
  preferredCarId,
  cars
}: DriverProfileFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [handle, setHandle] = useState(initialHandle);
  const [racingNumber, setRacingNumber] = useState(initialRacingNumber?.toString() ?? "");
  const [selectedIntent, setSelectedIntent] = useState<DriverIntent>(
    intentForDriverLevel(currentLevel)
  );
  const [selectedCarId, setSelectedCarId] = useState(preferredCarId ?? "");
  const [status, setStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const selectedLevel = useMemo(() => classifyDriverIntent(selectedIntent), [selectedIntent]);
  const eligibleCars = useMemo(
    () => cars.filter((car) => isClassAllowedForDriverLevel(selectedLevel, car.classId)),
    [cars, selectedLevel]
  );
  const activeCarId = eligibleCars.some((car) => car.id === selectedCarId)
    ? selectedCarId
    : eligibleCars[0]?.id ?? "";

  return (
    <form
      className="profile-details-form"
      onSubmit={async (event) => {
        event.preventDefault();
        setIsSaving(true);
        setStatus("Gemmer profil...");

        const parsedRacingNumber = Number(racingNumber);

        if (!Number.isInteger(parsedRacingNumber) || parsedRacingNumber < 1) {
          setIsSaving(false);
          setStatus("Startnummer skal være et helt tal over 0.");
          return;
        }

        const response = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            name,
            handle,
            racingNumber: parsedRacingNumber,
            intent: selectedIntent,
            carId: activeCarId
          })
        });
        const result = (await response.json().catch(() => null)) as { error?: string } | null;

        setIsSaving(false);
        setStatus(response.ok ? "Profil gemt." : result?.error ?? "Kunne ikke gemme profilen.");

        if (response.ok) {
          router.refresh();
        }
      }}
    >
      <div className="profile-field-grid">
        <label>
          Navn
          <input value={name} name="name" onChange={(event) => setName(event.target.value)} required />
        </label>
        <label>
          Kaldenavn
          <input
            value={handle}
            name="handle"
            onChange={(event) => setHandle(event.target.value)}
            required
          />
        </label>
        <label>
          Startnummer
          <input
            value={racingNumber}
            inputMode="numeric"
            min={1}
            max={999}
            name="racingNumber"
            type="number"
            onChange={(event) => setRacingNumber(event.target.value)}
            required
          />
        </label>
      </div>

      <div className="profile-level-heading">
        <span>Ambitionsniveau</span>
        <strong>{driverLevelLabel(selectedLevel)}</strong>
      </div>
      <div className="profile-level-options">
        {driverIntentOptions.map((option) => (
          <label key={option.intent} className="profile-level-option">
            <input
              checked={selectedIntent === option.intent}
              name="intent"
              type="radio"
              value={option.intent}
              onChange={() => setSelectedIntent(option.intent)}
            />
            <span>
              {option.label}
              <small>{option.description}</small>
            </span>
            <b>{driverLevelLabel(option.level)}</b>
          </label>
        ))}
      </div>

      <label className="profile-car-select">
        Bilvalg efter profilregler
        <select
          aria-label="Bilvalg efter profilregler"
          value={activeCarId}
          name="carId"
          onChange={(event) => setSelectedCarId(event.target.value)}
          required
        >
          {eligibleCars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.className} - {car.name}
            </option>
          ))}
        </select>
        <small>{driverLevelClassRuleText(selectedLevel)}</small>
      </label>

      <button className="button" type="submit" disabled={isSaving || !activeCarId}>
        {isSaving ? "Gemmer profil" : "Gem profil"}
      </button>
      {status ? <p className="form-status">{status}</p> : null}
    </form>
  );
}
