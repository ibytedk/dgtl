import { NextRequest, NextResponse } from "next/server";

import { getRequestUser, requireDriver } from "@/lib/auth";
import { isClassAllowedForDriverLevel } from "@/lib/driver-class-rules";
import { classifyDriverIntent } from "@/lib/driver-level";
import { prisma } from "@/lib/prisma";
import { profileLevelSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const user = requireDriver(await getRequestUser(request));
  const payload = profileLevelSchema.parse(await request.json());
  const level = classifyDriverIntent(payload.intent);

  const profile = await prisma.driverProfile.findFirst({
    where: {
      OR: [{ id: user.id }, { userId: user.id }]
    },
    include: { preferredCar: true }
  });

  if (!profile) {
    return NextResponse.json({ error: "Kørerprofil ikke fundet." }, { status: 404 });
  }

  const updatedProfile = await prisma.driverProfile.update({
    where: { id: profile.id },
    data: {
      level,
      preferredCarId:
        profile.preferredCar && !isClassAllowedForDriverLevel(level, profile.preferredCar.classId)
          ? null
          : profile.preferredCarId
    }
  });

  return NextResponse.json({
    profile: {
      id: updatedProfile.id,
      level: updatedProfile.level
    }
  });
}
