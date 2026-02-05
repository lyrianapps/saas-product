import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Returns the current authenticated user from NextAuth session, or null if not authenticated.
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  // You may want to return the whole session, or just the user object
  return session?.user ?? null;
}
