// app/api/create-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const CASHFREE_BASE_URL =
  process.env.CASHFREE_ENV === "production"
    ? "https://api.cashfree.com"
    : "https://sandbox.cashfree.com";

export async function POST(req: NextRequest) {
  try {
    console.log("🔵 create-order hit");
    console.log("ENV CHECK:", {
      appId:       process.env.CASHFREE_APP_ID ? "✅" : "❌ missing",
      secret:      process.env.CASHFREE_SECRET_KEY ? "✅" : "❌ missing",
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅" : "❌ missing",
      serviceRole: process.env.SUPABASE_SERVICE_ROLE_KEY ? "✅" : "❌ missing",
      cashfreeUrl: CASHFREE_BASE_URL,
    });

    const body = await req.json();
    console.log("📦 Body:", body);

    const {
      courseId, courseName, courseSlug,
      amount, customerEmail, customerPhone, customerName,
      firstName, lastName, city, state, country, userId,
    } = body;

    if (!courseId || !amount || !customerEmail || !customerPhone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderId = `ORD_${courseId}_${Date.now()}`;

    console.log("🚀 Calling Cashfree:", `${CASHFREE_BASE_URL}/pg/orders`);
    const cashfreeRes = await fetch(`${CASHFREE_BASE_URL}/pg/orders`, {
      method: "POST",
      headers: {
        "Content-Type":    "application/json",
        "x-client-id":     process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
        "x-api-version":   "2023-08-01",
      },
      body: JSON.stringify({
        order_id: orderId, order_amount: amount, order_currency: "INR",
        order_note: `Enrollment: ${courseName}`,
        customer_details: {
          customer_id:    customerEmail.replace(/[@.]/g, "_"),
          customer_email: customerEmail,
          customer_phone: customerPhone,
          customer_name:  customerName,
        },
        order_meta: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status?order_id={order_id}&slug=${courseSlug}`,
          notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cashfree-webhook`,
        },
      }),
    });

    console.log("📬 Cashfree status:", cashfreeRes.status);

    if (!cashfreeRes.ok) {
      const err = await cashfreeRes.json();
      console.error("❌ Cashfree error:", JSON.stringify(err, null, 2));
      return NextResponse.json({ error: "Cashfree failed", detail: err }, { status: 500 });
    }

    const cashfreeData = await cashfreeRes.json();
    console.log("✅ Cashfree order:", cashfreeData.order_id);

    const { error: dbError } = await supabase.from("enrollments").insert({
      user_id: userId ?? null, first_name: firstName, last_name: lastName,
      email: customerEmail, mobile: customerPhone, city, state, country,
      course_id: courseId, course_name: courseName, course_slug: courseSlug,
      order_id: orderId, payment_session_id: cashfreeData.payment_session_id,
      amount, payment_status: "PENDING",
    });

    if (dbError) console.error("❌ Supabase error:", JSON.stringify(dbError, null, 2));
    else console.log("✅ Saved to Supabase");

    return NextResponse.json({
      order_id: cashfreeData.order_id,
      payment_session_id: cashfreeData.payment_session_id,
    });

  } catch (err) {
    console.error("💥 crash:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

console.log("SUPABASE KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 10));