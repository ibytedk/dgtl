"use client";

import { useMemo, useState } from "react";

import {
  classifyDriverIntent,
  driverIntentOptions,
  driverLevelLabel,
  intentForDriverLevel,
  type DriverIntent,
  type DriverLevel
} from "@/lib/driver-level";

export function ProfileLevelSelector({ currentLevel }: { currentLevel: DriverLevel }) {
  const [selectedIntent, setSelectedIntent] = useState<DriverIntent>(
    intentForDriverLevel(currentLevel)
  );
  const [status, setStatus] = useState<string | null>(null);
  const selectedLevel = useMemo(() => classifyDriverIntent(selectedIntent), [selectedIntent]);

  return (
    <form
      className="profile-level-form"
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus("Gemmer niveau...");

        const response = await fetch("/api/profile/level", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ intent: selectedIntent })
        });

        setStatus(response.ok ? "Niveau gemt." : "Kunne ikke gemme niveauet.");
      }}
    >
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
      <button className="button" type="submit">
        Gem niveau
      </button>
      {status ? <p className="form-status">{status}</p> : null}
    </form>
  );
}
