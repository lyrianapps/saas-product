-- CreateTable
CREATE TABLE "ExternalSubscriptionReference" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "externalUserId" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "stripeSubscriptionId" TEXT NOT NULL,
    "plan" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalSubscriptionReference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExternalSubscriptionReference_appId_externalUserId_key" ON "ExternalSubscriptionReference"("appId", "externalUserId");
