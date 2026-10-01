// Single source of truth for all personal/portfolio data.
//
// Synced from the CV project (C:\WebApps\cv\src\data\resume-data.ts) so the
// portfolio and the résumé cannot drift apart. Update the CV first, then mirror
// it here.

export interface SocialLink {
  name: string;
  url: string;
  label: string;
}

export interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
}

export interface WorkExperience {
  company: string;
  companyUrl: string;
  title: string;
  start: string;
  end: string | null;
  badges: string[];
  description: string[];
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  /** Optional: several projects are shipped products with no public repo. */
  githubUrl?: string;
  liveUrl?: string;
  /** Label for the live link when it isn't just the project title. */
  liveLabel?: string;
}

export interface PortfolioData {
  name: string;
  firstName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  timezoneLabel: string;
  personalWebsiteUrl: string;
  avatarUrl: string;
  about: string;
  summary: string;
  heroTexts: readonly string[];
  socialLinks: SocialLink[];
  education: Education[];
  experience: WorkExperience[];
  skillCategories: SkillCategory[];
  projects: Project[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  name: "Abdulaziz Muhammed",
  firstName: "Abdulaziz",
  title: "Full Stack & Flutter Developer",
  email: "alaziizz67@gmail.com",
  phone: "+251977764845",
  location: "Addis Abeba, Ethiopia",
  timezone: "Africa/Addis_Ababa",
  timezoneLabel: "EAT",
  personalWebsiteUrl: "https://abdulaziz.dev.vercel.dev",
  avatarUrl: "https://avatars.githubusercontent.com/u/142771187?v=4",

  about: "Full Stack & Flutter Developer building products from the ground up.",

  summary:
    "Full Stack and Flutter Developer with two years of professional experience, building high-performance mobile and web applications. I work mostly in Flutter and Dart on the client, with Supabase and PostgreSQL behind it, and I'm going deeper into TypeScript, Next.js, and backend system design.",

  heroTexts: [
    "Flutter developer, building for mobile first.",
    "Turning ideas into cross-platform apps.",
    "From Addis Abeba, building for the world.",
    "Clean code, smooth UX, every time.",
  ] as const,

  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/abdee67",
      label: "GitHub",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abdulaziz-ibn-muhammed/",
      label: "LinkedIn",
    },
    {
      name: "Telegram",
      url: "https://t.me/ClassNotFound",
      label: "Telegram",
    },
    {
      name: "X",
      url: "https://x.com/Alaziiz_67",
      label: "X (Twitter)",
    },
  ],

  // Grades and exam results are deliberately omitted.
  education: [
    {
      school: "Arba Minch University",
      degree: "Bachelor's Degree in Information Technology",
      start: "2021",
      end: "2024",
    },
  ],

  experience: [
    {
      company: "TechEquations",
      companyUrl: "https://techequations.com/",
      title: "Intermediate Software Developer",
      start: "2024",
      end: null,
      badges: ["Onsite", "Mobile", "Cross-Platform", "Flutter", "Dart", "Android"],
      description: [
        "Building a mobile and desktop application used in day-to-day operations.",
        "Working across the Flutter client and the Supabase/PostgreSQL layer behind it.",
        "Translating product requirements into production-ready features on Android, iOS, and desktop.",
      ],
    },
  ],

  // Merged from the CV (Java, Flutter, Supabase, SQLite, MySQL, PostgreSQL,
  // React/Next.js, TypeScript, Tailwind, Design Systems, System Architecture)
  // plus the related tooling actually used across those projects.
  skillCategories: [
    {
      name: "Mobile & Frontend",
      items: [
        "Flutter",
        "Dart",
        "BLoC / Cubit",
        "Riverpod",
        "Clean Architecture",
        "go_router",
        "get_it",
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Design Systems",
        "Figma",
      ],
    },
    {
      name: "Backend & Data",
      items: [
        "Supabase",
        "PostgreSQL",
        "MySQL",
        "SQLite",
        "Firebase",
        "Node.js",
        "NestJS",
        "Java",
        "Row Level Security",
        "RPC / SQL Functions",
        "Edge Functions",
        "REST APIs",
        "System Architecture",
      ],
    },
    {
      name: "Tools & Delivery",
      items: [
        "Git",
        "GitHub",
        "GitHub Actions",
        "Fastlane",
        "CI/CD",
        "Postman",
        "Android Studio",
        "Stripe",
        "Chapa",
        "Offline Sync",
      ],
    },
  ],

  // Mirrors C:\WebApps\cv\src\data\resume-data.ts — same titles, descriptions and
  // stack. Nothing here is embellished.
  projects: [
    {
      title: "Savvy Lite",
      description:
        "Mobile and desktop Flutter client for Savvy Stock — a lightweight ERP covering inventory, sales and sync. A role-based business app (employee, user, inventory, sales, procurement) built for small and medium businesses.",
      techStack: ["Flutter", "SQLite", "Supabase", "REST API", "Firebase FCM"],
      liveUrl: "https://play.google.com/store/apps/details?id=com.techEquations.savvyLite",
      liveLabel: "Play Store",
    },
    {
      title: "Unity Finance Group",
      description:
        "A mobile-first financial services app built with Flutter, giving cooperative members and external users transparent, accessible finance tools. Members manage savings, request loans, track obligations and apply for membership from a single Android client.",
      techStack: ["Flutter", "Supabase", "PostgreSQL", "REST API"],
      githubUrl: "https://github.com/abdee67/ufg",
    },
    {
      title: "DIR — The Foundation",
      description:
        "A premium single-store clothing e-commerce application for Ethiopia. Pairs a polished customer storefront with a focused operations panel for catalog, stock, order, payment, delivery-cost, media and storefront management.",
      techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "PostgreSQL"],
      liveUrl: "https://dir-the-foundation.vercel.app/",
    },
    {
      title: "URS Beauty",
      description:
        "Customer-facing Flutter app for the UR Beauty platform. Customers discover beauty services, find nearby stylists, book appointments, manage bookings, pay by card, review services and manage their profile.",
      techStack: ["Flutter", "Supabase", "Stripe", "Chapa"],
      githubUrl: "https://github.com/abdee67/URS-beauty",
    },
    {
      title: "UR Stylist",
      description: "The stylist-side app for the UR Beauty platform.",
      techStack: ["Flutter", "Supabase", "Stripe", "Chapa"],
      githubUrl: "https://github.com/abdee67/ur_stylist",
    },
    {
      title: "Outreach",
      description:
        "A feature-rich CRM built with Flutter for managing business outreach, with CSV import/export, dynamic categorisation and a mobile-first interface.",
      techStack: ["Flutter", "AI", "CSV", "SQLite", "Google Maps", "REST API"],
      githubUrl: "https://github.com/abdee67/outreach",
    },
    {
      title: "Savvy Attendance",
      description:
        "A mobile and desktop application that automates employee and student attendance tracking using facial recognition and geolocation verification.",
      techStack: ["Flutter", "AI", "TensorFlow Lite", "SQLite", "REST API"],
      githubUrl:
        "https://github.com/abdee67/Simple-Attendance--Face-Recognition-Attendance-System",
    },
    {
      title: "URS Breaker",
      description:
        "A cross-platform application that converts large ideas into step-by-step actionable plans using Gemini 2.5-Flash.",
      techStack: ["Flutter", "Shadcn UI", "Gemini AI", "SQLite", "REST API"],
      githubUrl: "https://github.com/abdee67/urs_breaker",
    },
    {
      title: "UR Player",
      description:
        "A music player with synced lyrics fetched from an API, saved locally for offline playback.",
      techStack: ["Flutter", "Shared Preferences", "REST API"],
      githubUrl: "https://github.com/abdee67/my_player",
    },
    {
      title: "Oil Site Management System",
      description:
        "Part of a larger system for managing site infrastructure and configuration. Supports rich UI interactions and communicates with a backend API over a relational MySQL database.",
      techStack: ["Flutter", "SQLite", "MySQL", "REST API"],
      githubUrl: "https://github.com/abdee67/Oil-Site-Management-system",
    },
    {
      title: "Mika Creation Studio",
      description:
        "A cinematic service site for a creative studio offering video production, event coverage, brand development and software services. Built around strong motion, video-led storytelling and scroll interactions.",
      techStack: ["React", "Vite", "Tailwind CSS", "GSAP", "React Icons", "React Hook Form"],
      liveUrl: "https://mika-creation.vercel.app/",
    },
    {
      title: "Beauty Vault",
      description:
        "A boutique salon site built for booking and showcase: services, gallery work, testimonials and clear contact paths via WhatsApp and embedded maps, with an animated hero and LocalBusiness schema for SEO.",
      techStack: ["Next.js", "React", "TypeScript"],
      liveUrl: "https://liha-s-beauty.vercel.app/",
    },
    {
      title: "Cord Consultancy",
      description: "A landing page for CORD Nutrition and Health Consultancy.",
      techStack: ["Next.js", "SQLite", "REST API"],
      liveUrl: "https://www.cordconsultancy.com/",
    },
  ],
};
