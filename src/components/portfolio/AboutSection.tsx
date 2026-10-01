import {
  Bike,
  Brain,
  Code2,
  Disc3,
  Download,
  Goal,
  GraduationCap,
  Grid3x3,
  Lightbulb,
  Music,
  Wrench,
} from "lucide-react";
import Lottie from "lottie-react";
import { WiStars } from "react-icons/wi";
import { Link } from "react-router-dom";

import animationData from "../../assets/coder.json";
import { Reveal } from "@/components/animations/Reveal";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { RAIL_GUTTER } from "@/constants";

const AboutSection = () => {
  const interests = [
    {
      icon: Brain,
      label: "Continuous Learning",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Lightbulb,
      label: "Problem Solving",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      icon: Music,
      label: "Music",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      icon: Wrench,
      label: "Building Things",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      icon: Grid3x3,
      label: "Chess",
      color: "text-slate-500",
      bg: "bg-slate-500/10",
    },
    {
      icon: Disc3,
      label: "DJing",
      color: "text-fuchsia-500",
      bg: "bg-fuchsia-500/10",
    },
    {
      icon: Goal,
      label: "Football",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      icon: Bike,
      label: "Cycling",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <section
      id="about"
      className={`min-h-screen py-24 ${RAIL_GUTTER} flex flex-col justify-center`}
    >
      <div className="container mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="section-title mb-4 inline-flex items-center gap-3">
              About Me
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
              {PORTFOLIO_DATA.about}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal delay={0.1} className="md:col-span-2">
            <div className="h-full neobrutalist-card p-8 relative overflow-hidden group bg-card transition-all flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Code2 className="w-6 h-6 text-primary" />
                  Who I Am
                </h3>
                <div className="space-y-4">
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    I'm a{" "}
                    <span className="font-semibold text-foreground">
                      Full Stack &amp; Flutter Developer
                    </span>{" "}
                    based in {PORTFOLIO_DATA.location}, building mobile and web
                    products end to end — from the data model up to the pixel.
                  </p>
                  <p className="text-foreground/70 leading-relaxed">
                    {PORTFOLIO_DATA.summary}
                  </p>
                  <p className="text-foreground/70 leading-relaxed">
                    Day to day that means working across the Flutter client and
                    the Supabase/PostgreSQL layer behind it, shipping
                    production features for Android, iOS, and desktop.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <Link to="/resume">
                  <button className="neobrutalist-button neobrutalist-button-primary px-6 py-2.5 flex items-center gap-2 group">
                    <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                    <span className="relative z-10">View Resume</span>
                  </button>
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-1 md:row-span-2">
            <div className="h-full neobrutalist-card p-0 overflow-hidden relative group bg-background/50 flex flex-col items-center justify-center min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
              <div className="w-full h-full p-6 flex items-center justify-center relative z-10 scale-110 group-hover:scale-125 transition-transform duration-700">
                <Lottie
                  animationData={animationData}
                  loop={true}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="md:col-span-2">
            <div className="h-full neobrutalist-card p-8 relative group transition-all bg-card">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-secondary" />
                Education
              </h3>
              <div
                className={`grid gap-8 ${
                  PORTFOLIO_DATA.education.length > 1 ? "sm:grid-cols-2" : ""
                }`}
              >
                {PORTFOLIO_DATA.education.map((entry) => (
                  <div
                    key={`${entry.school}-${entry.degree}`}
                    className="space-y-2 relative pl-4 border-l-2 border-secondary/20"
                  >
                    <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-none bg-secondary shadow-brutal" />
                    <p className="text-foreground font-semibold">
                      {entry.degree}
                    </p>
                    <p className="text-sm text-foreground/60">{entry.school}</p>
                    <span className="stat-badge text-xs inline-block mt-2">
                      {entry.start} – {entry.end}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4} className="md:col-span-3">
            <div className="neobrutalist-card p-6 sm:p-8 bg-card border border-border transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-3">
                  <WiStars size={24} className="text-primary shrink-0" />
                  Beyond Code
                </h3>
                <span className="text-[10px] sm:text-xs text-foreground/60 tracking-wide uppercase">
                  Interests &amp; Values
                </span>
              </div>

              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {interests.map((interest) => {
                  const Icon = interest.icon;

                  return (
                    <div
                      key={interest.label}
                      className="
                        flex items-center gap-3
                        px-3 py-3 sm:px-4
                        rounded-none
                        border-2 border-border
                        bg-card
                        transition-all duration-300
                        hover:translate-y-[-2px]
                        hover:shadow-brutal
                        hover:border-primary
                      "
                    >
                      <div
                        className={`
                          p-2 rounded-none border border-border
                          ${interest.color} ${interest.bg}
                          transition-all duration-300
                          shrink-0
                        `}
                      >
                        <Icon size={18} />
                      </div>
                      <span
                        className="
                          text-sm font-medium
                          text-foreground/70
                          leading-tight
                          break-words
                        "
                      >
                        {interest.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
