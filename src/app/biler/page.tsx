import Image from "next/image";

import { CarArtwork } from "@/components/car-artwork";
import { ClassTag } from "@/components/class-tag";
import { SectionHeading } from "@/components/section-heading";
import { carCatalogSources, gtr2SupportVehicles } from "@/lib/gtr2-cars";
import { cars, classById, racingClasses } from "@/lib/sample-data";

export default function CarsPage() {
  return (
    <main>
      <section className="page-hero">
        <h1>GTR2 bilkatalog</h1>
        <p>
          Alle racebiler fra IGCD-listen er oprettet med GTR2-klasserne GT, nGT, G2 og G3.
          Billederne er originale AI-genererede DGTL-assets inspireret af IGCD-referencerne,
          så siden ikke afhænger af eksterne screenshots.
        </p>
      </section>

      <section className="section shell">
        <SectionHeading
          title="Klasser"
          intro={`${cars.length} racebiler fordelt efter den verificerede GTR2-dataoversigt.`}
        />
        <div className="car-class-overview">
          {racingClasses.map((racingClass) => (
            <article key={racingClass.id}>
              <ClassTag classId={racingClass.id} />
              <strong>{cars.filter((car) => car.classId === racingClass.id).length} biler</strong>
              <p>{racingClass.description}</p>
            </article>
          ))}
        </div>
      </section>

      {racingClasses.map((racingClass) => {
        const classCars = cars.filter((car) => car.classId === racingClass.id);

        return (
          <section key={racingClass.id} className="section shell car-class-block">
            <SectionHeading title={racingClass.name} intro={racingClass.description} />
            <div className="car-profile-grid">
              {classCars.map((car) => {
                const carClass = classById(car.classId);

                return (
                  <article key={car.id} className="car-profile-card">
                    {car.screenshotUrl ? (
                      <Image
                        className="car-profile-image"
                        src={car.screenshotUrl}
                        alt={`${car.name} - original AI-genereret DGTL-billede`}
                        width={1536}
                        height={864}
                      />
                    ) : (
                      <CarArtwork
                        name={car.name}
                        classLabel={carClass?.name}
                        year={car.year}
                        artwork={car.artwork}
                      />
                    )}
                    <div className="car-profile-body">
                      <div className="car-profile-kicker">
                        <ClassTag classId={car.classId} />
                        <span>{car.year}</span>
                      </div>
                      <h3>{car.name}</h3>
                      <p className="car-profile-subtitle">
                        {car.manufacturer} / {car.model}
                      </p>
                      <dl className="car-spec-grid">
                        <div>
                          <dt>Motor</dt>
                          <dd>{car.specs.engine}</dd>
                        </div>
                        <div>
                          <dt>Effekt</dt>
                          <dd>{car.specs.power}</dd>
                        </div>
                        <div>
                          <dt>Vægt</dt>
                          <dd>{car.specs.weight}</dd>
                        </div>
                        <div>
                          <dt>Team</dt>
                          <dd>{car.specs.team}</dd>
                        </div>
                      </dl>
                      <p>{car.history}</p>
                      <p className="car-character">Køreprofil: {car.specs.character}</p>
                      <div className="car-source-row">
                        {car.sources.map((source) => (
                          <a key={source.url} href={source.url}>
                            {source.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="section shell car-class-block">
        <SectionHeading
          title="Supportkøretøj"
          intro="IGCD-listen har også et køretøj uden GT/nGT/G2/G3-klasse. Det vises separat for ikke at give det en forkert racerklasse."
        />
        <div className="car-profile-grid support">
          {gtr2SupportVehicles.map((vehicle) => (
            <article key={vehicle.id} className="car-profile-card">
              {vehicle.screenshotUrl ? (
                <Image
                  className="car-profile-image"
                  src={vehicle.screenshotUrl}
                  alt={`${vehicle.name} - original AI-genereret DGTL-billede`}
                  width={1536}
                  height={864}
                />
              ) : (
                <CarArtwork name={vehicle.name} classLabel="Support" artwork={vehicle.artwork} />
              )}
              <div className="car-profile-body">
                <div className="car-profile-kicker">
                  <span>{vehicle.role}</span>
                </div>
                <h3>{vehicle.name}</h3>
                <p className="car-profile-subtitle">
                  {vehicle.manufacturer} / {vehicle.model}
                </p>
                <p>{vehicle.history}</p>
                <div className="car-source-row">
                  {vehicle.sources.map((source) => (
                    <a key={source.url} href={source.url}>
                      {source.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell">
        <SectionHeading title="Kildegrundlag" />
        <div className="source-strip">
          {carCatalogSources.map((source) => (
            <a key={source.url} href={source.url}>
              {source.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
