import bcrypt from "bcryptjs";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

type DgtlRole = "ADMIN" | "DRIVER";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: DgtlRole;
    } & DefaultSession["user"];
  }

  interface User {
    role: DgtlRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: DgtlRole;
  }
}

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

const googleProfileSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(1).optional(),
    email_verified: z.boolean().optional()
  })
  .passthrough();

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const googleProvider =
  googleClientId && googleClientSecret
    ? GoogleProvider({
        clientId: googleClientId,
        clientSecret: googleClientSecret
      })
    : null;

async function upsertGoogleUser(profile: z.infer<typeof googleProfileSchema>) {
  const existingUser = await prisma.user.findUnique({ where: { email: profile.email } });

  if (existingUser) {
    return prisma.user.update({
      where: { id: existingUser.id },
      data: { lastLoginAt: new Date() }
    });
  }

  return prisma.user.create({
    data: {
      email: profile.email,
      name: profile.name ?? profile.email,
      role: "DRIVER",
      lastLoginAt: new Date()
    }
  });
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialsProvider({
      name: "DGTL credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);

        if (!parsed.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email }
        });

        if (!user?.passwordHash) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(parsed.data.password, user.passwordHash);

        if (!passwordMatches) {
          return null;
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() }
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    }),
    ...(googleProvider ? [googleProvider] : [])
  ],
  callbacks: {
    signIn({ account, profile }) {
      if (account?.provider !== "google") {
        return true;
      }

      const parsed = googleProfileSchema.safeParse(profile);

      if (!parsed.success) {
        return false;
      }

      return parsed.data.email_verified !== false;
    },
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google") {
        const parsed = googleProfileSchema.safeParse(profile);

        if (parsed.success) {
          const dbUser = await upsertGoogleUser(parsed.data);
          token.id = dbUser.id;
          token.role = dbUser.role as DgtlRole;
          token.name = dbUser.name;
          token.email = dbUser.email;
        }

        return token;
      }

      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;

      return session;
    }
  }
};

export function getDgtlSession() {
  return getServerSession(authOptions);
}
