// lib/supabase.ts
// Single shared Supabase browser client — import this everywhere instead of
// calling createBrowserClient() in multiple places.

import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);