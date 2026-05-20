import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { publicDownloadUrl } from "@/lib/storage";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const download = await prisma.download.findUnique({ where: { slug } });

  if (!download || !download.isPublished) {
    return NextResponse.json({ error: "Download ikke fundet." }, { status: 404 });
  }

  return NextResponse.redirect(publicDownloadUrl(download.storageKey));
}
