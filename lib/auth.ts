import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export type SessionUser = {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
};

/**
 * Returns the current authenticated user from NextAuth session, or null if not authenticated.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);
  const user = session?.user as SessionUser | undefined;
  return user ?? null;
}
