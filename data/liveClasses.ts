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
    title: "Python Bootcamp 2026: Learn, Build, and Grow Your Career",
    description: "A live, hands-on Python bootcamp designed to take you from beginner to confident coder with real projects, structured learning, and career-focused guidance.",
    fullDescription:
      "This Python Bootcamp is a live, hands-on program designed to help you build real coding skills from scratch. You’ll learn through structured modules, practical exercises, and guided projects—so you’re not just understanding concepts, but actually applying them. The course focuses on clarity, problem-solving, and writing clean code, making it perfect for beginners as well as anyone looking to strengthen their fundamentals. Along with core Python concepts, you’ll gain experience working on real-world tasks and projects. By the end of the bootcamp, you’ll have the confidence to code independently, build your own projects, and a clear direction on how to move forward in your tech journey.",
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
    tags: [
      "Python",
      "Python Bootcamp",
      "Learn Python",
      "Programming",
      "Coding for Beginners",
      "Live Classes",
      "Hands-on Learning",
      "Software Development",
      "Data Science Basics",
      "Automation",
      "Problem Solving",
      "Coding Skills",
      "Beginner Friendly",
      "Career Growth",
      "Tech Education",
      "Online Learning"
    ],
    prerequisites: [
      "No prior programming experience required",
      "Basic computer usage (typing, file handling, browsing)",
      "Access to a laptop or desktop with internet connection",
      "Willingness to learn and practice consistently",
      "Basic understanding of English (for code and instructions)",
      "Interest in coding, problem-solving, or technology"
    ],
    whatYouWillLearn: [
      "Strong Python fundamentals",
      "Problem-solving and logical thinking",
      "Writing clean and efficient code",
      "Working with real-world data",
      "Building practical projects",
      "Understanding core programming concepts",
      "Confidence to code independently",
      "Clarity on next steps and career direction"
    ],
    whyThisCourse:
      "This Python Bootcamp is designed to help you go from a complete beginner to a confident coder through live, interactive sessions where you learn by actually writing code, not just watching lectures. With a structured 16-module roadmap, hands-on projects, real-world problem solving, and continuous guidance, you’ll build practical skills that matter in today’s tech world. Along with assessments to track your progress and dedicated career guidance on portfolios, resumes, and next steps, this course ensures you don’t just learn Python—you gain the clarity, confidence, and direction to use it for real opportunities.",
    modules: [
    {
      title: "Module 1: Introduction & Setup",
      lessons: [
        "Python overview and real-world use cases",
        "Setting up environment (VS Code / Jupyter)",
        "Writing your first Python program",
        "Understanding syntax and indentation",
      ],
    },
    {
      title: "Module 2: Variables & Data Types",
      lessons: [
        "Variables and naming conventions",
        "Data types (int, float, string, boolean)",
        "Type casting",
        "Taking user input",
      ],
    },
    {
      title: "Module 3: Operators",
      lessons: [
        "Arithmetic operators",
        "Comparison operators",
        "Logical operators",
        "Basic problem-solving using operators",
      ],
    },
    {
      title: "Module 4: Conditional Statements",
      lessons: [
        "if, elif, else statements",
        "Nested conditions",
        "Real-world decision-making problems",
      ],
    },
    {
      title: "Module 5: Loops (Basics)",
      lessons: [
        "for loop",
        "while loop",
        "range() function",
      ],
    },
    {
      title: "Module 6: Loops (Advanced)",
      lessons: [
        "break, continue, pass",
        "Nested loops",
        "Practice problems",
      ],
    },
    {
      title: "Module 7: Lists",
      lessons: [
        "Creating lists",
        "Indexing and slicing",
        "List methods and operations",
      ],
    },
    {
      title: "Module 8: Tuples, Sets, Dictionaries",
      lessons: [
        "Tuples and use cases",
        "Sets and uniqueness",
        "Dictionaries (key-value pairs)",
      ],
    },
    {
      title: "Module 9: Functions (Core)",
      lessons: [
        "Defining and calling functions",
        "Parameters and return values",
        "Code reusability",
      ],
    },
    {
      title: "Module 10: Functions (Advanced)",
      lessons: [
        "Default and keyword arguments",
        "Lambda functions (intro)",
        "Writing modular code",
      ],
    },
    {
      title: "Module 11: Strings",
      lessons: [
        "String operations",
        "String methods",
        "String formatting",
      ],
    },
    {
      title: "Module 12: File Handling",
      lessons: [
        "Reading files",
        "Writing and appending files",
        "Working with real data",
      ],
    },
    {
      title: "Module 13: Error Handling & Debugging",
      lessons: [
        "Types of errors",
        "try, except, finally",
        "Debugging techniques",
      ],
    },
    {
      title: "Module 14: Object-Oriented Programming (OOP)",
      lessons: [
        "Classes and objects",
        "__init__ method",
        "Inheritance basics",
        "Encapsulation concept",
      ],
    },
    {
      title: "Module 15: Libraries + Projects",
      lessons: [
        "Introduction to libraries",
        "NumPy and Pandas overview",
        "Mini project building",
        "Real-world use cases",
      ],
    },
    {
      title: "Module 16: Final Assessment & Career Guidance",
      lessons: [
        "Final test (MCQ + coding)",
        "Project evaluation",
        "Resume building",
        "Portfolio and GitHub",
        "Career paths and roadmap",
      ],
  },
],
    seatsLeft: 20,
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
    title: "SQL for beginners ",
    description: "From basic queries to advanced window functions. Designed for analysts, PMs, and aspiring data scientists.",
    fullDescription:
      "SQL is the universal language of data. In these 4 focused live sessions you will go from SELECT * to complex CTEs, window functions, and query optimisation — solving real business questions at every step.",
    thumbnail: "🗃️",
    thumbnailBg: "linear-gradient(135deg,#0d0d0d,#1a1a1a,#004d40)",
    instructor: "Rahul Verma",
    instructorTitle: "Datascientist 5 years of experience ",
    duration: "4 Weeks",
    lecturesCount: 12,
    timing: "Wed & Thu · 9:00 PM – 10:30 PM IST",
    startDate: "July 20, 2026",
    enrollmentDeadline: "July 18, 2026",
    enrollmentClosed: false,
    price: 1499,
    originalPrice: 4999,
    discountPercent: 50,
    level: "Beginner",
    tags: ["SQL", "PostgreSQL", "Analytics", "Window Functions","CTE"],
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