import jwt from "jsonwebtoken";
import { env } from "@/env";

const BILLING_APP_URL = env.BILLING_APP_URL;
const JWT_SECRET = env.SAAS_JWT_SECRET;

/**
 * Generate a signed JWT for the billing portal
 * - iss (issuer): Your app ID registered in the billing system
 * - sub (subject): The user's ID in your system
 */
export function createBillingToken(userId: string, returnUrl: string): string {
  return jwt.sign(
    {
      iss: "saas-a", // Your registered app ID
      sub: userId, // User's ID in your SaaS
      returnUrl,
    },
    JWT_SECRET,
    { expiresIn: "5m" }, // Short-lived token for security
  );
}

/**
 * Get the URL to redirect users to the billing portal
 */
export function getBillingPortalUrl(userId: string, returnUrl: string): string {
  const token = createBillingToken(userId, returnUrl);
  return `${BILLING_APP_URL}/api/billing/portal?token=${token}`;
}
