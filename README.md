# DGTL - Danish Grand Touring League

Next.js/TypeScript platform for a SIMBIN GTR2 league with race calendar, signup, tracks, cars, class-based standings, teams, skins, downloads and news.

## License

This project is licensed under the **[GNU Affero General Public License v3.0 (AGPL-3.0)](LICENSE.md)**.

Read **[LICENSE.md](LICENSE.md)** for the full legal text and a plain-language summary of obligations.

### Requirements at a glance

| Audience | Requirement |
|----------|-------------|
| **Users** | You may use and study the software. Modified network-facing deployments must offer corresponding source to interacting users (AGPL Section 13). |
| **Redistributors** | Distribute under AGPL-3.0 with complete source, license, and copyright notices. |
| **Contributors** | Pull requests and other contributions are accepted under AGPL-3.0; only submit work you may license. |
| **Self-hosters** | Hosting a fork is allowed, but modified public instances must comply with AGPL source-offer rules. Do not present unofficial hosts as the official DGTL site. |

**SPDX:** `AGPL-3.0-only` · **Copyright:** DGTL contributors

## Local Setup

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Development seed users use the password `dgtl-dev-password`. The API auth boundary accepts `x-dgtl-role` and `x-dgtl-user-id` headers in development, while production must be wired to real session handling before public launch.

## Verification

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:ui
```

Expected result: TypeScript passes, ESLint reports no blocking issues, Vitest confirms standings logic, production build succeeds, and Playwright can open the homepage/calendar/download flows on desktop and mobile.

## Database

DGTL uses MySQL through Prisma. Local Docker uses `mysql:8.4`; production/test should set `DATABASE_URL` to the real MySQL database.

## VPS Deployment

```bash
docker compose up --build -d
docker compose exec app npx prisma migrate deploy
docker compose exec app npm run prisma:seed
```

Production checklist:

- Replace `NEXTAUTH_SECRET`, database password and MinIO credentials.
- Put the app behind a TLS reverse proxy.
- Configure a real S3-compatible bucket policy for approved downloads.
- Replace development header auth with a real Auth.js/session provider.
- Add real GTR2 result-file samples before implementing automatic import.

## Current Scope

- Standings are class-only in v1.
- Team points use the two best-scoring drivers per race and class.
- Skin uploads are pending by default and only visible after admin approval.
- Result entry is manual; GTR2 server-file parsing is intentionally isolated for a later importer.
