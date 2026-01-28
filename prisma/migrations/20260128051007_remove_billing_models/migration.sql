/*
  Warnings:

  - You are about to drop the `App` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BillingCustomer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BillingSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StripeEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BillingCustomer" DROP CONSTRAINT "BillingCustomer_appId_fkey";

-- DropForeignKey
ALTER TABLE "BillingCustomer" DROP CONSTRAINT "BillingCustomer_userId_fkey";

-- DropForeignKey
ALTER TABLE "BillingSession" DROP CONSTRAINT "BillingSession_billingCustomerId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_billingCustomerId_fkey";

-- DropTable
DROP TABLE "App";

-- DropTable
DROP TABLE "BillingCustomer";

-- DropTable
DROP TABLE "BillingSession";

-- DropTable
DROP TABLE "StripeEvent";

-- DropTable
DROP TABLE "Subscription";

-- DropEnum
DROP TYPE "Plan";

-- DropEnum
DROP TYPE "SubscriptionStatus";
