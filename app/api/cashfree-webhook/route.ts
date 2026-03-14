// app/api/cashfree-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function verifySignature(rawBody: string, signature: string, timestamp: string) {
  const data     = timestamp + rawBody;
  const expected = crypto
    .createHmac("sha256", process.env.CASHFREE_SECRET_KEY!)
    .update(data)
    .digest("base64");
  return expected === signature;
}

export async function POST(req: NextRequest) {
  const rawBody  = await req.text();
  const signature = req.headers.get("x-webhook-signature") ?? "";
  const timestamp = req.headers.get("x-webhook-timestamp") ?? "";

  if (!verifySignature(rawBody, signature, timestamp)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.type === "PAYMENT_SUCCESS_WEBHOOK") {
    const orderId = event.data.order.order_id;
    const email   = event.data.customer_details.customer_email;

    // Mark enrollment as PAID in Supabase
    const { error } = await supabase
      .from("enrollments")
      .update({
        payment_status: "PAID",
        paid_at:        new Date().toISOString(),
      })
      .eq("order_id", orderId);

    if (error) console.error("Supabase update error:", error);
    else console.log(`✅ Marked PAID: ${orderId} — ${email}`);

    // TODO: send Gmail notification here
  }

  if (event.type === "PAYMENT_FAILED_WEBHOOK") {
    const orderId = event.data.order.order_id;
    await supabase
      .from("enrollments")
      .update({ payment_status: "FAILED" })
      .eq("order_id", orderId);
  }

  return NextResponse.json({ received: true });
}