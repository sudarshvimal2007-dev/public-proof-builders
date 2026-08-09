/**
 * Centralised ABTalks mock data. Everything the UI renders comes from here.
 */

export type SubmissionState = "submitted" | "pending";

export const student = {
  name: "Avichal",
  firstName: "Avichal",
  handle: "@avichal",
  role: "Frontend Developer",
  college: "VIT Bhopal",
  initials: "AV",
  currentDay: 1,
  totalDays: 60,
  streak: 0,
  bestStreak: 18,
  xp: 1450,
  projects: 38,
  commits: 76,
  posts: 34,
  rank: 127,
  nextRank: 126,
  daysToNextRank: 3,
  metrics: [
    { label: "Consistency", value: 91 },
    { label: "Building", value: 84 },
    { label: "Public Proof", value: 93 },
  ],
};

export const platformStats = [
  { label: "Students", value: 12482, suffix: "+" },
  { label: "Commits", value: 847291, suffix: "+" },
  { label: "LinkedIn Posts", value: 91402, suffix: "+" },
];

export const todayStats = [
  { label: "commits", value: 8241, drift: 3 },
  { label: "LinkedIn posts", value: 1934, drift: 1 },
  { label: "students active", value: 3421, drift: 2 },
];

export const heroPhrases = [
  "Publicly.",
  "Daily.",
  "Consistently.",
  "Your Proof.",
  "Your Edge.",
  "Something New.",
];

export const whyCards = [
  {
    icon: "Share2",
    title: "Learn in Public",
    body: "Turn your daily learning into a visible journey recruiters and peers can actually follow.",
    tag: "Visibility",
  },
  {
    icon: "Briefcase",
    title: "Build Your Reputation",
    body: "Show recruiters what you actually build, not just what is written on your resume.",
    tag: "Credibility",
  },
  {
    icon: "Flame",
    title: "Stay Consistent",
    body: "Streaks, milestones, and achievements make showing up every single day easier.",
    tag: "Momentum",
  },
];

export const journeySteps = [
  {
    num: "01",
    title: "Learn",
    icon: "Target",
    body: "Every morning you get one focused task built around a real skill — no 40-hour course backlog.",
  },
  {
    num: "02",
    title: "Build",
    icon: "Code2",
    body: "You ship something small and real. A component, a feature, a fix, a mini-project.",
  },
  {
    num: "03",
    title: "Prove",
    icon: "GitBranch",
    body: "You commit the work to GitHub and attach the commit as proof for the day.",
  },
  {
    num: "04",
    title: "Share",
    icon: "Linkedin",
    body: "You post your progress on LinkedIn. Day by day it becomes a public learning record.",
  },
];

export const milestones = [
  { day: 1, label: "Start" },
  { day: 10, label: "Habit" },
  { day: 20, label: "Rhythm" },
  { day: 30, label: "Halfway" },
  { day: 60, label: "Proof" },
];

export type Achievement = {
  id: string;
  emoji: string;
  title: string;
  meaning: string;
  requirement: string;
  unlocked: boolean;
  progress?: number;
};

export const achievements: Achievement[] = [
  {
    id: "first-commit",
    emoji: "🌱",
    title: "First Commit",
    requirement: "Complete Day 1",
    meaning: "You stopped planning and started shipping.",
    unlocked: true,
  },
  {
    id: "consistency-starter",
    emoji: "🔥",
    title: "Consistency Starter",
    requirement: "Maintain a 7-day streak",
    meaning: "A week of showing up — the habit is forming.",
    unlocked: true,
  },
  {
    id: "open-source",
    emoji: "🐙",
    title: "Open Source",
    requirement: "Reach 50 GitHub contributions",
    meaning: "Your work lives in public repositories, not local folders.",
    unlocked: true,
  },
  {
    id: "builder-in-public",
    emoji: "📣",
    title: "Builder in Public",
    requirement: "Post 25 public updates",
    meaning: "You can explain your work, not just write it.",
    unlocked: true,
  },
  {
    id: "unstoppable",
    emoji: "⚡",
    title: "Unstoppable Builder",
    requirement: "Maintain a 30-day streak",
    meaning: "Proof that consistency survives busy weeks.",
    unlocked: false,
    progress: 40,
  },
  {
    id: "halfway-hero",
    emoji: "🏆",
    title: "Halfway Hero",
    requirement: "Complete Day 30",
    meaning: "Half a challenge of evidence behind your name.",
    unlocked: false,
    progress: 40,
  },
  {
    id: "sixty-day-builder",
    emoji: "🚀",
    title: "60-Day Builder",
    requirement: "Complete the full challenge",
    meaning: "60 days of documented work — the strongest signal you can send.",
    unlocked: false,
    progress: 20,
  },
];

export const leaderboard = [
  { rank: 1, name: "Aarav", streak: 47, college: "IIT Kanpur", delta: 0 },
  { rank: 2, name: "Riya", streak: 44, college: "NIT Trichy", delta: 1 },
  { rank: 3, name: "Aditya", streak: 41, college: "BITS Pilani", delta: -1 },
  { rank: 4, name: "Kavya", streak: 39, college: "VIT Vellore", delta: 2 },
  { rank: 5, name: "Ishan", streak: 37, college: "IIIT Hyderabad", delta: 0 },
];

export const testimonials = [
  {
    name: "Sneha R.",
    role: "3rd year CSE, Pune",
    quote:
      "I had four unfinished courses and nothing to show. After 30 days on ABTalks I had 30 commits and people from my college actually messaging me about my posts.",
  },
  {
    name: "Rohit K.",
    role: "Final year IT, Hyderabad",
    quote:
      "My interviewer opened my LinkedIn instead of my resume and asked about Day 22. That conversation got me the internship.",
  },
  {
    name: "Meher S.",
    role: "2nd year ECE, Chennai",
    quote:
      "The streak is the only reason I still code on exam weeks. Even 40 minutes counts, and the day gets recorded.",
  },
  {
    name: "Arjun D.",
    role: "3rd year CSE, Indore",
    quote:
      "Small daily tasks removed the pressure of picking a big project. I just built what the day asked for and it added up.",
  },
  {
    name: "Nikita B.",
    role: "Final year CSE, Jaipur",
    quote:
      "Writing a post every day made me better at explaining my work. That helped in interviews more than DSA drilling did.",
  },
];

export const todayTask = {
  day: 1,
  title: "Build a Responsive Developer Portfolio Hero",
  summary:
    "Design and build a portfolio hero section that works at 390px and scales cleanly to desktop. It should introduce you, state what you build, and include one clear call to action.",
  description: [
    "Create a hero section for your own developer portfolio. Start mobile-first: a strong headline, one line about what you build, and a single primary action.",
    "Then scale it up to desktop with a deliberate layout — not a stretched mobile view. Pay attention to type scale, spacing rhythm, and contrast.",
  ],
  difficulty: "Intermediate",
  time: "60–90 min",
  xp: 50,
  skills: ["HTML", "CSS", "Flexbox", "Responsive Design", "Typography"],
  requirements: [
    { id: "r1", label: "Responsive at 390px with no horizontal overflow", done: true },
    { id: "r2", label: "Deliberate desktop layout above 1024px", done: true },
    { id: "r3", label: "Hero section with headline and one-line intro", done: true },
    { id: "r4", label: "One primary CTA with a hover and focus state", done: false },
    { id: "r5", label: "Clean typographic hierarchy (max 2 families)", done: false },
    { id: "r6", label: "Text contrast passes AA", done: false },
  ],
};

export const submission = {
  github: "submitted" as SubmissionState,
  linkedin: "pending" as SubmissionState,
  repoUrl: "https://github.com/avichal/portfolio-hero",
  commitUrl: "https://github.com/avichal/portfolio-hero/commit/8f2c41a",
};

export const activity: number[] = [
  3, 2, 4, 1, 3, 5, 2, 4, 3, 1, 2, 4, 5, 3, 2, 0, 3, 4, 2, 5, 3, 1, 2, 4, 3, 5, 2, 3, 4, 1, 2, 3, 5,
  4, 2, 3, 1, 4, 3, 2,
];

export const dashboardStates = [
  {
    id: "first-day",
    label: "Day 1",
    hint: "First day",
  },
  {
    id: "active",
    label: "Day 12",
    hint: "Active streak",
  },
  {
    id: "missed",
    label: "Missed day",
    hint: "Streak reset",
  },
  {
    id: "empty",
    label: "New profile",
    hint: "Onboarding",
  },
] as const;

export type DashboardStateId = (typeof dashboardStates)[number]["id"];
