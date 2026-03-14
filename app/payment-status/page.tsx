"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Mail, ArrowRight } from "lucide-react";

type Status = "loading" | "success" | "failed" | "pending";

function PaymentStatusContent() {
  const params  = useSearchParams();
  const router  = useRouter();
  const orderId = params.get("order_id");
  const slug    = params.get("slug");

  const [status, setStatus]       = useState<Status>("loading");
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    if (!orderId) { setStatus("failed"); return; }

    const check = async () => {
      try {
        const res  = await fetch(`/api/order-status?order_id=${orderId}`);
        const data = await res.json();
        setOrderData(data);
        if (data.order_status === "PAID")                                          setStatus("success");
        else if (data.order_status === "EXPIRED" || data.order_status === "CANCELLED") setStatus("failed");
        else setStatus("pending");
      } catch {
        setStatus("failed");
      }
    };

    check();
  }, [orderId]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-10 max-w-md w-full text-center"
      >
        {status === "loading" && (
          <>
            <Loader2 size={48} className="mx-auto mb-4 animate-spin text-electric-400" />
            <h2 className="font-display font-bold text-xl mb-2" style={{ color: "var(--text-primary)" }}>Verifying Payment…</h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Please wait, this takes a few seconds.</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 size={56} className="mx-auto mb-4 text-emerald-400" />
            <h2 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--text-primary)" }}>🎉 Enrollment Confirmed!</h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Your payment was successful. Course details will be sent to your Gmail.
            </p>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6 text-sm text-left"
              style={{ background: "rgba(26,107,255,0.08)", border: "1px solid rgba(26,107,255,0.2)", color: "var(--text-muted)" }}>
              <Mail size={16} className="text-electric-400 shrink-0" />
              Check your Gmail inbox for your enrollment confirmation.
            </div>
            {slug && (
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => router.push(`/live/${slug}`)}
                className="btn-primary w-full !py-3 flex items-center justify-center gap-2">
                View Course <ArrowRight size={14} />
              </motion.button>
            )}
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle size={56} className="mx-auto mb-4 text-red-400" />
            <h2 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--text-primary)" }}>Payment Failed</h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Your payment could not be processed. No amount has been deducted.
            </p>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => router.back()}
              className="btn-primary w-full !py-3">
              Try Again
            </motion.button>
          </>
        )}

        {status === "pending" && (
          <>
            <Loader2 size={48} className="mx-auto mb-4 animate-spin text-ochre-400" />
            <h2 className="font-display font-bold text-xl mb-2" style={{ color: "var(--text-primary)" }}>Payment Pending</h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              We will send a confirmation to your Gmail once payment is complete.
            </p>
          </>
        )}
      </motion.div>
    </main>
  );
}

// ── Suspense wrapper — required by Next.js for useSearchParams ──
export default function PaymentStatusPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-electric-400" />
      </main>
    }>
      <PaymentStatusContent />
    </Suspense>
  );
}