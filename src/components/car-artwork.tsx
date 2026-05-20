import type { CSSProperties } from "react";

type CarArtworkProps = {
  name: string;
  classLabel?: string;
  year?: number | string | null;
  artwork: {
    body: string;
    stripe: string;
    number: string;
  };
  compact?: boolean;
};

export function CarArtwork({ name, classLabel, year, artwork, compact = false }: CarArtworkProps) {
  return (
    <svg
      className={compact ? "car-artwork compact" : "car-artwork"}
      role="img"
      aria-label={`${name} original illustration`}
      viewBox="0 0 720 420"
      style={
        {
          "--car-body": artwork.body,
          "--car-stripe": artwork.stripe
        } as CSSProperties
      }
    >
      <rect width="720" height="420" fill="#0b111b" />
      <path d="M0 312h720v108H0z" fill="#141b26" />
      <path d="M62 302h596" stroke="rgba(255,255,255,.18)" strokeWidth="6" strokeLinecap="round" />
      <path
        d="M92 270c21-47 63-78 126-93l56-72h155l69 72c63 10 103 40 121 92l-32 42H123z"
        fill="var(--car-body)"
      />
      <path
        d="M272 116h144l45 58H226z"
        fill="#101722"
        stroke="rgba(255,255,255,.32)"
        strokeWidth="5"
      />
      <path d="M106 268h511l-20 43H124z" fill="rgba(255,255,255,.12)" />
      <path d="M144 230h429" stroke="var(--car-stripe)" strokeWidth="20" strokeLinecap="round" />
      <path d="M228 176h232" stroke="var(--car-stripe)" strokeWidth="12" strokeLinecap="round" />
      <circle cx="195" cy="312" r="52" fill="#06080d" />
      <circle cx="195" cy="312" r="24" fill="#cfd7e2" />
      <circle cx="526" cy="312" r="52" fill="#06080d" />
      <circle cx="526" cy="312" r="24" fill="#cfd7e2" />
      <rect x="294" y="204" width="132" height="76" rx="6" fill="rgba(0,0,0,.34)" />
      <text x="360" y="256" textAnchor="middle" fill="#fff" fontFamily="Arial, sans-serif" fontSize="42" fontWeight="900">
        {artwork.number}
      </text>
      <text x="48" y="66" fill="#fff" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="900">
        {classLabel ?? "GTR2"}
      </text>
      {year ? (
        <text x="48" y="98" fill="rgba(255,255,255,.68)" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700">
          {year}
        </text>
      ) : null}
      <text
        x="672"
        y="366"
        textAnchor="end"
        fill="rgba(255,255,255,.78)"
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fontWeight="900"
      >
        DGTL
      </text>
    </svg>
  );
}
