import { env } from "@/utils/env";
import { Stripe } from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});

export { stripe };
