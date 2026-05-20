import { NextRequest, NextResponse } from "next/server";

import { getRequestUser, requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ uploadId: string }> }
) {
  try {
    requireAdmin(await getRequestUser(request));
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    throw error;
  }

  const { uploadId } = await context.params;
  const upload = await prisma.skinUpload.update({
    where: { id: uploadId },
    data: { status: "APPROVED" }
  });

  return NextResponse.json({ upload });
}
