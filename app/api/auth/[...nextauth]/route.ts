import NextAuth, { type Session, type Account } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../../lib/prisma";

// Extend the JWT and Session types to include custom fields
type ExtendedJWT = {
  accessToken?: string;
  refreshToken?: string;
  provider?: string;
  [key: string]: unknown;
};

type ExtendedSession = Session & {
  accessToken?: string;
  refreshToken?: string;
  provider?: string;
};

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
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
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: ExtendedJWT;
      user?: any;
      account?: Account | null;
    }): Promise<ExtendedJWT> {
      // Persist user data on first sign-in
      if (user) {
        token.sub = user.id;
      }
      // Persist the OAuth access_token and refresh_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: ExtendedJWT;
    }): Promise<ExtendedSession> {
      // Add user id and email to session
      if (session.user) {
        session.user.id = token.sub;
        session.user.email = token.email;
      }
      // Make tokens available in the session
      if (token.accessToken) session.accessToken = token.accessToken;
      if (token.refreshToken) session.refreshToken = token.refreshToken;
      if (token.provider) session.provider = token.provider;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
