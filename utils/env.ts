import { z } from "zod";

const envSchema = z.object({
  HYGRAPH_API_URL: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
