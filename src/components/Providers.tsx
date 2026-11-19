"use client";

import { ThemeProvider } from "next-themes";
import { MotionProvider } from "./motion";

// App-wide providers:
// - ThemeProvider (next-themes): adds class="dark" to <html>, follows the
//   system setting by default, remembers the user's choice, no flash on load.
// - MotionProvider: Framer Motion respects "reduce motion".
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MotionProvider>{children}</MotionProvider>
    </ThemeProvider>
  );
}
