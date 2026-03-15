// app/auth/callback/route.ts
//
// Supabase OAuth redirect handler.
// After Google/GitHub OAuth, Supabase redirects here with a `code` param.
// This route exchanges it for a session and sends the user home (or wherever).
//
// Docs: https://supabase.com/docs/guides/auth/server-side/nextjs

import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // `next` lets you redirect to a specific page after login (optional)
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Successful OAuth sign-in → redirect to app
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Something went wrong — redirect to home with an error flag
  return NextResponse.redirect(`${origin}/?auth_error=oauth_failed`);
}