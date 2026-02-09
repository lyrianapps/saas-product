import { z } from "zod";

const envSchema = z.object({
  // API Keys
  NEXT_API_KEY: z.string().min(1, "NEXT_API_KEY is required"),
  NEXT_PUBLIC_API_KEY: z.string().min(1, "NEXT_PUBLIC_API_KEY is required"),

  // NextAuth Configuration
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),

  // Email Configuration
  EMAIL_SERVER: z.string().url("EMAIL_SERVER must be a valid URL"),
  EMAIL_FROM: z.string().email("EMAIL_FROM must be a valid email"),

  // Database
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),

  // JWT Secret
  SAAS_JWT_SECRET: z.string().min(1, "SAAS_JWT_SECRET is required"),

  // Billing
  BILLING_APP_URL: z.string().url("BILLING_APP_URL must be a valid URL"),

  NEXT_PUBLIC_BILLING_REDIRECT_URL: z
    .string()
    .min(1, "NEXT_PUBLIC_BILLING_REDIRECT_URL is required"),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("❌ Invalid environment variables:");
    console.error(result.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  return result.data;
}

export const env = validateEnv();
