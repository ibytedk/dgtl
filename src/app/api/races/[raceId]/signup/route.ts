import { NextRequest, NextResponse } from "next/server";

import { getRequestUser, requireDriver } from "@/lib/auth";
import { isClassAllowedForDriverLevel } from "@/lib/driver-class-rules";
import { prisma } from "@/lib/prisma";
import { raceSignupSchema } from "@/lib/validators";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ raceId: string }> }
) {
  const user = requireDriver(await getRequestUser(request));
  const { raceId } = await context.params;
  const payload = raceSignupSchema.parse(await request.json());
  const profile = await prisma.driverProfile.findUnique({ where: { id: payload.driverId } });

  if (!profile) {
    return NextResponse.json({ error: "Kørerprofil ikke fundet." }, { status: 404 });
  }

  if (user.role === "DRIVER" && user.id !== profile.id && user.id !== profile.userId) {
    return NextResponse.json({ error: "Du kan kun tilmelde din egen kørerprofil." }, { status: 403 });
  }

  const race = await prisma.race.findUnique({
    where: { id: raceId },
    include: {
      classes: true
    }
  });

  if (!race) {
    return NextResponse.json({ error: "Løb ikke fundet." }, { status: 404 });
  }

  if (race.status !== "SIGNUP_OPEN") {
    return NextResponse.json({ error: "Tilmeldingen er ikke åben." }, { status: 409 });
  }

  if (!race.classes.some((raceClass: { classId: string }) => raceClass.classId === payload.classId)) {
    return NextResponse.json({ error: "Klassen er ikke aktiv for dette løb." }, { status: 422 });
  }

  if (!isClassAllowedForDriverLevel(profile.level, payload.classId)) {
    return NextResponse.json(
      { error: "Den valgte klasse er ikke tilladt for din profiltype." },
      { status: 422 }
    );
  }

  const car = await prisma.car.findUnique({ where: { id: payload.carId } });

  if (!car || car.classId !== payload.classId) {
    return NextResponse.json({ error: "Bilen matcher ikke den valgte klasse." }, { status: 422 });
  }

  const registration = await prisma.raceRegistration.upsert({
    where: {
      raceId_driverId: {
        raceId,
        driverId: payload.driverId
      }
    },
    update: {
      classId: payload.classId,
      carId: payload.carId,
      notes: payload.notes,
      status: "CONFIRMED"
    },
    create: {
      raceId,
      driverId: payload.driverId,
      classId: payload.classId,
      carId: payload.carId,
      notes: payload.notes,
      status: "CONFIRMED"
    }
  });

  return NextResponse.json({ registration }, { status: 201 });
}
