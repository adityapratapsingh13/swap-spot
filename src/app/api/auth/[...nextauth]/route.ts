// app/api/auth/[...nextauth]/route.ts

import prisma from "@/lib/prisma";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
              image: user.image,
            },
          });
          user.id = newUser.id;
        } else {
          user.id = existingUser.id;
        }

        return true;
      }
      return false;
    },

    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.userId) {
        session.user = {
          ...session.user,
          id: token.userId,
        };
      }
      return session;
    },

    // async redirect({ url, baseUrl }) {
    //   return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
    // },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
