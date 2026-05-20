import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { getRequestUser, requireDriver } from "@/lib/auth";
import { isClassAllowedForDriverLevel } from "@/lib/driver-class-rules";
import { classifyDriverIntent } from "@/lib/driver-level";
import { prisma } from "@/lib/prisma";
import { driverProfileSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const user = requireDriver(await getRequestUser(request));
  const payload = driverProfileSchema.parse(await request.json());
  const level = classifyDriverIntent(payload.intent);

  const car = await prisma.car.findUnique({ where: { id: payload.carId } });

  if (!car) {
    return NextResponse.json({ error: "Bil ikke fundet." }, { status: 404 });
  }

  if (!isClassAllowedForDriverLevel(level, car.classId)) {
    return NextResponse.json(
      { error: "Bilvalget er ikke tilladt for den valgte profiltype." },
      { status: 422 }
    );
  }

  const profile = await prisma.driverProfile.findFirst({
    where: {
      OR: [{ id: user.id }, { userId: user.id }]
    }
  });
  const targetUserId = profile?.userId ?? user.id;
  const dbUser = await prisma.user.findUnique({ where: { id: targetUserId } });

  if (!dbUser) {
    return NextResponse.json({ error: "Bruger ikke fundet." }, { status: 404 });
  }

  try {
    const [updatedUser, updatedProfile] = await prisma.$transaction([
      prisma.user.update({
        where: { id: targetUserId },
        data: { name: payload.name }
      }),
      profile
        ? prisma.driverProfile.update({
            where: { id: profile.id },
            data: {
              handle: payload.handle,
              racingNumber: payload.racingNumber,
              level,
              preferredCarId: payload.carId
            }
          })
        : prisma.driverProfile.create({
            data: {
              userId: targetUserId,
              handle: payload.handle,
              racingNumber: payload.racingNumber,
              level,
              preferredCarId: payload.carId
            }
          })
    ]);

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        name: updatedUser.name
      },
      profile: {
        id: updatedProfile.id,
        handle: updatedProfile.handle,
        racingNumber: updatedProfile.racingNumber,
        level: updatedProfile.level,
        preferredCarId: updatedProfile.preferredCarId
      }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "Kaldenavn eller startnummer er allerede i brug." },
        { status: 409 }
      );
    }

    throw error;
  }
}
