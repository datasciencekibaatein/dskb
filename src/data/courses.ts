// Single source of truth for all courses on the site.
// Edit/add courses here — every page reads from this file.
// NOTE: This is dummy data for Step 1 (no backend yet).

export type CourseCategory =
  | "Python"
  | "Data Analysis"
  | "Machine Learning"
  | "AI"
  | "SQL"
  | "Statistics"
  | "Business Intelligence";

export type CourseLanguage = "Hindi" | "English";
export type CourseType = "recorded" | "live";
export type CourseStatus = "published" | "coming-soon";
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Lesson {
  title: string;
  duration: string; // e.g. "12:30"
  isFreePreview?: boolean;
}

export interface CurriculumSection {
  title: string;
  lessons: Lesson[];
}

export interface LiveSchedule {
  startDate: string; // ISO date, e.g. "2027-01-10"
  days: string; // e.g. "Sat & Sun"
  time: string; // e.g. "8:00 PM – 10:00 PM"
  timezone: string; // e.g. "IST"
  totalSessions: number;
}

export interface Course {
  slug: string; // used in the URL: /courses/[slug]
  title: string;
  subtitle: string;
  category: CourseCategory;
  language: CourseLanguage;
  type: CourseType;
  status: CourseStatus;
  level: CourseLevel;
  price: number; // selling price in INR
  originalPrice: number; // shown struck-through if higher than price
  duration: string;
  featured?: boolean; // shown on the home page
  whatYouWillLearn: string[];
  includes: string[];
  curriculum: CurriculumSection[];
  liveSchedule?: LiveSchedule; // only for type: "live"
}

export const courses: Course[] = [
  {
    slug: "python-for-data-science",
    title: "Python for Data Science — Complete Masterclass",
    subtitle:
      "Start your data science journey with Python. Variables, loops, functions, OOP and data analysis with hands-on projects from day one.",
    category: "Python",
    language: "Hindi",
    type: "recorded",
    status: "published",
    level: "Beginner",
    price: 1499,
    originalPrice: 4999,
    duration: "28 hours",
    featured: true,
    whatYouWillLearn: [
      "Python basics to advanced concepts",
      "Write clean functions and classes (OOP)",
      "Work with files, errors and modules",
      "Analyse data with real mini-projects",
    ],
    includes: [
      "28 hours of on-demand video",
      "Downloadable notebooks",
      "Certificate of completion",
      "Lifetime access",
    ],
    curriculum: [
      {
        title: "Getting Started",
        lessons: [
          { title: "Welcome & course roadmap", duration: "05:12", isFreePreview: true },
          { title: "Installing Python & Jupyter", duration: "11:40", isFreePreview: true },
          { title: "Your first Python program", duration: "09:05" },
        ],
      },
      {
        title: "Core Python",
        lessons: [
          { title: "Variables & data types", duration: "18:22" },
          { title: "Loops and conditions", duration: "21:10" },
          { title: "Functions", duration: "24:45" },
        ],
      },
      {
        title: "Object-Oriented Python",
        lessons: [
          { title: "Classes & objects", duration: "22:30" },
          { title: "Inheritance", duration: "17:15" },
        ],
      },
    ],
  },
  {
    slug: "pandas-numpy-bootcamp",
    title: "Pandas & NumPy — Data Manipulation Bootcamp",
    subtitle:
      "Work with real-world datasets. Master data cleaning, wrangling and analysis through practical exercises.",
    category: "Data Analysis",
    language: "English",
    type: "recorded",
    status: "published",
    level: "Intermediate",
    price: 1299,
    originalPrice: 3999,
    duration: "18 hours",
    whatYouWillLearn: [
      "Load, clean and reshape messy data",
      "NumPy arrays and vectorization",
      "GroupBy, merge and pivot tables",
      "Exploratory data analysis workflow",
    ],
    includes: [
      "18 hours of on-demand video",
      "Real datasets to practise on",
      "Jupyter notebooks",
      "Lifetime access",
    ],
    curriculum: [
      {
        title: "NumPy Foundations",
        lessons: [
          { title: "Why NumPy?", duration: "07:50", isFreePreview: true },
          { title: "Arrays, shapes & indexing", duration: "19:30" },
          { title: "Vectorized operations", duration: "16:05" },
        ],
      },
      {
        title: "Pandas in Practice",
        lessons: [
          { title: "Series & DataFrames", duration: "14:20", isFreePreview: true },
          { title: "Cleaning missing values", duration: "20:40" },
          { title: "GroupBy & aggregation", duration: "23:15" },
          { title: "Merging datasets", duration: "18:00" },
        ],
      },
    ],
  },
  {
    slug: "machine-learning-a-to-z",
    title: "Machine Learning A–Z — Live Cohort",
    subtitle:
      "Supervised and unsupervised learning, taught live. Build real ML pipelines with Scikit-learn and ask questions in every class.",
    category: "Machine Learning",
    language: "Hindi",
    type: "live",
    status: "published",
    level: "Intermediate",
    price: 1999,
    originalPrice: 5999,
    duration: "16 live sessions",
    featured: true,
    whatYouWillLearn: [
      "Linear & logistic regression",
      "Decision trees and random forests",
      "Clustering & PCA",
      "Build and evaluate an end-to-end ML project",
    ],
    includes: [
      "16 live interactive sessions",
      "Recordings of every class",
      "Weekly assignments with feedback",
      "Certificate of completion",
    ],
    liveSchedule: {
      startDate: "2027-01-09",
      days: "Sat & Sun",
      time: "8:00 PM – 10:00 PM",
      timezone: "IST",
      totalSessions: 16,
    },
    curriculum: [
      {
        title: "Week 1–2: ML Foundations",
        lessons: [
          { title: "What is Machine Learning?", duration: "Live", isFreePreview: true },
          { title: "Linear regression", duration: "Live" },
          { title: "Model evaluation basics", duration: "Live" },
        ],
      },
      {
        title: "Week 3–5: Classification",
        lessons: [
          { title: "Logistic regression", duration: "Live" },
          { title: "Decision trees", duration: "Live" },
          { title: "Random forests", duration: "Live" },
        ],
      },
      {
        title: "Week 6–8: Unsupervised & Project",
        lessons: [
          { title: "K-Means clustering", duration: "Live" },
          { title: "PCA", duration: "Live" },
          { title: "Capstone project", duration: "Live" },
        ],
      },
    ],
  },
  {
    slug: "power-bi-dashboards",
    title: "Power BI — Business Intelligence Dashboards",
    subtitle:
      "Build interactive dashboards with Power BI. DAX, Power Query and data modelling for real business insights.",
    category: "Business Intelligence",
    language: "Hindi",
    type: "recorded",
    status: "coming-soon",
    level: "Beginner",
    price: 999,
    originalPrice: 2999,
    duration: "15 hours",
    whatYouWillLearn: [
      "Connect and transform data with Power Query",
      "Write DAX measures",
      "Design clean, interactive dashboards",
      "Publish and share reports",
    ],
    includes: [
      "15 hours of on-demand video",
      "Practice datasets",
      "Certificate of completion",
      "Lifetime access",
    ],
    curriculum: [
      {
        title: "Power BI Basics",
        lessons: [
          { title: "Tour of Power BI Desktop", duration: "10:00", isFreePreview: true },
          { title: "Loading your first dataset", duration: "12:30" },
        ],
      },
      {
        title: "DAX & Modelling",
        lessons: [
          { title: "Relationships & star schema", duration: "18:45" },
          { title: "DAX measures 101", duration: "22:10" },
        ],
      },
    ],
  },
  {
    slug: "sql-for-data-science",
    title: "SQL for Data Science — Query Master",
    subtitle:
      "Joins, subqueries, window functions and database design. The complete SQL toolkit every data analyst needs.",
    category: "SQL",
    language: "English",
    type: "recorded",
    status: "published",
    level: "Beginner",
    price: 899,
    originalPrice: 2499,
    duration: "12 hours",
    featured: true,
    whatYouWillLearn: [
      "Write queries from basic to advanced",
      "Master joins and subqueries",
      "Use window functions confidently",
      "Crack common SQL interview questions",
    ],
    includes: [
      "12 hours of on-demand video",
      "SQL practice sheets",
      "Interview question bank",
      "Lifetime access",
    ],
    curriculum: [
      {
        title: "SQL Basics",
        lessons: [
          { title: "Databases & tables explained", duration: "08:15", isFreePreview: true },
          { title: "SELECT, WHERE, ORDER BY", duration: "16:40" },
        ],
      },
      {
        title: "Intermediate SQL",
        lessons: [
          { title: "JOINs in depth", duration: "24:00" },
          { title: "GROUP BY & HAVING", duration: "15:30" },
        ],
      },
      {
        title: "Advanced SQL",
        lessons: [
          { title: "Window functions", duration: "26:20" },
          { title: "Interview problems walkthrough", duration: "30:00" },
        ],
      },
    ],
  },
  {
    slug: "statistics-for-data-science",
    title: "Statistics for Data Science — No Fear",
    subtitle:
      "Descriptive and inferential statistics, probability and distributions made simple — explained in Hindi.",
    category: "Statistics",
    language: "Hindi",
    type: "recorded",
    status: "published",
    level: "Beginner",
    price: 799,
    originalPrice: 1999,
    duration: "16 hours",
    whatYouWillLearn: [
      "Mean, median, variance — intuitively",
      "Probability and common distributions",
      "Hypothesis testing step by step",
      "Apply statistics in Python",
    ],
    includes: [
      "16 hours of on-demand video",
      "Formula cheat sheet",
      "Certificate of completion",
      "Lifetime access",
    ],
    curriculum: [
      {
        title: "Descriptive Statistics",
        lessons: [
          { title: "Why statistics matters", duration: "06:30", isFreePreview: true },
          { title: "Measures of centre & spread", duration: "19:10" },
        ],
      },
      {
        title: "Probability & Inference",
        lessons: [
          { title: "Probability basics", duration: "17:45" },
          { title: "Normal distribution", duration: "20:00" },
          { title: "Hypothesis testing", duration: "25:30" },
        ],
      },
    ],
  },
  {
    slug: "ai-fundamentals",
    title: "AI Fundamentals — Practical Artificial Intelligence (Live)",
    subtitle:
      "From neural networks to large language models. Build real AI applications in a live, cohort-based format.",
    category: "AI",
    language: "English",
    type: "live",
    status: "coming-soon",
    level: "Intermediate",
    price: 1699,
    originalPrice: 4499,
    duration: "12 live sessions",
    featured: true,
    whatYouWillLearn: [
      "How neural networks learn",
      "How LLMs like ChatGPT work",
      "Prompting and building with AI APIs",
      "Ship a small AI app",
    ],
    includes: [
      "12 live interactive sessions",
      "Recordings of every class",
      "Project templates",
      "Certificate of completion",
    ],
    liveSchedule: {
      startDate: "2027-02-06",
      days: "Saturdays",
      time: "7:00 PM – 9:00 PM",
      timezone: "IST",
      totalSessions: 12,
    },
    curriculum: [
      {
        title: "Foundations",
        lessons: [
          { title: "What is AI, really?", duration: "Live", isFreePreview: true },
          { title: "Neural networks intuition", duration: "Live" },
        ],
      },
      {
        title: "Large Language Models",
        lessons: [
          { title: "How LLMs work", duration: "Live" },
          { title: "Prompt engineering", duration: "Live" },
          { title: "Build an AI app", duration: "Live" },
        ],
      },
    ],
  },
];

// ---------- Helpers ----------

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getFeaturedCourses(): Course[] {
  return courses.filter((c) => c.featured);
}

export function getLessonCount(course: Course): number {
  return course.curriculum.reduce((sum, s) => sum + s.lessons.length, 0);
}

export function getDiscountPercent(course: Course): number {
  if (course.originalPrice <= course.price) return 0;
  return Math.round((1 - course.price / course.originalPrice) * 100);
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Unique values, used to build the filter dropdowns.
export const allCategories = Array.from(new Set(courses.map((c) => c.category)));
export const allLanguages = Array.from(new Set(courses.map((c) => c.language)));
export const allTypes: CourseType[] = ["recorded", "live"];
