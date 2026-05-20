import { z } from "zod";

export const profileLevelSchema = z.object({
  intent: z.enum(["FUN", "WIN"])
});

export const driverProfileSchema = z.object({
  name: z.string().trim().min(2).max(120),
  handle: z.string().trim().min(2).max(40),
  racingNumber: z.number().int().min(1).max(999),
  intent: z.enum(["FUN", "WIN"]),
  carId: z.string().min(1)
});

export const raceSignupSchema = z.object({
  driverId: z.string().min(1),
  classId: z.string().min(1),
  carId: z.string().min(1),
  notes: z.string().max(500).optional()
});

export const skinUploadSchema = z.object({
  driverId: z.string().min(1),
  carId: z.string().min(1),
  classId: z.string().min(1),
  fileName: z.string().min(1).max(180),
  fileSize: z.number().int().positive().max(300_000_000),
  checksum: z.string().max(128).optional()
});

export const raceResultSchema = z.object({
  raceId: z.string().min(1),
  driverId: z.string().min(1),
  classId: z.string().min(1),
  carId: z.string().min(1),
  position: z.number().int().positive().nullable().optional(),
  status: z.enum(["CLASSIFIED", "DNF", "DNS", "DSQ"]).default("CLASSIFIED"),
  lapsCompleted: z.number().int().min(0).default(0),
  totalTimeMs: z.number().int().positive().nullable().optional(),
  penaltySeconds: z.number().int().min(0).default(0),
  pointsOverride: z.number().int().min(0).nullable().optional()
});

export const ruleDocumentSchema = z.object({
  slug: z.enum(["generelle-regler", "dgtl-endurance"]),
  title: z.string().trim().min(3).max(120),
  bodyHtml: z.string().trim().min(20).max(120_000)
});
