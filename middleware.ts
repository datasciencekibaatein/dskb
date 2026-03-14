// middleware.ts  (place this in your project root, next to package.json)
// ─────────────────────────────────────────────────────────────
//  Bypasses the localtunnel "click to continue" screen for API
//  routes so Cashfree webhooks can reach your localhost.
// ─────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Tell localtunnel to skip the browser confirmation page
  res.headers.set("bypass-tunnel-reminder", "true");

  return res;
}

export const config = {
  // Apply to API routes only — doesn't affect your UI pages
  matcher: "/api/:path*",
};