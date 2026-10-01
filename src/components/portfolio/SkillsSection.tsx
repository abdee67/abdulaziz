import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  SiAndroidstudio,
  SiDart,
  SiFastlane,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiSqlite,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import {
  Blocks,
  Boxes,
  Cloud,
  CreditCard,
  Layers,
  Network,
  Plug,
  RefreshCcw,
  Route,
  ShieldCheck,
  Terminal,
  Workflow,
} from "lucide-react";
import { Reveal, FadeInStagger, FadeInItem } from "@/components/animations/Reveal";
import { useTheme } from "@/contexts/ThemeContext";
import DotGrid from "@/components/animations/DotGrid";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { RAIL_GUTTER } from "@/constants";

type IconComponent = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

// Official brand colours, so each technology is recognisable at a glance.
const BRAND_COLORS: Record<string, string> = {
  Flutter: "#54C5F8",
  Dart: "#00B4AB",
  React: "#61DAFB",
  "Next.js": "#FFFFFF",
  TypeScript: "#3178C6",
  "Tailwind CSS": "#38BDF8",
  Figma: "#F24E1E",
  Supabase: "#3ECF8E",
  PostgreSQL: "#4169E1",
  MySQL: "#4479A1",
  SQLite: "#003B57",
  Firebase: "#FFCA28",
  "Node.js": "#5FA04E",
  NestJS: "#E0234E",
  Java: "#F89820",
  Git: "#F05032",
  GitHub: "#FFFFFF",
  "GitHub Actions": "#2088FF",
  Fastlane: "#00F200",
  Postman: "#FF6C37",
  "Android Studio": "#3DDC84",
  Stripe: "#635BFF",
};

// Marks that are white/near-white. These inherit `currentColor` so they stay
// visible on both the dark and the light theme.
const MONOCHROME_BRANDS = new Set(["GitHub", "Next.js"]);

// Tools with no brand mark get a Lucide icon that describes what they do.
const SKILL_ICONS: Record<string, IconComponent> = {
  Flutter: SiFlutter,
  Dart: SiDart,
  "BLoC / Cubit": Blocks,
  Riverpod: Boxes,
  "Clean Architecture": Layers,
  go_router: Route,
  get_it: Plug,
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  Figma: SiFigma,

  Supabase: SiSupabase,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  SQLite: SiSqlite,
  Firebase: SiFirebase,
  "Node.js": SiNodedotjs,
  NestJS: SiNestjs,
  Java: SiOpenjdk,
  "Row Level Security": ShieldCheck,
  "RPC / SQL Functions": Terminal,
  "Edge Functions": Cloud,
  "REST APIs": Network,

  Git: SiGit,
  GitHub: SiGithub,
  "GitHub Actions": SiGithubactions,
  Fastlane: SiFastlane,
  "CI/CD": Workflow,
  Postman: SiPostman,
  "Android Studio": SiAndroidstudio,
  Stripe: SiStripe,
  Chapa: CreditCard,
  "Offline Sync": RefreshCcw,
};

const SkillsSection = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState(
    PORTFOLIO_DATA.skillCategories[0].name
  );

  const active = PORTFOLIO_DATA.skillCategories.find((c) => c.name === activeCategory);

  return (
    <section id="skills" className={`py-24 ${RAIL_GUTTER} relative`}>
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <h2 className="section-title text-center">Skills</h2>
        </Reveal>

        <Reveal>
          <div className="skills-shell mt-16 p-6 md:p-8 relative overflow-hidden bg-background border border-border">
            <div className="absolute inset-0 bg-background backdrop-blur-[1px] z-0" />
            <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.15]">
              <DotGrid
                className="w-full h-full p-0"
                dotSize={4.5}
                gap={16}
                baseColor="#e8557a"
                activeColor={theme === "light" ? "#c4395e" : "#f07090"}
                proximity={120}
                shockRadius={250}
                shockStrength={5}
                resistance={750}
                returnDuration={1.5}
              />
            </div>

            <div className="relative z-[2] flex flex-col md:flex-row gap-8">
              {/* Category selector */}
              <div
                role="group"
                aria-label="Filter skills by category"
                className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 shrink-0"
              >
                {PORTFOLIO_DATA.skillCategories.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    aria-pressed={activeCategory === cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={cn(
                      "shrink-0 border-2 px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all",
                      activeCategory === cat.name
                        ? "bg-primary text-primary-foreground border-primary translate-y-0.5"
                        : "bg-card border-border hover:translate-y-[-2px] shadow-brutal"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Skill grid */}
              <div className="flex-1">
                <FadeInStagger key={activeCategory} className="flex flex-wrap gap-4">
                  {active?.items.map((skillName) => {
                    const Icon = SKILL_ICONS[skillName];
                    if (!Icon) return null;

                    const isMonochrome = MONOCHROME_BRANDS.has(skillName);

                    return (
                      <FadeInItem key={skillName} className="flex-shrink-0">
                        <div
                          className={cn(
                            "p-4 border-2 border-border bg-card flex flex-col items-center gap-2",
                            "transition-all duration-300 hover:translate-y-[-4px] hover:shadow-brutal hover:border-primary"
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-12 w-12 items-center justify-center border",
                              isMonochrome ? "icon-dark-bg" : "bg-white/5 border-white/10"
                            )}
                          >
                            <Icon
                              className="h-6 w-6"
                              style={
                                isMonochrome ? undefined : { color: BRAND_COLORS[skillName] }
                              }
                            />
                          </div>
                          <span className="text-center text-xs font-bold uppercase tracking-tight text-foreground">
                            {skillName}
                          </span>
                        </div>
                      </FadeInItem>
                    );
                  })}
                </FadeInStagger>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SkillsSection;

