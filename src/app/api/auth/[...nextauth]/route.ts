// import prisma from "@/lib/prisma";
// import NextAuth, {
//   Account,
//   AuthOptions,
//   Session,
//   SessionStrategy,
//   User,
// } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import GoogleProvider from "next-auth/providers/google";

// export const AUTH_PROVIDERS: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt" as SessionStrategy,
//     maxAge: 10 * 24 * 60 * 60,
//   },
//   pages: {
//     signIn: "/auth/signin",
//   },
//   callbacks: {
//     async signIn({ user, account }: { user: User; account: Account }) {
//       if (account?.provider === "google" && user.email) {
//         const existingUser = await prisma.user.findUnique({
//           where: { email: user.email },
//         });

//         if (!existingUser) {
//           const newUser = await prisma.user.create({
//             data: {
//               name: user.name,
//               email: user.email,
//               image: user.image,
//             },
//           });
//           user.id = newUser.id;
//         } else {
//           user.id = existingUser.id;
//         }
//         return true;
//       }
//       return false;
//     },
//     async jwt({ token, user }: { token: JWT; user?: User }) {
//       if (user) {
//         token.userId = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       if (token?.userId) {
//         session.user = {
//           ...session.user,
//           id: token.userId as string,
//         };
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth();
// export { handler as GET, handler as POST };

import prisma from "@/lib/prisma";
import NextAuth, { Account, Session, SessionStrategy, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 10 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account }) {
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
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.userId) {
        session.user = {
          ...session.user,
          id: token.userId as string,
        };
      }
      return session;
    },
  },
};

// @ts-expect-error Type mismatch with AUTH_PROVIDERS
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
