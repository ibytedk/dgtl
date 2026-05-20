import { NextRequest, NextResponse } from "next/server";

import { getRequestUser, requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  defaultRuleDocuments,
  getDefaultRuleDocument,
  ruleDocumentSlugs,
  sanitizeRuleHtml
} from "@/lib/rules";
import { ruleDocumentSchema } from "@/lib/validators";

async function ensureDefaultRuleDocuments() {
  const existing = await prisma.ruleDocument.findMany({
    select: { slug: true },
    where: { slug: { in: [...ruleDocumentSlugs] } }
  });
  const existingSlugs = new Set(existing.map((document) => document.slug));
  const missingDocuments = defaultRuleDocuments.filter(
    (document) => !existingSlugs.has(document.slug)
  );

  if (!missingDocuments.length) {
    return;
  }

  await prisma.ruleDocument.createMany({
    data: missingDocuments.map((document) => ({
      ...document,
      bodyHtml: sanitizeRuleHtml(document.bodyHtml),
      publishedAt: new Date()
    })),
    skipDuplicates: true
  });
}

async function requireAdminRequest(request: NextRequest) {
  try {
    requireAdmin(await getRequestUser(request));
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    throw error;
  }

  return null;
}

export async function GET(request: NextRequest) {
  const authError = await requireAdminRequest(request);

  if (authError) {
    return authError;
  }

  await ensureDefaultRuleDocuments();

  const documents = await prisma.ruleDocument.findMany({
    where: { slug: { in: [...ruleDocumentSlugs] } }
  });

  return NextResponse.json({
    documents: documents.sort(
      (a, b) =>
        ruleDocumentSlugs.indexOf(a.slug as (typeof ruleDocumentSlugs)[number]) -
        ruleDocumentSlugs.indexOf(b.slug as (typeof ruleDocumentSlugs)[number])
    )
  });
}

export async function PUT(request: NextRequest) {
  const authError = await requireAdminRequest(request);

  if (authError) {
    return authError;
  }

  const payload = ruleDocumentSchema.parse(await request.json());
  const defaultDocument = getDefaultRuleDocument(payload.slug);

  if (!defaultDocument) {
    return NextResponse.json({ error: "Regeldokumentet findes ikke." }, { status: 404 });
  }

  const bodyHtml = sanitizeRuleHtml(payload.bodyHtml);

  if (!bodyHtml) {
    return NextResponse.json({ error: "Regelteksten er tom efter rensning." }, { status: 422 });
  }

  const document = await prisma.ruleDocument.upsert({
    where: { slug: payload.slug },
    update: {
      title: payload.title,
      scope: defaultDocument.scope,
      seriesSlug: defaultDocument.seriesSlug,
      bodyHtml,
      publishedAt: new Date()
    },
    create: {
      slug: payload.slug,
      title: payload.title,
      scope: defaultDocument.scope,
      seriesSlug: defaultDocument.seriesSlug,
      bodyHtml,
      publishedAt: new Date()
    }
  });

  return NextResponse.json({ document });
}
