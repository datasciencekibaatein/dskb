import type { Stat, Skill, NavLink } from "@/types";

export const STATS: Stat[] = [
  {
    label: "Students",
    value: 1000,
    suffix: "+",
    description: "Active learners on the platform",
    icon: "👨‍🎓",
  },
  {
    label: "Lectures",
    value: 100,
    suffix: "+",
    description: "Hours of quality content",
    icon: "🎬",
  },
  {
    label: "Success Rate",
    value: 95,
    suffix: "%",
    description: "Students who complete courses",
    icon: "🏆",
  },
  {
    label: "YouTube Views",
    value: 20,
    prefix: "",
    suffix: "K+",
    description: "Views across all tutorials",
    icon: "▶️",
  },
];

export const SKILLS: Skill[] = [
  { name: "Python", level: 98, emoji: "🐍", color: "electric" },
  { name: "Machine Learning", level: 95, emoji: "🤖", color: "teal" },
  { name: "Pandas & NumPy", level: 97, emoji: "🐼", color: "ochre" },
  { name: "SQL", level: 92, emoji: "🗄️", color: "electric" },
  { name: "Power BI", level: 88, emoji: "📊", color: "ochre" },
  { name: "Statistics", level: 90, emoji: "📈", color: "teal" },
  { name: "Deep Learning", level: 85, emoji: "🧠", color: "electric" },
  { name: "Data Visualization", level: 93, emoji: "🎨", color: "ochre" },
];

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Tutorials", href: "#tutorials" },
  { label: "Contact", href: "#contact" },
];

export const TOPICS = [
  "Python",
  "Pandas",
  "NumPy",
  "Machine Learning",
  "Power BI",
  "SQL",
  "Statistics",
  "AI",
] as const;
