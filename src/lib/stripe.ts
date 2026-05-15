import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

export const MONTHLY_PRICE_AMOUNT = 1999; // $19.99 in cents
export const CURRENCY = "usd";
