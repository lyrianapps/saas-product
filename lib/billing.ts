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

/**
 * Subscription plan types
 */
export const Plan = {
  free_trial: "free_trial",
  basic: "basic",
  pro: "pro",
} as const;

export type Plan = (typeof Plan)[keyof typeof Plan];

/**
 * Subscription status types
 */
export const SubscriptionStatus = {
  active: "active",
  trialing: "trialing",
  past_due: "past_due",
  canceled: "canceled",
  incomplete: "incomplete",
} as const;

export type SubscriptionStatus =
  (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];

export type SubscriptionStatusResponse = {
  plan: Plan | null;
  status: SubscriptionStatus | null;
};

/**
 * Get subscription status for a user from the billing service
 *
 * GET billing_app_url/api/subscription/status?appId=xxx&externalUserId=xxx
 * Header: x-api-key: <your-api-key>
 */
export async function getSubscriptionStatus({
  externalUserId,
}: {
  externalUserId: string;
}): Promise<SubscriptionStatusResponse> {
  const url = new URL(`${BILLING_APP_URL}/api/subscription/status`);
  url.searchParams.set("appId", env.NEXT_PUBLIC_APP_ID);
  url.searchParams.set("externalUserId", externalUserId);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "x-api-key": env.NEXT_PUBLIC_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch subscription status: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<SubscriptionStatusResponse>;
}
