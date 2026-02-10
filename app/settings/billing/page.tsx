import { redirect } from "next/navigation";
import { getBillingPortalUrl } from "@/lib/billing";
import { getCurrentUser } from "@/lib/auth";
import { env } from "@/env";

export default async function BillingPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const returnUrl = env.NEXT_PUBLIC_BILLING_REDIRECT_URL;
  const billingUrl = getBillingPortalUrl(user.id, returnUrl);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Subscription</h1>
      <p className="mb-4">Manage your subscription and billing details.</p>

      <a
        href={billingUrl}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Manage Subscription →
      </a>
    </div>
  );
}
