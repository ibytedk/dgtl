import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  cars,
  downloads,
  drivers,
  newsPosts,
  pointScale,
  races,
  racingClasses,
  registrations,
  results,
  skinUploads,
  teams,
  tracks
} from "../src/lib/sample-data";
import { defaultRuleDocuments, sanitizeRuleHtml } from "../src/lib/rules";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("dgtl-dev-password", 10);

  await prisma.newsPost.deleteMany();
  await prisma.ruleDocument.deleteMany();
  await prisma.download.deleteMany();
  await prisma.skinUpload.deleteMany();
  await prisma.raceResult.deleteMany();
  await prisma.raceRegistration.deleteMany();
  await prisma.raceClass.deleteMany();
  await prisma.race.deleteMany();
  await prisma.pointAward.deleteMany();
  await prisma.pointScale.deleteMany();
  await prisma.driverProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.car.deleteMany();
  await prisma.racingClass.deleteMany();
  await prisma.team.deleteMany();
  await prisma.track.deleteMany();

  await prisma.user.create({
    data: {
      id: "admin",
      email: "admin@dgtl.dk",
      name: "DGTL Admin",
      role: "ADMIN",
      passwordHash
    }
  });

  for (const team of teams) {
    await prisma.team.create({ data: team });
  }

  for (const racingClass of racingClasses) {
    await prisma.racingClass.create({
      data: {
        id: racingClass.id,
        name: racingClass.name,
        slug: racingClass.slug,
        color: racingClass.color,
        description: racingClass.description
      }
    });
  }

  for (const track of tracks) {
    await prisma.track.create({
      data: {
        id: track.id,
        name: track.name,
        slug: track.slug,
        country: track.country,
        lengthKm: track.lengthKm,
        screenshotUrl: track.screenshotUrl,
        data: track.data
      }
    });
  }

  for (const car of cars) {
    await prisma.car.create({
      data: {
        id: car.id,
        name: car.name,
        slug: car.slug,
        manufacturer: car.manufacturer,
        model: car.model,
        year: car.year,
        classId: car.classId,
        screenshotUrl: car.screenshotUrl,
        specs: car.specs
      }
    });
  }

  await prisma.pointScale.create({
    data: {
      id: pointScale.id,
      name: pointScale.name,
      slug: pointScale.slug,
      isDefault: true,
      awards: {
        create: pointScale.awards
      }
    }
  });

  for (const driver of drivers) {
    await prisma.user.create({
      data: {
        id: `user-${driver.id}`,
        email: driver.email,
        name: driver.name,
        role: "DRIVER",
        passwordHash,
        profile: {
          create: {
            id: driver.id,
            handle: driver.handle,
            racingNumber: driver.racingNumber,
            level: driver.level,
            teamId: driver.teamId,
            preferredCarId: driver.preferredCarId
          }
        }
      }
    });
  }

  for (const race of races) {
    await prisma.race.create({
      data: {
        id: race.id,
        title: race.title,
        slug: race.slug,
        trackId: race.trackId,
        startsAt: race.startsAt,
        signupOpensAt: race.signupOpensAt,
        signupClosesAt: race.signupClosesAt,
        status: race.status,
        pointScaleId: pointScale.id,
        classes: {
          create: race.classIds.map((classId) => ({ classId }))
        }
      }
    });
  }

  for (const registration of registrations) {
    await prisma.raceRegistration.create({ data: registration });
  }

  for (const result of results) {
    const driver = drivers.find((item) => item.id === result.driverId);
    if (!driver) {
      throw new Error(`Missing seed driver for ${result.driverId}`);
    }

    await prisma.raceResult.create({
      data: {
        raceId: result.raceId,
        driverId: result.driverId,
        classId: result.classId,
        carId: driver.preferredCarId,
        position: result.position,
        status: result.status
      }
    });
  }

  for (const upload of skinUploads) {
    await prisma.skinUpload.create({ data: upload });
  }

  for (const download of downloads) {
    await prisma.download.create({ data: download });
  }

  for (const post of newsPosts) {
    await prisma.newsPost.create({
      data: {
        ...post,
        publishedAt: post.publishedAt
      }
    });
  }

  for (const document of defaultRuleDocuments) {
    await prisma.ruleDocument.create({
      data: {
        ...document,
        bodyHtml: sanitizeRuleHtml(document.bodyHtml),
        publishedAt: new Date()
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
