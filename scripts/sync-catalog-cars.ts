import { PrismaClient } from "@prisma/client";

import { cars, racingClasses } from "../src/lib/sample-data";

const prisma = new PrismaClient();

async function main() {
  for (const [sortOrder, racingClass] of racingClasses.entries()) {
    await prisma.racingClass.upsert({
      where: { id: racingClass.id },
      update: {
        name: racingClass.name,
        slug: racingClass.slug,
        color: racingClass.color,
        description: racingClass.description,
        sortOrder
      },
      create: {
        id: racingClass.id,
        name: racingClass.name,
        slug: racingClass.slug,
        color: racingClass.color,
        description: racingClass.description,
        sortOrder
      }
    });
  }

  for (const car of cars) {
    await prisma.car.upsert({
      where: { id: car.id },
      update: {
        name: car.name,
        slug: car.slug,
        manufacturer: car.manufacturer,
        model: car.model,
        year: car.year,
        classId: car.classId,
        screenshotUrl: car.screenshotUrl,
        specs: car.specs
      },
      create: {
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

  console.log(
    `Synced ${racingClasses.length} racing classes and ${cars.length} cars from the DGTL catalog.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
