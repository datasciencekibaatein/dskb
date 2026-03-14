// ─── Course Types ───────────────────────────────────────────────────────────
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
export type CourseTopic =
  | "Python"
  | "Pandas"
  | "NumPy"
  | "Machine Learning"
  | "Power BI"
  | "SQL"
  | "Statistics"
  | "AI";

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  thumbnail: string;
  iconEmoji: string;
  topic: CourseTopic;
  level: CourseLevel;
  duration: string;
  lectures: number;
  students: number;
  rating: number;
  language: string;
  tags: string[];
  highlights: string[];
  instructor: string;
  lastUpdated: string;
  isBestseller?: boolean;
  isNew?: boolean;
}

// ─── Tutorial Types ──────────────────────────────────────────────────────────
export interface Tutorial {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: string;
  likes: string;
  topic: CourseTopic;
  publishedAt: string;
  playlistUrl?: string;
}

// ─── Skill Types ─────────────────────────────────────────────────────────────
export interface Skill {
  name: string;
  level: number; // 0-100
  emoji: string;
  color: string;
}

// ─── Stat Types ──────────────────────────────────────────────────────────────
export interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
  icon: string;
}

// ─── Nav Types ───────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

// ─── Contact Form Types ──────────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  topic: string;
  message: string;
}

// ─── Theme Types ─────────────────────────────────────────────────────────────
export type Theme = "dark" | "light";

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

// ─── Auth Types ───────────────────────────────────────────────────────────────
export type AuthTab = "signin" | "signup";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: string;
  enrolledCourses: string[];
  role: "student" | "admin";
}

export interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authModalOpen: boolean;
  authModalTab: AuthTab;
  openAuthModal: (tab?: AuthTab) => void;
  closeAuthModal: () => void;
  signIn: (data: SignInFormData) => Promise<AuthResult>;
  signUp: (data: SignUpFormData) => Promise<AuthResult>;
  signInWithOAuth?: (provider: "google" | "github") => Promise<AuthResult>;
  signOut: () => void;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  message?: string;
  user?: User;
}