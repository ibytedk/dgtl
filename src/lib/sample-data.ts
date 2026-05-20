import {
  calculateDriverStandings,
  calculateTeamStandings,
  type PointAwardInput,
  type RaceResultInput
} from "@/lib/standings";
import { gtr2Cars } from "@/lib/gtr2-cars";
import { gtr2Tracks } from "@/lib/gtr2-tracks";

export const racingClasses = [
  {
    id: "gt",
    name: "GT",
    slug: "gt",
    color: "#f04b37",
    description: "GTR2-årenes hurtigste FIA GT-biler med typisk 600+ hk."
  },
  {
    id: "ngt",
    name: "nGT",
    slug: "ngt",
    color: "#19c6b7",
    description: "Den mindre FIA GT-klasse med Ferrari 360, Porsche GT3 og TVR."
  },
  {
    id: "g2",
    name: "G2",
    slug: "g2",
    color: "#ffd15f",
    description: "Special- og 24-timersbiler udenfor den normale GT/nGT-struktur."
  },
  {
    id: "g3",
    name: "G3",
    slug: "g3",
    color: "#8fd14f",
    description: "Cup- og lettere GT-biler med lavere effekt og tydelig momentumkørsel."
  }
] as const;

export const tracks = gtr2Tracks;

export const cars = gtr2Cars;

export const pointScale = {
  id: "fia-gt-2005",
  name: "DGTL 25-point skala",
  slug: "dgtl-25-point",
  awards: [
    { position: 1, points: 25 },
    { position: 2, points: 18 },
    { position: 3, points: 15 },
    { position: 4, points: 12 },
    { position: 5, points: 10 },
    { position: 6, points: 8 },
    { position: 7, points: 6 },
    { position: 8, points: 4 },
    { position: 9, points: 2 },
    { position: 10, points: 1 }
  ] satisfies PointAwardInput[]
};

export const teams = [
  {
    id: "nordic-apex",
    name: "Nordic Apex",
    slug: "nordic-apex",
    description: "To hurtige GT-kørere og et setup-arkiv der aldrig sover."
  },
  {
    id: "jylland-racing",
    name: "Jylland Racing",
    slug: "jylland-racing",
    description: "Langdistance-disciplin, stabile stints og stærk teamstrategi."
  },
  {
    id: "copenhagen-gt",
    name: "Copenhagen GT",
    slug: "copenhagen-gt",
    description: "nGT-specialister med fokus på rene dueller og lav fejlrate."
  }
] as const;

export const drivers = [
  {
    id: "mads-holm",
    name: "Mads Holm",
    email: "mads@example.test",
    handle: "MadsH",
    racingNumber: 7,
    level: "PRO",
    teamId: "nordic-apex",
    preferredCarId: "maserati-mc12-gt1-2004",
    lastLoginAt: "2026-05-19T20:10:00.000Z"
  },
  {
    id: "jonas-vang",
    name: "Jonas Vang",
    email: "jonas@example.test",
    handle: "Vang",
    racingNumber: 14,
    level: "PRO",
    teamId: "nordic-apex",
    preferredCarId: "chrysler-viper-gts-r-2004",
    lastLoginAt: "2026-05-17T19:45:00.000Z"
  },
  {
    id: "emil-riis",
    name: "Emil Riis",
    email: "emil@example.test",
    handle: "Riis",
    racingNumber: 22,
    level: "AM",
    teamId: "jylland-racing",
    preferredCarId: "ferrari-550-maranello-gts-2004",
    lastLoginAt: "2026-04-12T18:05:00.000Z"
  },
  {
    id: "sara-lund",
    name: "Sara Lund",
    email: "sara@example.test",
    handle: "SaraGT",
    racingNumber: 44,
    level: "AM",
    teamId: "copenhagen-gt",
    preferredCarId: "porsche-911-gt3-rsr-2004",
    lastLoginAt: "2026-05-18T21:05:00.000Z"
  }
] as const;

export const leagueReferenceTime = "2026-05-20T12:00:00.000Z";

export const memberActivity = [
  {
    id: "mich",
    displayName: "Mich",
    createdAt: "2026-05-20T09:20:00.000Z",
    lastLoginAt: "2026-05-20T09:20:00.000Z"
  },
  {
    id: "lasse-jakobsen",
    displayName: "Lasse Jakobsen",
    createdAt: "2026-05-19T18:30:00.000Z",
    lastLoginAt: "2026-05-19T19:02:00.000Z"
  },
  {
    id: "gribben",
    displayName: "Gribben",
    createdAt: "2026-05-18T20:10:00.000Z",
    lastLoginAt: "2026-05-18T20:11:00.000Z"
  },
  {
    id: "bjoern",
    displayName: "Bjørn",
    createdAt: "2026-05-16T13:40:00.000Z",
    lastLoginAt: "2026-05-16T13:40:00.000Z"
  },
  {
    id: "saa",
    displayName: "saa",
    createdAt: "2026-05-15T21:15:00.000Z",
    lastLoginAt: "2026-05-15T21:16:00.000Z"
  },
  {
    id: "mads-holm",
    displayName: "Mads Holm",
    createdAt: "2026-03-10T11:00:00.000Z",
    lastLoginAt: "2026-05-19T20:10:00.000Z"
  },
  {
    id: "tomas-deha",
    displayName: "Tomas Deha",
    createdAt: "2026-01-11T17:00:00.000Z",
    lastLoginAt: "2026-03-18T19:15:00.000Z"
  },
  {
    id: "mccoy",
    displayName: "McCoy",
    createdAt: "2026-02-05T20:00:00.000Z",
    lastLoginAt: "2026-04-02T20:30:00.000Z"
  },
  {
    id: "sofus",
    displayName: "Sofus",
    createdAt: "2026-02-09T19:30:00.000Z",
    lastLoginAt: "2026-04-04T18:30:00.000Z"
  },
  {
    id: "paw-v-christensen",
    displayName: "Paw v Christensen",
    createdAt: "2026-02-12T18:30:00.000Z",
    lastLoginAt: "2026-04-05T19:30:00.000Z"
  },
  {
    id: "k-vedsoe",
    displayName: "K Vedsø",
    createdAt: "2026-02-13T21:10:00.000Z",
    lastLoginAt: "2026-04-06T20:40:00.000Z"
  },
  {
    id: "mathias-kastrup",
    displayName: "Mathias Kastrup",
    createdAt: "2026-02-15T21:20:00.000Z",
    lastLoginAt: "2026-04-10T21:15:00.000Z"
  },
  {
    id: "nized",
    displayName: "nized",
    createdAt: "2026-02-18T17:10:00.000Z",
    lastLoginAt: "2026-04-11T17:40:00.000Z"
  },
  {
    id: "poul",
    displayName: "poul",
    createdAt: "2026-03-01T18:15:00.000Z",
    lastLoginAt: "2026-04-12T18:10:00.000Z"
  },
  {
    id: "nikki",
    displayName: "Nikki",
    createdAt: "2026-03-06T19:45:00.000Z",
    lastLoginAt: "2026-04-15T19:45:00.000Z"
  },
  {
    id: "mammoth",
    displayName: "Mammoth",
    createdAt: "2026-03-10T20:20:00.000Z",
    lastLoginAt: "2026-04-16T20:15:00.000Z"
  }
] as const;

export const races = [
  {
    id: "spa-500",
    title: "Spa 500",
    slug: "spa-500",
    trackId: "spa-2004",
    startsAt: "2026-06-21T18:30:00.000Z",
    signupOpensAt: "2026-05-20T12:00:00.000Z",
    signupClosesAt: "2026-06-20T18:00:00.000Z",
    status: "SIGNUP_OPEN",
    classIds: ["gt", "ngt"],
    format: "90 min + formation lap",
    server: "DGTL Endurance 01"
  },
  {
    id: "monza-night",
    title: "Monza Night Sprint",
    slug: "monza-night-sprint",
    trackId: "monza-2004",
    startsAt: "2026-07-05T19:00:00.000Z",
    signupOpensAt: "2026-06-22T12:00:00.000Z",
    signupClosesAt: "2026-07-04T18:00:00.000Z",
    status: "DRAFT",
    classIds: ["gt", "ngt", "g2", "g3"],
    format: "2 x 35 min",
    server: "DGTL Sprint 02"
  },
  {
    id: "brno-classic",
    title: "Brno Classic",
    slug: "brno-classic",
    trackId: "brno-2004",
    startsAt: "2026-07-19T18:30:00.000Z",
    signupOpensAt: "2026-07-06T12:00:00.000Z",
    signupClosesAt: "2026-07-18T18:00:00.000Z",
    status: "DRAFT",
    classIds: ["ngt", "g3"],
    format: "75 min",
    server: "DGTL Endurance 01"
  }
] as const;

export const registrations = [
  {
    raceId: "spa-500",
    driverId: "mads-holm",
    classId: "gt",
    carId: "maserati-mc12-gt1-2004",
    status: "CONFIRMED"
  },
  {
    raceId: "spa-500",
    driverId: "jonas-vang",
    classId: "gt",
    carId: "chrysler-viper-gts-r-2004",
    status: "CONFIRMED"
  },
  {
    raceId: "spa-500",
    driverId: "emil-riis",
    classId: "gt",
    carId: "ferrari-550-maranello-gts-2004",
    status: "CONFIRMED"
  },
  {
    raceId: "spa-500",
    driverId: "sara-lund",
    classId: "ngt",
    carId: "porsche-911-gt3-rsr-2004",
    status: "CONFIRMED"
  }
] as const;

export const results: RaceResultInput[] = [
  {
    raceId: "spa-500",
    raceName: "Spa 500",
    classId: "gt",
    className: "GT",
    driverId: "mads-holm",
    driverName: "Mads Holm",
    teamId: "nordic-apex",
    teamName: "Nordic Apex",
    position: 1,
    status: "CLASSIFIED"
  },
  {
    raceId: "spa-500",
    raceName: "Spa 500",
    classId: "gt",
    className: "GT",
    driverId: "emil-riis",
    driverName: "Emil Riis",
    teamId: "jylland-racing",
    teamName: "Jylland Racing",
    position: 2,
    status: "CLASSIFIED"
  },
  {
    raceId: "spa-500",
    raceName: "Spa 500",
    classId: "gt",
    className: "GT",
    driverId: "jonas-vang",
    driverName: "Jonas Vang",
    teamId: "nordic-apex",
    teamName: "Nordic Apex",
    position: 3,
    status: "CLASSIFIED"
  },
  {
    raceId: "spa-500",
    raceName: "Spa 500",
    classId: "ngt",
    className: "nGT",
    driverId: "sara-lund",
    driverName: "Sara Lund",
    teamId: "copenhagen-gt",
    teamName: "Copenhagen GT",
    position: 1,
    status: "CLASSIFIED"
  }
];

export const downloads = [
  {
    id: "base-pack",
    title: "DGTL Base Pack",
    slug: "dgtl-base-pack",
    category: "SERVER_FILE",
    version: "0.9.0",
    description: "Fælles filer, server-INI og baseline struktur for sæsonstart.",
    fileName: "dgtl-base-pack-v0.9.zip",
    storageKey: "downloads/dgtl-base-pack-v0.9.zip",
    fileSize: 184_000_000,
    isPublished: true
  },
  {
    id: "approved-skins",
    title: "Godkendte skins - Spa 500",
    slug: "approved-skins-spa-500",
    category: "SKIN",
    version: "2026.06.18",
    description: "Kun admin-godkendte skins vises i pakken.",
    fileName: "dgtl-spa-skins.zip",
    storageKey: "downloads/dgtl-spa-skins.zip",
    fileSize: 92_000_000,
    isPublished: true
  }
] as const;

export const skinUploads = [
  {
    id: "skin-pending-jonas",
    driverId: "jonas-vang",
    carId: "chrysler-viper-gts-r-2004",
    classId: "gt",
    fileName: "vang-viper-14.zip",
    storageKey: "skins/pending/vang-viper-14.zip",
    fileSize: 24_000_000,
    status: "PENDING"
  },
  {
    id: "skin-approved-mads",
    driverId: "mads-holm",
    carId: "maserati-mc12-gt1-2004",
    classId: "gt",
    fileName: "mads-mc12-7.zip",
    storageKey: "skins/approved/mads-mc12-7.zip",
    fileSize: 27_000_000,
    status: "APPROVED"
  }
] as const;

export const newsPosts = [
  {
    id: "season-opens",
    title: "DGTL åbner med Spa 500",
    slug: "dgtl-aabner-med-spa-500",
    excerpt: "Sæsonen starter med et 90-minutters multiclass-løb på Spa-Francorchamps.",
    body: "Kalenderen er live, tilmeldingen er åben, og skin-pakken låses efter sidste godkendelse.",
    publishedAt: "2026-05-18T12:00:00.000Z"
  },
  {
    id: "skin-deadline",
    title: "Skin deadline før første afdeling",
    slug: "skin-deadline-foer-foerste-afdeling",
    excerpt: "Uploads skal være godkendt før de kommer i downloadsektionen.",
    body: "Kørere kan uploade egne skins fra profilen. Admin frigiver dem efter kontrol.",
    publishedAt: "2026-05-16T12:00:00.000Z"
  }
] as const;

export const driverStandings = calculateDriverStandings(results, pointScale.awards);
export const teamStandings = calculateTeamStandings(results, pointScale.awards);

export function classById(classId: string) {
  return racingClasses.find((racingClass) => racingClass.id === classId);
}

export function trackById(trackId: string) {
  return tracks.find((track) => track.id === trackId);
}

export function carById(carId: string) {
  return cars.find((car) => car.id === carId);
}

export function driverById(driverId: string) {
  return drivers.find((driver) => driver.id === driverId);
}
