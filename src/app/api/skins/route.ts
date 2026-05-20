import { NextRequest, NextResponse } from "next/server";

import { getRequestUser, requireDriver } from "@/lib/auth";
import { isClassAllowedForDriverLevel } from "@/lib/driver-class-rules";
import { prisma } from "@/lib/prisma";
import { buildStorageKey } from "@/lib/storage";
import { skinUploadSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const user = requireDriver(await getRequestUser(request));
  const payload = skinUploadSchema.parse(await request.json());
  const profile = await prisma.driverProfile.findUnique({ where: { id: payload.driverId } });

  if (!profile) {
    return NextResponse.json({ error: "Kørerprofil ikke fundet." }, { status: 404 });
  }

  if (user.role === "DRIVER" && user.id !== profile.id && user.id !== profile.userId) {
    return NextResponse.json({ error: "Du kan kun uploade skins til din egen profil." }, { status: 403 });
  }

  if (!isClassAllowedForDriverLevel(profile.level, payload.classId)) {
    return NextResponse.json(
      { error: "Den valgte klasse er ikke tilladt for din profiltype." },
      { status: 422 }
    );
  }

  const car = await prisma.car.findUnique({ where: { id: payload.carId } });

  if (!car || car.classId !== payload.classId) {
    return NextResponse.json({ error: "Skinets bil matcher ikke den valgte klasse." }, { status: 422 });
  }

  const upload = await prisma.skinUpload.create({
    data: {
      driverId: payload.driverId,
      carId: payload.carId,
      classId: payload.classId,
      fileName: payload.fileName,
      fileSize: payload.fileSize,
      checksum: payload.checksum,
      storageKey: buildStorageKey("skins/pending", payload.fileName),
      status: "PENDING"
    }
  });

  return NextResponse.json({ upload }, { status: 201 });
}
