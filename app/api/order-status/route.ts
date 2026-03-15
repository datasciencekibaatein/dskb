// app/api/order-status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const CASHFREE_BASE_URL =
  process.env.CASHFREE_ENV === "production"
    ? "https://api.cashfree.com"
    : "https://sandbox.cashfree.com";

export async function GET(req: NextRequest) {
  try {
    const orderId = req.nextUrl.searchParams.get("order_id");

    if (!orderId) {
      return NextResponse.json({ error: "order_id is required" }, { status: 400 });
    }

    // 1. Check Cashfree for latest payment status
    const cashfreeRes = await fetch(`${CASHFREE_BASE_URL}/pg/orders/${orderId}`, {
      method: "GET",
      headers: {
        "x-client-id":     process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
        "x-api-version":   "2023-08-01",
      },
    });

    if (!cashfreeRes.ok) {
      const err = await cashfreeRes.json();
      console.error("Cashfree order fetch error:", err);
      return NextResponse.json({ error: "Failed to fetch order status" }, { status: 500 });
    }

    const cashfreeOrder = await cashfreeRes.json();
    const orderStatus = cashfreeOrder.order_status; // ACTIVE | PAID | EXPIRED | CANCELLED

    console.log(`📦 Order ${orderId} status from Cashfree: ${orderStatus}`);

    // 2. If paid, update Supabase (in case webhook was missed)
    if (orderStatus === "PAID") {
      const { error } = await supabase
        .from("enrollments")
        .update({
          payment_status: "PAID",
          paid_at:        new Date().toISOString(),
        })
        .eq("order_id", orderId)
        .eq("payment_status", "PENDING"); // only update if still pending

      if (error) console.error("Supabase update error:", error);
      else console.log(`✅ Updated enrollment to PAID for order: ${orderId}`);
    }

    return NextResponse.json({
      order_id:     orderId,
      order_status: orderStatus,
      order_amount: cashfreeOrder.order_amount,
      customer:     cashfreeOrder.customer_details,
    });

  } catch (err) {
    console.error("order-status error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}