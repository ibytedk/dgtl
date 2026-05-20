import { NextRequest, NextResponse } from "next/server";

import { getRequestUser, requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { raceResultSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    requireAdmin(await getRequestUser(request));
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    throw error;
  }

  const payload = raceResultSchema.parse(await request.json());

  const race = await prisma.race.findUnique({
    where: { id: payload.raceId },
    include: { classes: true }
  });

  if (!race) {
    return NextResponse.json({ error: "Løb ikke fundet." }, { status: 404 });
  }

  if (!race.classes.some((raceClass: { classId: string }) => raceClass.classId === payload.classId)) {
    return NextResponse.json({ error: "Klassen er ikke aktiv for dette løb." }, { status: 422 });
  }

  const result = await prisma.raceResult.upsert({
    where: {
      raceId_driverId: {
        raceId: payload.raceId,
        driverId: payload.driverId
      }
    },
    update: payload,
    create: payload
  });

  return NextResponse.json({ result }, { status: 201 });
}
