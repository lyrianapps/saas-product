import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../../lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;
          if (!email || !password) {
            console.log("Missing email or password");
            return null;
          }
          // Find user by email
          let user = await prisma.user.findUnique({ where: { email } });
          if (!user) {
            console.log(`No user found for email ${email}, creating new user.`);
            // Create new user (sign up)
            // TODO: Hash password before saving in production
            user = await prisma.user.create({
              data: {
                email,
                password,
              },
            });
            return user;
          }
          // TODO: Replace with hashed password check in production
          if (user.password !== password) {
            console.log(`Invalid password for user ${email}`);
            return null;
          }
          console.log(`User ${email} authenticated successfully.`);
          return user;
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
