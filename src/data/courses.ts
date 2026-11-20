// =============================================================
// DataScience ki Baatein — DUMMY course catalogue
// Placeholder data for building the website. Prices, durations
// and lesson lists are samples — replace with real data later.
// Location in the project: src/data/courses.ts
// =============================================================

export type Language = "Hindi" | "English" | "Hindi + English";
export type Level = "Beginner" | "Intermediate" | "Advanced";
export type CourseType = "recorded" | "live";
export type CourseStatus = "published" | "coming-soon";

export interface Lesson {
  title: string;
  durationMin: number;
  isFreePreview?: boolean; // visible without buying
}

export interface Section {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string; // used in URL: /courses/<slug>
  title: string;
  subtitle: string;
  category: string; // "Data Science" | "Machine Learning" | "Deep Learning" | "GenAI" ...
  language: Language;
  level: Level;
  type: CourseType;
  status: CourseStatus;
  priceINR: number;
  originalPriceINR?: number; // shown struck-through if discounted
  thumbnail: string; // image in /public/thumbnails (16:9 .png, e.g. 1280×720); placeholder shown until it exists
  thumbnailLabel: string; // short text shown on the thumbnail placeholder
  instructor: string;
  whatYouWillLearn: string[];
  includes: string[];
  curriculum: Section[];
  liveSchedule?: { startDate: string; days: string; time: string; seats: number };
}

const INSTRUCTOR = "DataScience ki Baatein";

export const courses: Course[] = [
  {
    id: "c1",
    slug: "python-for-data-science-hindi",
    title: "Python for Data Science",
    subtitle: "Zero se Python seekho — data science ke liye",
    category: "Data Science",
    language: "Hindi",
    level: "Beginner",
    type: "recorded",
    status: "published",
    priceINR: 499,
    originalPriceINR: 1499,
    thumbnail: "/thumbnails/python.png",
    thumbnailLabel: "Python",
    instructor: INSTRUCTOR,
    whatYouWillLearn: [
      "Python basics: variables, data types, loops, functions",
      "Lists, tuples, dictionaries and sets",
      "File handling and error handling",
      "Writing clean, reusable code for data work",
    ],
    includes: ["Recorded HD lessons", "Lecture notes (PDF)", "Code files on GitHub", "Certificate of completion"],
    curriculum: [
      {
        title: "Getting Started",
        lessons: [
          { title: "Why Python for Data Science?", durationMin: 15, isFreePreview: true },
          { title: "Installing Python, Jupyter and VS Code", durationMin: 20, isFreePreview: true },
        ],
      },
      {
        title: "Python Fundamentals",
        lessons: [
          { title: "Variables and Data Types", durationMin: 30 },
          { title: "Conditions and Loops", durationMin: 35 },
          { title: "Functions", durationMin: 40 },
        ],
      },
      {
        title: "Data Structures",
        lessons: [
          { title: "Lists and Tuples", durationMin: 35 },
          { title: "Dictionaries and Sets", durationMin: 35 },
        ],
      },
    ],
  },
  {
    id: "c2",
    slug: "numpy-pandas-masterclass-hindi",
    title: "NumPy & Pandas Masterclass",
    subtitle: "Data ko handle karna seekho — arrays se EDA tak",
    category: "Data Science",
    language: "Hindi",
    level: "Beginner",
    type: "recorded",
    status: "published",
    priceINR: 699,
    originalPriceINR: 1999,
    thumbnail: "/thumbnails/numpy-pandas.png",
    thumbnailLabel: "NumPy & Pandas",
    instructor: INSTRUCTOR,
    whatYouWillLearn: [
      "NumPy arrays, indexing, broadcasting",
      "Pandas Series and DataFrames",
      "Cleaning, filtering, grouping and merging data",
      "End-to-end EDA project on an e-commerce dataset",
    ],
    includes: ["Recorded HD lessons", "Datasets + notebooks", "EDA project", "Certificate of completion"],
    curriculum: [
      {
        title: "NumPy",
        lessons: [
          { title: "NumPy Arrays Introduction", durationMin: 30, isFreePreview: true },
          { title: "Indexing and Slicing", durationMin: 30 },
          { title: "Broadcasting and Vectorization", durationMin: 35 },
        ],
      },
      {
        title: "Pandas",
        lessons: [
          { title: "Series and DataFrames", durationMin: 35, isFreePreview: true },
          { title: "Handling Missing Data", durationMin: 40 },
          { title: "GroupBy and Aggregation", durationMin: 40 },
          { title: "Merge, Join and Concat", durationMin: 35 },
        ],
      },
      {
        title: "Project",
        lessons: [{ title: "EDA on an E-commerce Dataset", durationMin: 60 }],
      },
    ],
  },
  {
    id: "c3",
    slug: "data-visualization-hindi",
    title: "Data Visualization with Matplotlib & Seaborn",
    subtitle: "Charts, dashboards aur insights — data ki kahani batao",
    category: "Data Science",
    language: "Hindi",
    level: "Beginner",
    type: "recorded",
    status: "published",
    priceINR: 599,
    originalPriceINR: 1499,
    thumbnail: "/thumbnails/visualization.png",
    thumbnailLabel: "Visualization",
    instructor: INSTRUCTOR,
    whatYouWillLearn: [
      "Line, bar, scatter, histogram and box plots",
      "Seaborn statistical charts",
      "Choosing the right chart for the question",
      "Build a retail sales dashboard with insights",
    ],
    includes: ["Recorded HD lessons", "Datasets + notebooks", "Dashboard project", "Certificate of completion"],
    curriculum: [
      {
        title: "Matplotlib",
        lessons: [
          { title: "Matplotlib Basics", durationMin: 30, isFreePreview: true },
          { title: "Customizing Charts", durationMin: 35 },
        ],
      },
      {
        title: "Seaborn",
        lessons: [
          { title: "Seaborn Introduction", durationMin: 30 },
          { title: "Distribution and Relationship Plots", durationMin: 40 },
        ],
      },
      {
        title: "Project",
        lessons: [{ title: "Retail Sales Dashboard", durationMin: 60 }],
      },
    ],
  },
  {
    id: "c4",
    slug: "feature-engineering-hindi",
    title: "Feature Engineering & Preprocessing",
    subtitle: "Raw data ko model-ready banao",
    category: "Machine Learning",
    language: "Hindi",
    level: "Intermediate",
    type: "recorded",
    status: "coming-soon",
    priceINR: 799,
    originalPriceINR: 1999,
    thumbnail: "/thumbnails/feature-engineering.png",
    thumbnailLabel: "Feature Engineering",
    instructor: INSTRUCTOR,
    whatYouWillLearn: [
      "Missing value imputation techniques",
      "Encoding categorical variables",
      "Scaling, transformation and outliers",
      "Feature selection and train-test split",
    ],
    includes: ["Recorded HD lessons", "Notebooks", "Certificate of completion"],
    curriculum: [
      {
        title: "Data Cleaning",
        lessons: [
          { title: "Missing Value Imputation", durationMin: 40, isFreePreview: true },
          { title: "Handling Outliers", durationMin: 35 },
        ],
      },
      {
        title: "Transformations",
        lessons: [
          { title: "Encoding Categorical Data", durationMin: 40 },
          { title: "Feature Scaling", durationMin: 30 },
          { title: "Date-Time and Text Features", durationMin: 40 },
        ],
      },
      {
        title: "Selection",
        lessons: [
          { title: "Feature Selection", durationMin: 45 },
          { title: "Train-Test Split", durationMin: 25 },
        ],
      },
    ],
  },
  {
    id: "c5",
    slug: "machine-learning-complete-hindi",
    title: "Complete Machine Learning",
    subtitle: "Linear Regression se Boosting tak — theory + code + projects",
    category: "Machine Learning",
    language: "Hindi",
    level: "Intermediate",
    type: "recorded",
    status: "coming-soon",
    priceINR: 1999,
    originalPriceINR: 4999,
    thumbnail: "/thumbnails/machine-learning.png",
    thumbnailLabel: "Machine Learning",
    instructor: INSTRUCTOR,
    whatYouWillLearn: [
      "Regression and classification foundations",
      "KNN, SVM, Decision Trees, Random Forest, Boosting",
      "Model evaluation, overfitting and regularization",
      "Clustering and dimensionality reduction",
      "Two supervised projects + one unsupervised project",
    ],
    includes: ["Recorded HD lessons", "Notebooks", "3 projects", "Certificate of completion"],
    curriculum: [
      {
        title: "Foundations",
        lessons: [
          { title: "Linear Regression — Part 1", durationMin: 60, isFreePreview: true },
          { title: "Linear Regression — Part 2", durationMin: 60 },
          { title: "Overfitting vs Underfitting", durationMin: 40 },
          { title: "Logistic Regression", durationMin: 60 },
        ],
      },
      {
        title: "Algorithms",
        lessons: [
          { title: "K-Nearest Neighbors", durationMin: 50 },
          { title: "SVM — Part 1", durationMin: 50 },
          { title: "Decision Trees — Part 1", durationMin: 50 },
          { title: "Random Forest", durationMin: 50 },
        ],
      },
      {
        title: "Projects",
        lessons: [
          { title: "Regression Project", durationMin: 75 },
          { title: "Classification Project", durationMin: 75 },
        ],
      },
    ],
  },
  {
    id: "c6",
    slug: "deep-learning-ann-to-gan",
    title: "Deep Learning: From ANN to GANs",
    subtitle: "Build neural networks from scratch with NumPy and Keras",
    category: "Deep Learning",
    language: "English",
    level: "Advanced",
    type: "recorded",
    status: "coming-soon",
    priceINR: 2499,
    originalPriceINR: 5999,
    thumbnail: "/thumbnails/deep-learning.png",
    thumbnailLabel: "Deep Learning",
    instructor: INSTRUCTOR,
    whatYouWillLearn: [
      "Perceptron to multi-layer ANNs, from scratch",
      "CNNs for image classification (CIFAR-10)",
      "RNNs, LSTMs and Attention",
      "Autoencoders, VAEs and GANs",
    ],
    includes: ["Recorded HD lessons", "NumPy + Keras notebooks", "Projects", "Certificate of completion"],
    curriculum: [
      {
        title: "Foundations & ANN",
        lessons: [
          { title: "What is Deep Learning?", durationMin: 30, isFreePreview: true },
          { title: "The Perceptron", durationMin: 40 },
          { title: "Backpropagation from Scratch", durationMin: 60 },
        ],
      },
      {
        title: "CNN",
        lessons: [
          { title: "Convolution Explained", durationMin: 45 },
          { title: "CIFAR-10 Project", durationMin: 60 },
        ],
      },
      {
        title: "RNN & Sequences",
        lessons: [
          { title: "RNN and LSTM", durationMin: 50 },
          { title: "Attention Mechanism", durationMin: 50 },
        ],
      },
      {
        title: "Generative Models",
        lessons: [
          { title: "Autoencoders and VAE", durationMin: 50 },
          { title: "GANs", durationMin: 60 },
        ],
      },
    ],
  },
  {
    id: "c7",
    slug: "data-science-live-bootcamp",
    title: "Data Science Live Bootcamp",
    subtitle: "8-week live cohort with doubt sessions and projects",
    category: "Data Science",
    language: "Hindi + English",
    level: "Beginner",
    type: "live",
    status: "published",
    priceINR: 4999,
    originalPriceINR: 9999,
    thumbnail: "/thumbnails/bootcamp.png",
    thumbnailLabel: "Live Bootcamp",
    instructor: INSTRUCTOR,
    whatYouWillLearn: [
      "Python, NumPy, Pandas and visualization — live",
      "Weekly assignments with feedback",
      "Live doubt-clearing sessions",
      "Capstone project for your portfolio",
    ],
    includes: ["Live classes", "Recordings of every session", "Assignments", "Certificate of completion"],
    liveSchedule: { startDate: "2027-02-01", days: "Sat & Sun", time: "7:00 PM IST", seats: 50 },
    curriculum: [
      {
        title: "Weeks 1–2: Python",
        lessons: [{ title: "Live sessions (4)", durationMin: 480 }],
      },
      {
        title: "Weeks 3–5: Data Handling & Visualization",
        lessons: [{ title: "Live sessions (6)", durationMin: 720 }],
      },
      {
        title: "Weeks 6–8: Capstone",
        lessons: [{ title: "Live sessions + project reviews (6)", durationMin: 720 }],
      },
    ],
  },
];

// Helpers the website will use
export const getCourseBySlug = (slug: string) => courses.find((c) => c.slug === slug);
export const categories = Array.from(new Set(courses.map((c) => c.category)));
export const languages: Language[] = ["Hindi", "English", "Hindi + English"];

// ---------- Display helpers (used by the pages) ----------

// Home page "Featured courses": published courses first, then coming-soon; max 4.
export function getFeaturedCourses(limit = 4): Course[] {
  const published = courses.filter((c) => c.status === "published");
  const comingSoon = courses.filter((c) => c.status !== "published");
  return [...published, ...comingSoon].slice(0, limit);
}

export function getLessonCount(course: Course): number {
  return course.curriculum.reduce((sum, s) => sum + s.lessons.length, 0);
}

export function getTotalMinutes(course: Course): number {
  return course.curriculum.reduce((sum, s) => sum + s.lessons.reduce((m, l) => m + l.durationMin, 0), 0);
}

// 45 → "45 min", 90 → "1 hr 30 min", 480 → "8 hrs"
export function formatMinutes(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  const hours = `${h} ${h === 1 ? "hr" : "hrs"}`;
  return m ? `${hours} ${m} min` : hours;
}

export function getDiscountPercent(course: Course): number {
  const original = course.originalPriceINR;
  if (!original || original <= course.priceINR) return 0;
  return Math.round((1 - course.priceINR / original) * 100);
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Values for the Type filter on /courses (categories + languages are above).
export const courseTypes: CourseType[] = ["recorded", "live"];

// Distinct spoken languages ("Hindi + English" counts as both) — for the hero stat.
export const spokenLanguageCount = new Set(courses.flatMap((c) => c.language.split(" + "))).size;
