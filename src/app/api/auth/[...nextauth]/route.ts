// // app/api/auth/[...nextauth]/route.ts

import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
// import { log } from "console";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile?.email },
        });
        if (existingUser) {
          console.log("user already exists");
        } else {
          await prisma.user.create({
            data: {
              name: profile?.name,
              email: profile?.email,
              picture: profile?.picture,
            },
          });

          // console.log(profile);

          // return newUser;
        }
        // console.log(profile);

        if (profile) {
          return true;
        } else {
          return false;
        }
      }

      return false;
    },
    async redirect({ url, baseUrl }) {
      // If the user is logging in from an internal URL, don't redirect to external URLs.
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return "/MainDashboard"; // Redirect to the main dashboard after login
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// src/app/api/auth/[...nextauth]/route.ts
