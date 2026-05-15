import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import type Stripe from "stripe";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Webhook signature failed" }, { status: 400 });
  }

  async function updateSubscription(sub: Stripe.Subscription) {
    const userId = sub.metadata?.supabase_user_id ||
      (await supabaseAdmin
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_customer_id", sub.customer as string)
        .single()
      ).data?.user_id;

    if (!userId) return;

    await supabaseAdmin.from("subscriptions").upsert({
      user_id: userId,
      stripe_customer_id: sub.customer as string,
      stripe_subscription_id: sub.id,
      status: sub.status === "active" ? "active" : sub.status === "past_due" ? "past_due" : "canceled",
      current_period_end: new Date((sub as unknown as { current_period_end: number }).current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode === "subscription" && session.subscription) {
        const sub = await stripe.subscriptions.retrieve(session.subscription as string);
        const userId = session.metadata?.supabase_user_id;
        if (userId) {
          (sub as unknown as { metadata: Record<string, string> }).metadata = { supabase_user_id: userId };
        }
        await updateSubscription(sub);
      }
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await updateSubscription(event.data.object as Stripe.Subscription);
      break;
  }

  return NextResponse.json({ received: true });
}
