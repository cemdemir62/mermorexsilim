import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials) {
        const emailInput = (credentials?.email as string) || "Bilinmeyen";
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: emailInput },
        });

        if (!user) {
          try {
            await prisma.activityLog.create({
              data: {
                action: "Başarısız Giriş Denemesi",
                user: emailInput,
                details: "Kullanıcı bulunamadı veya e-posta yanlış",
              },
            });
          } catch (e) {}
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          try {
            await prisma.activityLog.create({
              data: {
                action: "Başarısız Giriş Denemesi",
                user: emailInput,
                details: "Hatalı şifre girişi yapıldı",
              },
            });
          } catch (e) {}
          return null;
        }

        try {
          await prisma.activityLog.create({
            data: {
              action: "Başarılı Yönetici Girişi",
              user: user.email || emailInput,
              details: "Yönetici paneline başarıyla giriş yapıldı",
            },
          });
        } catch (e) {}

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
