// import GoogleProvider from "next-auth/providers/google";

// export const AUTH_PROVIDERS = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt" as SessionStrategy,
//     maxAge: EXPIRE_DAYS * 24 * 60 * 60,
//   },

//   pages: {
//     signIn: "/auth/signin",
//   },

//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user: User | null }) {
//       if (user) {
//       }
//       return token;
//     },

//     async session({ session, token }: { session: Session; token: JWT }) {
//       if (token && token.sub) {
//         const user = await prisma.user.findUnique({
//           where: {
//             id: token.sub,
//           },
//         });

//         if (user) {
//           session.user.id = user.id;
//           session.user.paid = user.paid;
//           session.user.courses = user.courses;
//           return session;
//         }

//         const staticUser = await prisma.staticUser.findUnique({
//           where: {
//             id: token.sub,
//           },
//         });

//         if (staticUser) {
//           session.user.id = staticUser.id;
//           session.user.name = staticUser.name;
//           session.user.email = staticUser.email;
//           session.user.image = staticUser.image;
//           session.user.paid = staticUser.paid;
//           session.user.courses = staticUser.courses;
//           return session;
//         }

//         console.log("No user found. Logging out...");
//         return null;
//       }

//       return null;
//     },
//   },
// };
