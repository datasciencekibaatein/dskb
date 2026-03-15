// ─────────────────────────────────────────────────────────────
//  LIVE CLASSES DATA  –  Add / remove objects here to manage cards
// ─────────────────────────────────────────────────────────────

export interface LiveClass {
  id: string;
  slug: string;                    // used in URL  /live/:slug
  title: string;
  description: string;             // short (shown on card)
  fullDescription: string;         // shown on detail page
  thumbnail: string;               // emoji or image URL
  thumbnailBg: string;             // CSS gradient for card bg
  instructor: string;
  instructorTitle: string;
  duration: string;                // e.g. "8 Weeks"
  lecturesCount: number;
  timing: string;                  // e.g. "Sat & Sun · 8:00 PM IST"
  startDate: string;               // e.g. "July 12, 2025"
  enrollmentDeadline: string;      // e.g. "July 10, 2025"
  enrollmentClosed: boolean;
  price: number;                   // in INR
  originalPrice?: number;
  discountPercent?: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  prerequisites: string[];
  whatYouWillLearn: string[];
  whyThisCourse: string;
  modules: {
    title: string;
    lessons: string[];
  }[];
  seatsLeft?: number;
}

// ── ADD / REMOVE COURSES HERE ────────────────────────────────
export const LIVE_CLASSES: LiveClass[] = [
  {
    id: "lc-001",
    slug: "python-for-data-science-live",
    title: "Python for Data Science – Live Bootcamp",
    description: "Master Python from scratch with hands-on projects, live doubt sessions, and real-world datasets.",
    fullDescription:
      "This intensive live bootcamp takes you from zero Python knowledge to building production-ready data pipelines. Every session is live, interactive, and recorded for lifetime access. You will solve real industry problems, get mentor reviews on your code, and graduate with a portfolio project.",
    thumbnail: "🐍",
    thumbnailBg: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    instructor: "Arjun Mehta",
    instructorTitle: "Senior Data Scientist · Ex-Amazon",
    duration: "8 Weeks",
    lecturesCount: 16,
    timing: "Sat & Sun · 8:00 PM – 10:00 PM IST",
    startDate: "July 12, 2025",
    enrollmentDeadline: "April 10, 2026",
    enrollmentClosed: false,
    price: 999,
    originalPrice: 1599,
    discountPercent: 62,
    level: "Beginner",
    tags: ["Python", "Object Oriented Programming", "Problem Solving",],
    prerequisites: [
      "Basic computer literacy",
      "No prior programming experience needed",
    ],
    whatYouWillLearn: [
      "Python fundamentals: variables, loops, functions, OOP",
      "Data wrangling with Pandas & NumPy",
      "Exploratory data analysis (EDA) on real datasets",
      "Data visualisation with Matplotlib & Seaborn",
      "Capstone project: end-to-end EDA report",
    ],
    whyThisCourse:
      "Python is the #1 language in data science. This live format ensures you never get stuck — mentors answer questions in real time and review your code personally.",
    modules: [
      {
        title: "Module 1 – Python Foundations",
        lessons: [
          "Setting up your environment (Anaconda / Colab)",
          "Variables, data types, and operators",
          "Control flow: if/else, loops",
          "Functions and scope",
        ],
      },
      {
        title: "Module 2 – Data Structures",
        lessons: [
          "Lists, tuples, and sets",
          "Dictionaries and comprehensions",
          "File I/O: reading CSVs",
        ],
      },
      {
        title: "Module 3 – NumPy Deep Dive",
        lessons: [
          "Array creation and broadcasting",
          "Vectorised operations",
          "Linear algebra basics",
        ],
      },
      {
        title: "Module 4 – Pandas for Data Wrangling",
        lessons: [
          "Series and DataFrames",
          "Filtering, groupby, and merging",
          "Handling missing values",
          "Time series basics",
        ],
      },
      {
        title: "Module 5 – EDA & Visualisation",
        lessons: [
          "Matplotlib figure anatomy",
          "Seaborn statistical plots",
          "Storytelling with data",
        ],
      },
      {
        title: "Module 6 – Capstone Project",
        lessons: [
          "Real-world dataset walkthrough",
          "Mentor code review",
          "Final presentation",
        ],
      },
    ],
    seatsLeft: 12,
  },

  {
    id: "lc-002",
    slug: "machine-learning-masterclass-live",
    title: "Machine Learning Masterclass – Live",
    description: "Build & deploy ML models end-to-end. Covers regression, classification, clustering, and MLOps basics.",
    fullDescription:
      "Go beyond tutorials. In this live masterclass you will train models on real industry data, tune hyper-parameters, prevent overfitting, and deploy your model as a REST API. Each week includes a mini-project reviewed by the instructor.",
    thumbnail: "🤖",
    thumbnailBg: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",
    instructor: "Priya Sharma",
    instructorTitle: "ML Engineer · Ex-Flipkart",
    duration: "10 Weeks",
    lecturesCount: 30,
    timing: "Fri & Sat · 7:30 PM – 9:30 PM IST",
    startDate: "August 2, 2026",
    enrollmentDeadline: "July 30, 2026",
    enrollmentClosed: false,
    price: 7999,
    originalPrice: 14999,
    discountPercent: 47,
    level: "Intermediate",
    tags: ["Scikit-learn", "XGBoost", "Flask", "MLOps"],
    prerequisites: [
      "Python basics (variables, loops, functions)",
      "Comfortable with Pandas & NumPy",
    ],
    whatYouWillLearn: [
      "Supervised learning: regression & classification",
      "Unsupervised learning: KMeans, DBSCAN",
      "Feature engineering & selection",
      "Model evaluation: cross-validation, ROC-AUC",
      "Ensemble methods: Random Forest, XGBoost",
      "Deploy model as Flask REST API on Render",
    ],
    whyThisCourse:
      "ML roles are the highest-paid in tech. This course bridges the gap between theory and real deployments that employers care about.",
    modules: [
      {
        title: "Module 1 – ML Fundamentals",
        lessons: [
          "What is machine learning?",
          "Bias-variance tradeoff",
          "Train / val / test split",
        ],
      },
      {
        title: "Module 2 – Regression",
        lessons: [
          "Linear & polynomial regression",
          "Regularisation (Ridge, Lasso)",
          "Project: house price prediction",
        ],
      },
      {
        title: "Module 3 – Classification",
        lessons: [
          "Logistic regression",
          "Decision trees & Random Forests",
          "SVM intuition",
          "Project: churn prediction",
        ],
      },
      {
        title: "Module 4 – Clustering",
        lessons: ["KMeans & elbow method", "DBSCAN", "Hierarchical clustering"],
      },
      {
        title: "Module 5 – Boosting & Ensembles",
        lessons: ["Bagging vs boosting", "XGBoost hands-on", "LightGBM"],
      },
      {
        title: "Module 6 – MLOps & Deployment",
        lessons: [
          "Building a Flask API",
          "Containerising with Docker",
          "Deploying to Render / Railway",
          "Model monitoring basics",
        ],
      },
    ],
    seatsLeft: 6,
  },

  {
    id: "lc-003",
    slug: "sql-analytics-live",
    title: "SQL for Data Analytics – Live Workshop",
    description: "From basic queries to advanced window functions. Designed for analysts, PMs, and aspiring data scientists.",
    fullDescription:
      "SQL is the universal language of data. In these 4 focused live sessions you will go from SELECT * to complex CTEs, window functions, and query optimisation — solving real business questions at every step.",
    thumbnail: "🗃️",
    thumbnailBg: "linear-gradient(135deg,#0d0d0d,#1a1a1a,#004d40)",
    instructor: "Rahul Verma",
    instructorTitle: "Analytics Lead · Ex-Zomato",
    duration: "4 Weeks",
    lecturesCount: 12,
    timing: "Wed & Thu · 9:00 PM – 10:30 PM IST",
    startDate: "July 20, 2026",
    enrollmentDeadline: "July 18, 2026",
    enrollmentClosed: false,
    price: 2499,
    originalPrice: 4999,
    discountPercent: 50,
    level: "Beginner",
    tags: ["SQL", "PostgreSQL", "Analytics", "Window Functions"],
    prerequisites: ["No prior SQL experience needed"],
    whatYouWillLearn: [
      "SELECT, WHERE, GROUP BY, HAVING, ORDER BY",
      "JOINs: inner, left, right, full outer",
      "Subqueries and CTEs",
      "Window functions: ROW_NUMBER, RANK, LAG, LEAD",
      "Query optimisation: indexes and EXPLAIN",
      "Real business case studies",
    ],
    whyThisCourse:
      "SQL is listed in 70% of data job descriptions. Four weeks of focused live practice beats months of passive video watching.",
    modules: [
      {
        title: "Module 1 – SQL Basics",
        lessons: [
          "SELECT, WHERE, ORDER BY",
          "Aggregate functions: SUM, COUNT, AVG",
          "GROUP BY and HAVING",
        ],
      },
      {
        title: "Module 2 – JOINs & Subqueries",
        lessons: [
          "INNER / LEFT / RIGHT / FULL JOIN",
          "Subqueries in WHERE and FROM",
          "CTEs with WITH clause",
        ],
      },
      {
        title: "Module 3 – Window Functions",
        lessons: [
          "PARTITION BY and ORDER BY in windows",
          "ROW_NUMBER, RANK, DENSE_RANK",
          "LAG, LEAD for time series",
          "Running totals and moving averages",
        ],
      },
      {
        title: "Module 4 – Performance & Projects",
        lessons: [
          "Indexes and query plans",
          "EXPLAIN ANALYSE",
          "Capstone: e-commerce analytics dashboard",
        ],
      },
    ],
    seatsLeft: 20,
  },

  // ── TEMPLATE – copy-paste to add a new live class ──────────
  // {
  //   id: "lc-004",
  //   slug: "your-course-slug",
  //   title: "Your Course Title",
  //   description: "Short description shown on the card.",
  //   fullDescription: "Longer description shown on the detail page.",
  //   thumbnail: "🎯",
  //   thumbnailBg: "linear-gradient(135deg,#000,#111,#222)",
  //   instructor: "Instructor Name",
  //   instructorTitle: "Role · Company",
  //   duration: "6 Weeks",
  //   lecturesCount: 18,
  //   timing: "Sat · 7:00 PM – 9:00 PM IST",
  //   startDate: "September 1, 2025",
  //   enrollmentDeadline: "August 28, 2025",
  //   enrollmentClosed: false,
  //   price: 3999,
  //   originalPrice: 6999,
  //   discountPercent: 43,
  //   level: "Intermediate",
  //   tags: ["Tag1", "Tag2", "Tag3"],
  //   prerequisites: ["Prerequisite 1", "Prerequisite 2"],
  //   whatYouWillLearn: ["Learning outcome 1", "Learning outcome 2"],
  //   whyThisCourse: "Explain why this course matters.",
  //   modules: [
  //     { title: "Module 1 – Title", lessons: ["Lesson A", "Lesson B"] },
  //   ],
  //   seatsLeft: 15,
  // },
];