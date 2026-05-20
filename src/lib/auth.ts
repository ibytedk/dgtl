import type { NextRequest } from "next/server";

import { getDgtlSession } from "@/auth";

export type RequestUser = {
  id: string;
  role: "ADMIN" | "DRIVER";
};

export async function getRequestUser(request: NextRequest): Promise<RequestUser | null> {
  const session = await getDgtlSession();

  if (session?.user?.id && session.user.role) {
    return { id: session.user.id, role: session.user.role };
  }

  const headerRole = request.headers.get("x-dgtl-role");
  const cookieRole = request.cookies.get("dgtl-role")?.value;
  const role = headerRole ?? cookieRole;
  const id =
    request.headers.get("x-dgtl-user-id") ??
    request.cookies.get("dgtl-user-id")?.value ??
    null;

  if (role === "ADMIN" || role === "DRIVER") {
    return { id: id ?? (role === "ADMIN" ? "admin" : "mads-holm"), role };
  }

  if (process.env.NODE_ENV !== "production") {
    return { id: "mads-holm", role: "DRIVER" };
  }

  return null;
}

export function requireAdmin(user: RequestUser | null) {
  if (!user || user.role !== "ADMIN") {
    throw new Response("Admin adgang kræves", { status: 403 });
  }
}

export function requireDriver(user: RequestUser | null) {
  if (!user) {
    throw new Response("Login kræves", { status: 401 });
  }

  return user;
}
