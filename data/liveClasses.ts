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
    title: "SQL for Beginners: From Zero to Data Querying",
    description: "Learn SQL from scratch and build strong querying skills through live sessions, practice, and real-world examples.",
    fullDescription:
      "This beginner-friendly SQL bootcamp is designed to help you build a strong foundation in data querying from scratch. Through live interactive sessions, you will learn how to work with databases, write efficient queries, and solve real-world problems step by step. The course follows a structured path, starting from basic queries and gradually moving towards advanced concepts like joins, subqueries, case statements, and window functions. With hands-on practice, assessments, and guided learning, you will gain the confidence to work with data independently and prepare for real-world roles in analytics and tech.",
    thumbnail: "🗃️",
    thumbnailBg: "linear-gradient(135deg,#0d0d0d,#1a1a1a,#004d40)",
    instructor: "Rahul Verma",
    instructorTitle: "Data Scientist | 5+ years experience",
    duration: "8 Weeks",
    lecturesCount: 16,
    timing: "Flexible (based on student availability)",
    startDate: "July 20, 2026",
    enrollmentDeadline: "July 18, 2026",
    enrollmentClosed: false,
    price: 1499,
    originalPrice: 2999,
    discountPercent: 50,
    level: "Beginner",
    tags: ["SQL", "Beginner SQL", "Data Analytics", "Database", "Querying"],
    prerequisites: [
      "No prior SQL experience required",
      "Basic computer knowledge",
      "Willingness to practice and learn"
    ],
    whatYouWillLearn: [
      "Strong SQL fundamentals",
      "Writing efficient queries",
      "Working with real-world data",
      "Problem-solving using SQL",
      "Confidence to query databases independently",
      "Understanding analytics workflows"
    ],
    whyThisCourse:
      "This course focuses on building strong fundamentals through live practice and structured learning, helping you confidently use SQL for real-world data problems instead of just learning theory.",
    modules: [
      {
        title: "Module 1 – Introduction to Databases & SQL",
        lessons: [
          "What is SQL and databases",
          "Understanding tables, rows, columns",
          "Setting up environment",
          "Writing first SQL query"
        ],
      },
      {
        title: "Module 2 – Basic Queries",
        lessons: [
          "SELECT statement",
          "Filtering with WHERE",
          "Sorting using ORDER BY"
        ],
      },
      {
        title: "Module 3 – Working with Data",
        lessons: [
          "DISTINCT values",
          "LIMIT and filtering data",
          "Basic data exploration"
        ],
      },
      {
        title: "Module 4 – Aggregate Functions",
        lessons: [
          "COUNT, SUM, AVG, MIN, MAX",
          "GROUP BY concept",
          "HAVING clause"
        ],
      },
      {
        title: "Module 5 – Data Cleaning Basics",
        lessons: [
          "Handling NULL values",
          "Basic string functions",
          "Data formatting"
        ],
      },
      {
        title: "Module 6 – Practice & Problem Solving",
        lessons: [
          "Real-world query problems",
          "Combining multiple concepts",
          "Logic building with SQL"
        ],
      },
      {
        title: "Module 7 – Test 1 (Fundamentals)",
        lessons: [
          "MCQ based assessment",
          "Query writing test",
          "Concept evaluation"
        ],
      },
      {
        title: "Module 8 – Intermediate Queries",
        lessons: [
          "Multiple conditions",
          "Using AND, OR",
          "Advanced filtering"
        ],
      },
      {
        title: "Module 9 – Joins (Core Concept)",
        lessons: [
          "INNER JOIN",
          "LEFT JOIN",
          "RIGHT JOIN"
        ],
      },
      {
        title: "Module 10 – Advanced Joins",
        lessons: [
          "Combining multiple tables",
          "Real-world join problems",
          "Data relationships"
        ],
      },
      {
        title: "Module 11 – Subqueries",
        lessons: [
          "Subqueries in WHERE",
          "Subqueries in FROM",
          "Practical examples"
        ],
      },
      {
        title: "Module 12 – CASE Statements",
        lessons: [
          "Conditional logic in SQL",
          "CASE WHEN usage",
          "Real-world scenarios"
        ],
      },
      {
        title: "Module 13 – Window Functions",
        lessons: [
          "ROW_NUMBER and RANK",
          "PARTITION BY concept",
          "Basic analytical queries"
        ],
      },
      {
        title: "Module 14 – Project Building",
        lessons: [
          "Working on real dataset",
          "Applying all learned concepts",
          "End-to-end query solving"
        ],
      },
      {
        title: "Module 15 – Test 2 (Final Assessment)",
        lessons: [
          "Scenario-based questions",
          "Query writing challenges",
          "Project evaluation"
        ],
      },
      {
        title: "Module 16 – Career Guidance",
        lessons: [
          "SQL in real-world jobs",
          "Resume building",
          "Portfolio guidance",
          "Next steps in data career"
        ],
      },
    ],
    seatsLeft: 20,
  },
    {
    id: "lc-004",
    slug: "advanced-sql-mastery-live",
    title: "Advanced SQL Mastery: From Foundations to Real-World Data Engineering",
    description: "Master SQL from basics to advanced concepts including joins, window functions, CTEs, procedures, and integration with Python.",
    fullDescription:
      "This 3-month Advanced SQL Bootcamp is a complete, in-depth program designed to take you from foundational concepts to advanced database mastery. Starting from the basics, the course gradually progresses into complex topics such as joins, subqueries, window functions, CTEs, views, user-defined functions, stored procedures, and triggers. You will also learn how to integrate SQL with Python for real-world data workflows. With a strong focus on hands-on practice, real-world datasets, and structured modules, this course ensures you not only understand SQL but can apply it confidently in professional scenarios. The program concludes with a capstone project and career guidance to help you transition into data-focused roles.",
    thumbnail: "🧠",
    thumbnailBg: "linear-gradient(135deg,#0a0a0a,#1f1f1f,#1a237e)",
    instructor: "Rahul Verma",
    instructorTitle: "Data Scientist | 5+ years experience",
    duration: "12 Weeks",
    lecturesCount: 24,
    timing: "Flexible (based on student availability)",
    startDate: "August 1, 2026",
    enrollmentDeadline: "July 28, 2026",
    enrollmentClosed: false,
    price: 4999,
    originalPrice: 9999,
    discountPercent: 60,
    level: "Advanced",
    tags: [
      "SQL",
      "Advanced SQL",
      "Database",
      "Data Engineering",
      "Window Functions",
      "Stored Procedures",
      "Python Integration"
    ],
    prerequisites: [
      "Basic computer knowledge",
      "Willingness to learn and practice",
      "No prior SQL required (course starts from basics)"
    ],
    whatYouWillLearn: [
      "Complete SQL from basics to advanced",
      "Writing complex and optimized queries",
      "Working with large datasets",
      "Database design and structuring",
      "Advanced analytics using SQL",
      "Integrating SQL with Python",
      "Building real-world data projects",
      "Career-ready SQL skills"
    ],
    whyThisCourse:
      "This course provides a complete journey from beginner to advanced SQL with real-world applications, helping you build deep understanding and practical skills required in data and tech roles.",
    modules: [
      {
        title: "Module 1 – Introduction to Databases",
        lessons: [
          "What is SQL and DBMS",
          "Types of databases",
          "Understanding tables and schemas"
        ],
      },
      {
        title: "Module 2 – Setup & Basic Queries",
        lessons: [
          "Environment setup",
          "SELECT statement",
          "Basic filtering"
        ],
      },
      {
        title: "Module 3 – Filtering & Sorting",
        lessons: [
          "WHERE clause",
          "ORDER BY",
          "LIMIT and DISTINCT"
        ],
      },
      {
        title: "Module 4 – Aggregate Functions",
        lessons: [
          "COUNT, SUM, AVG",
          "MIN, MAX",
          "GROUP BY and HAVING"
        ],
      },
      {
        title: "Module 5 – Data Cleaning",
        lessons: [
          "Handling NULL values",
          "String functions",
          "Data formatting"
        ],
      },
      {
        title: "Module 6 – Intermediate Queries",
        lessons: [
          "AND, OR conditions",
          "Combining filters",
          "Practical queries"
        ],
      },
      {
        title: "Module 7 – Joins (Core)",
        lessons: [
          "INNER JOIN",
          "LEFT JOIN",
          "RIGHT JOIN"
        ],
      },
      {
        title: "Module 8 – Joins (Advanced)",
        lessons: [
          "Multiple joins",
          "Real-world join problems",
          "Data relationships"
        ],
      },
      {
        title: "Module 9 – Subqueries",
        lessons: [
          "Subqueries in WHERE",
          "Subqueries in FROM",
          "Nested queries"
        ],
      },
      {
        title: "Module 10 – CASE Statements",
        lessons: [
          "Conditional logic",
          "CASE WHEN",
          "Business use cases"
        ],
      },
      {
        title: "Module 11 – Window Functions (Basics)",
        lessons: [
          "ROW_NUMBER",
          "RANK",
          "PARTITION BY"
        ],
      },
      {
        title: "Module 12 – Window Functions (Advanced)",
        lessons: [
          "LAG, LEAD",
          "Running totals",
          "Advanced analytics queries"
        ],
      },
      {
        title: "Module 13 – CTE (Common Table Expressions)",
        lessons: [
          "WITH clause",
          "Recursive CTE basics",
          "Improving query readability"
        ],
      },
      {
        title: "Module 14 – Views",
        lessons: [
          "Creating views",
          "Updating views",
          "Use cases"
        ],
      },
      {
        title: "Module 15 – Indexing & Optimization",
        lessons: [
          "Indexes",
          "Query optimization",
          "EXPLAIN basics"
        ],
      },
      {
        title: "Module 16 – User Defined Functions",
        lessons: [
          "Creating functions",
          "Using functions",
          "Real use cases"
        ],
      },
      {
        title: "Module 17 – Stored Procedures",
        lessons: [
          "Creating procedures",
          "Parameters",
          "Execution flow"
        ],
      },
      {
        title: "Module 18 – Triggers",
        lessons: [
          "What are triggers",
          "Creating triggers",
          "Automation use cases"
        ],
      },
      {
        title: "Module 19 – Transactions",
        lessons: [
          "ACID properties",
          "COMMIT and ROLLBACK",
          "Transaction control"
        ],
      },
      {
        title: "Module 20 – Database Design",
        lessons: [
          "Normalization basics",
          "Designing tables",
          "Relationships"
        ],
      },
      {
        title: "Module 21 – SQL with Python",
        lessons: [
          "Connecting SQL with Python",
          "Running queries via Python",
          "Basic data workflows"
        ],
      },
      {
        title: "Module 22 – Real-World Data Workflows",
        lessons: [
          "Handling large datasets",
          "Combining SQL and analysis",
          "End-to-end workflow"
        ],
      },
      {
        title: "Module 23 – Capstone Project",
        lessons: [
          "Real dataset project",
          "Applying all concepts",
          "Project presentation"
        ],
      },
      {
        title: "Module 24 – Career Guidance",
        lessons: [
          "SQL career paths",
          "Resume and portfolio",
          "Interview preparation",
          "Next steps roadmap"
        ],
      }
    ],
    seatsLeft: 15,
  }
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