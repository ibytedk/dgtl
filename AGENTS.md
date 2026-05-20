# DGTL.dk Agent Guide

Dette projekt er en relationel liga-platform for DGTL - Danish Grand Touring League.
Arbejd altid ud fra domænemodellen først, derefter UI.

## Grundregel

Alt vigtigt i projektet er relationelt:

- Biler hører til klasser.
- Klasser bruges i løbsserier og i de enkelte løb.
- Løb har kun de klasser, der er valgt på kalenderen.
- Kørere har brugerprofil, profiltype, bilvalg, team, tilmeldinger, skins og resultater.
- Kørere er i biler, biler er i klasser, og profiltypen styrer hvilke klasser en kører må vælge bil fra.
- Kørere får point gennem løbsresultater.
- Teams får point gennem deres køreres resultater.
- Downloads og skins må ikke vises som løse filer uden status, ejer og klasse/bilrelation.

Lav derfor aldrig en UI-liste, dropdown, tabel eller admin-handling som en isoleret lokal liste, hvis den repræsenterer en relation i domænet.

## Primære Datakilder

- `prisma/schema.prisma` er autoritet for den relationelle database.
- `src/lib/sample-data.ts` er demo- og seed-kilde, indtil en side er fuldt DB-drevet.
- `src/lib/gtr2-cars.ts` er GTR2-bilkataloget, som `/biler` bruger.
- `src/lib/gtr2-tracks.ts` er GTR2-banekataloget, som `/baner` bruger.
- `src/lib/rules.ts` er den synlige regelside.
- `src/lib/driver-class-rules.ts` skal matche Pro/Am-reglerne fra `src/lib/rules.ts`.
- `src/lib/profile-car-choices.ts` skal bruge samme bilkatalog som `/biler`.
- `src/lib/standings.ts` er autoritet for pointberegning.

Hvis en ny funktion har brug for en liste over biler, klasser, baner, pointskalaer, løb eller kørere, skal den genbruge disse kilder eller database-relationerne. Du må ikke lave en parallel hardcodet liste.

## Pro/Am Og Bilvalg

Reglen fra `/regler` er:

- Pro, dvs. "Kører for at vinde", må vælge biler fra `GT` og `nGT`.
- Am, dvs. "Kører for sjov", må vælge biler fra `nGT`, `G2` og `G3`.
- `nGT` er åben for begge profiler.

Denne regel skal håndhæves både i UI og på serveren:

- Profiloprettelse og profilredigering.
- Løbstilmelding.
- Skin-upload.
- Fremtidige admin- og importflows, hvor bil/klasse vælges.

## Database Og Relationer

Når du ændrer datamodellen:

- Opdater `prisma/schema.prisma`.
- Tilføj en migration i `prisma/migrations`.
- Opdater `prisma/seed.ts`, hvis feltet eller relationen påvirker seed data.
- Kør `npm run prisma:generate`.
- Hvis databasen skal ændres lokalt eller testmiljøet er aktivt, kør `npx prisma migrate deploy` eller den relevante migrate-kommando.

Når du skriver API-kode:

- Valider input med `src/lib/validators.ts`.
- Hent de relevante relationer, før du skriver til databasen.
- Tjek at `car.classId === payload.classId`, hvor bil og klasse vælges sammen.
- Tjek at den valgte klasse er tilladt for kørerens profiltype.
- Tjek at køreren kun kan ændre/uploade/tilmelde sin egen profil, medmindre brugeren er admin.
- Brug transaktioner, når en handling ændrer flere relaterede tabeller.

## Auth Og Profiler

- Google SSO må gerne bruge Google-navnet som startværdi.
- Google-login må ikke overskrive et navn, som brugeren senere selv har rettet.
- Nye Google-brugere oprettes som `DRIVER`, ikke `ADMIN`.
- Adminrettigheder må kun komme fra eksisterende brugerrolle i databasen.
- En `User` uden `DriverProfile` er kun halvt onboardet og skal ledes gennem profiloprettelse.

## Standings Og Point

- Stillinger i v1 er klassevise.
- Driverpoint beregnes fra resultater og pointskala.
- Teampoint beregnes pr. løb/klasse ud fra teamets to bedst scorende kørere.
- Der må ikke vises eller gemmes manuelt beregnede standings uden at de kan spores tilbage til resultater, pointskala og klasse.

## UI- Og Stilregler

- UI-sprog er dansk.
- Forsiden skal bevare tidlig-2000er GT-magasin/FIA GT/GTR2-nostalgi uden at kopiere rigtige logoer eller sponsor-grafik.
- Brug ikke gamle DGTL-webbokse som grafisk stil, medmindre brugeren eksplicit beder om en retro-komponent.
- `font-family: Impact` må kun bruges sammen med `font-style: italic` og `font-weight: 100`.
- Brug relationelle labels i UI: vis klasse, bil, team og status hvor det hjælper brugeren med at forstå sammenhængen.
- Hvis tekst eller UI flyder ud på mobil, er opgaven ikke færdig.

## Motorsportindhold

- Motorsportstekster skal være faktuelle, nøgterne og skrevet på professionelt dansk.
- Undgå AI-agtige vendinger, marketing-sprog og oversatte engelske fraser.
- Brug kilder, når der skrives bane-, bil- eller løbshistorie.
- Skriv "Ikke bekræftet endnu", hvis en faktaoplysning ikke er verificeret.

## Testkrav

Kør relevante checks før du afleverer:

- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`
- `npm run test:ui` ved UI-, routing- eller browseradfærdsændringer.

Tilføj tests, når du indfører relationelle regler, fx:

- Bilvalg filtreres fra samme katalog som `/biler`.
- Pro/Am-regler matcher `/regler`.
- API afviser ugyldig bil/klasse/profiltype-kombination.
- Standings ændrer sig korrekt ved nye resultater.

## Arbejdsform For Agenter

- Læs eksisterende kode først.
- Brug `rg` til søgning.
- Dokumenter usikkerheder som "Ikke bekræftet endnu".
- Lav små, målrettede ændringer.
- Undgå refactors, renaming og dependency bumps, medmindre de er nødvendige for opgaven.
- Brug `apply_patch` til manuelle filændringer.
- Revert aldrig brugerens ændringer uden eksplicit tilladelse.
- Skriv aldrig hemmeligheder, credentials eller lokale passwords i committed filer.
