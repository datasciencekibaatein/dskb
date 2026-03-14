"use client";

/**
 * AuthContext — Global authentication state management (Supabase)
 *
 * Architecture:
 * - Uses React Context + useReducer for predictable state updates
 * - Session is managed entirely by Supabase (no manual localStorage needed)
 * - onAuthStateChange listener keeps state in sync automatically
 * - Provides openAuthModal(tab) so any component can trigger the auth popup
 * - AuthProvider wraps the entire app in layout.tsx
 *
 * Setup:
 *   1. npm install @supabase/supabase-js @supabase/ssr
 *   2. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local
 *   3. (Optional) Enable Google / GitHub OAuth providers in Supabase Dashboard → Auth → Providers
 */

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient, Session } from "@supabase/supabase-js";
import type {
  AuthContextValue,
  AuthTab,
  User,
  SignInFormData,
  SignUpFormData,
  AuthResult,
} from "@/types";

// ─── Supabase browser client (singleton) ─────────────────────────────────────
// This is safe to call at module level — createBrowserClient is idempotent.
const supabase: SupabaseClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── Helper: map Supabase session → your app User shape ──────────────────────
function sessionToUser(session: Session): User {
  const { user: su } = session;
  return {
    id: su.id,
    name:
      su.user_metadata?.full_name ??
      su.user_metadata?.name ??
      su.email?.split("@")[0] ??
      "User",
    email: su.email ?? "",
    joinedAt: su.created_at,
    enrolledCourses: su.user_metadata?.enrolledCourses ?? [],
    role: su.user_metadata?.role ?? "student",
  };
}

// ─── State shape ─────────────────────────────────────────────────────────────
interface AuthState {
  user: User | null;
  isLoading: boolean;
  authModalOpen: boolean;
  authModalTab: AuthTab;
}

const initialState: AuthState = {
  user: null,
  isLoading: true, // true until onAuthStateChange fires on mount
  authModalOpen: false,
  authModalTab: "signin",
};

// ─── Actions ─────────────────────────────────────────────────────────────────
type AuthAction =
  | { type: "SESSION_LOADED"; user: User | null }
  | { type: "SIGN_IN_SUCCESS"; user: User }
  | { type: "SIGN_OUT" }
  | { type: "OPEN_MODAL"; tab: AuthTab }
  | { type: "CLOSE_MODAL" }
  | { type: "SET_LOADING"; loading: boolean };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SESSION_LOADED":
      return { ...state, user: action.user, isLoading: false };
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        user: action.user,
        isLoading: false,
        authModalOpen: false,
      };
    case "SIGN_OUT":
      return { ...state, user: null, isLoading: false };
    case "OPEN_MODAL":
      return { ...state, authModalOpen: true, authModalTab: action.tab };
    case "CLOSE_MODAL":
      return { ...state, authModalOpen: false };
    case "SET_LOADING":
      return { ...state, isLoading: action.loading };
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ── Subscribe to Supabase auth state changes ─────────────────────────────
  // This fires immediately with the current session (INITIAL_SESSION event),
  // so we no longer need to manually read from localStorage.
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // setTimeout(0) pushes the dispatch fully outside React's render cycle.
      // startTransition alone is insufficient — Supabase fires this listener
      // synchronously during sign-out, which React 18 + Next.js App Router
      // treats as an illegal mid-render state update (finishRenderingHooks crash).
      setTimeout(() => {
        if (session) {
          dispatch({ type: "SESSION_LOADED", user: sessionToUser(session) });
        } else {
          dispatch({ type: "SESSION_LOADED", user: null });
        }
      }, 0);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── Modal control ────────────────────────────────────────────────────────
  const openAuthModal = useCallback((tab: AuthTab = "signin") => {
    dispatch({ type: "OPEN_MODAL", tab });
  }, []);

  const closeAuthModal = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, []);

  // ── Sign In (email + password) ───────────────────────────────────────────
  const signIn = useCallback(
    async (data: SignInFormData): Promise<AuthResult> => {
      dispatch({ type: "SET_LOADING", loading: true });

      const { data: authData, error } =
        await supabase.auth.signInWithPassword({
          email: data.email.trim().toLowerCase(),
          password: data.password,
        });

      dispatch({ type: "SET_LOADING", loading: false });

      if (error || !authData.session) {
        return {
          success: false,
          error: error?.message ?? "Sign in failed. Please try again.",
        };
      }

      const user = sessionToUser(authData.session);
      dispatch({ type: "SIGN_IN_SUCCESS", user });
      return { success: true, user };
    },
    []
  );

  // ── Sign Up (email + password) ───────────────────────────────────────────
  const signUp = useCallback(
    async (data: SignUpFormData): Promise<AuthResult> => {
      dispatch({ type: "SET_LOADING", loading: true });

      // Client-side guard (mirrors what AuthModal already validates)
      if (data.password !== data.confirmPassword) {
        dispatch({ type: "SET_LOADING", loading: false });
        return { success: false, error: "Passwords do not match." };
      }

      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email.trim().toLowerCase(),
        password: data.password,
        options: {
          data: {
            full_name: data.name.trim(),
            role: "student",
            enrolledCourses: [],
          },
        },
      });

      dispatch({ type: "SET_LOADING", loading: false });

      if (error) {
        return { success: false, error: error.message };
      }

      // If email confirmation is enabled in Supabase, session will be null.
      // Inform the user to check their inbox.
      if (!authData.session) {
        return {
          success: true,
          // No user yet — modal will show success state and prompt email check.
          user: undefined,
          message:
            "Account created! Please check your email to confirm your address before signing in.",
        };
      }

      const user = sessionToUser(authData.session);
      dispatch({ type: "SIGN_IN_SUCCESS", user });
      return { success: true, user };
    },
    []
  );

  // ── Sign In with OAuth (Google / GitHub) ─────────────────────────────────
  const signInWithOAuth = useCallback(
    async (provider: "google" | "github"): Promise<AuthResult> => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }
      // Browser will redirect; nothing more to do here.
      return { success: true };
    },
    []
  );

  // ── Sign Out ─────────────────────────────────────────────────────────────
  // Do NOT manually dispatch SIGN_OUT here.
  // supabase.auth.signOut() triggers onAuthStateChange with session=null,
  // which already dispatches SESSION_LOADED → user: null.
  // Double-dispatching causes a React hooks render conflict.
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const value: AuthContextValue = {
    user: state.user,
    isAuthenticated: !!state.user,
    isLoading: state.isLoading,
    authModalOpen: state.authModalOpen,
    authModalTab: state.authModalTab,
    openAuthModal,
    closeAuthModal,
    signIn,
    signUp,
    signInWithOAuth,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

// ─── Export client for use in server components / route handlers ──────────────
export { supabase };