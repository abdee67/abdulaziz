import { useState, useEffect } from "react";
import { Reveal, FadeInStagger, FadeInItem } from "@/components/animations/Reveal";
import { SOCIAL_LINKS, EMAIL, NAV_ITEMS, RAIL_GUTTER } from "@/constants";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { Copy, Check, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FooterCrystal } from "@/components/footer/FooterCrystal";
import Monogram from "@/components/brand/Monogram";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: PORTFOLIO_DATA.timezone,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="relative mt-32 overflow-hidden bg-background pt-24 pb-10">
      {/* Ambient glow — primary in both themes; secondary wash dark-only */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/10 blur-[100px] pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-48 bg-secondary/5 blur-[120px] pointer-events-none hidden dark:block"
        aria-hidden
      />

      <div className={`container mx-auto max-w-7xl ${RAIL_GUTTER} relative z-10`}>
        {/* Main Content Grid: 3 columns desktop, stack mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">

          {/* Left Column: Brand + Availability */}
          <Reveal>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-foreground tracking-tight mb-2">
                  {PORTFOLIO_DATA.name}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Building mobile and web software with Flutter, Supabase, and React.
                </p>
              </div>

              {/* Availability Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-card border-2 border-primary transition-all duration-200 group hover:shadow-[0_0_12px_hsl(var(--primary)/0.4)] dark:border-secondary dark:hover:shadow-[0_0_12px_hsl(var(--secondary)/0.4)]">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-foreground">
                  Open to opportunities
                </span>
              </div>

              {/* Tech Stack */}
              <p className="text-xs text-muted-foreground tracking-wide">
                Built with React 18 · TypeScript · Vite · Tailwind CSS 3.4
              </p>
            </div>
          </Reveal>

          {/* Center Column: Quick Navigation */}
          <Reveal delay={0.1}>
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground dark:text-primary">
                Navigate
              </h3>
              <FadeInStagger stagger={0.06}>
                {NAV_ITEMS.map(({ id, label }) => (
                  <FadeInItem key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className="block text-lg text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-x-1 text-left"
                    >
                      {label}
                    </button>
                  </FadeInItem>
                ))}
              </FadeInStagger>
            </div>
          </Reveal>

          {/* Right Column: Contact + Crystal */}
          <Reveal delay={0.2}>
            <div className="space-y-8">
              {/* Crystal Graphic */}
              <div className="flex justify-center lg:justify-end mb-8">
                <div className="relative">
                  <FooterCrystal className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] lg:w-[240px] lg:h-[240px]" />
                  <div className="absolute inset-0 -z-10 blur-xl opacity-30 bg-primary rounded-full scale-75 dark:opacity-20 dark:bg-primary/30" />
                  <div
                    className="absolute inset-0 -z-10 blur-2xl opacity-0 scale-90 bg-secondary rounded-full dark:opacity-25"
                    aria-hidden
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-6 text-center lg:text-right">
                <h3 className="text-3xl font-black text-foreground tracking-tight">
                  Get In Touch
                </h3>

                <button
                  onClick={handleCopyEmail}
                  className="group inline-flex items-center gap-3 text-xl md:text-2xl font-medium text-foreground hover:text-primary transition-all duration-300 hover:shadow-[0_0_16px_hsl(var(--primary)/0.3)] dark:hover:shadow-[0_0_16px_hsl(var(--secondary)/0.35)]"
                >
                  <span>{EMAIL}</span>
                  <div className="relative w-7 h-7 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="w-5 h-5 text-green-500" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Copy className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Social Links */}
        <Reveal delay={0.25}>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-16">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 bg-card border-2 border-primary transition-all duration-200 hover:translate-y-[-2px] hover:shadow-brutal"
                aria-label={label}
              >
                <Icon className="w-5 h-5 text-primary dark:text-secondary" />
                <span className="font-bold text-sm uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Divider */}
        <div className="h-px w-full bg-border mb-8" />

        {/* Bottom Meta Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 animate-pulse" />
              <span>{PORTFOLIO_DATA.location}</span>
              <span className="hidden sm:inline text-border">|</span>
              <span className="font-mono">
                {time} {PORTFOLIO_DATA.timezoneLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* The AM monogram from public/logo.png. No ring or rounding: the PNG
                is transparent outside its circle, so both only added artifacts.
                label="" because the name is already in the credit beside it. */}
            <Monogram className="h-6 w-6 shrink-0" label="" />

            <p className="flex items-center gap-1.5">
              Made with{" "}
              <span className="text-red-500 animate-pulse">❤</span> by{" "}
              {PORTFOLIO_DATA.firstName}
            </p>

            <button
              onClick={scrollToTop}
              className="p-3 bg-card border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:translate-y-[-2px] hover:shadow-brutal group dark:hover:bg-secondary dark:hover:text-secondary-foreground"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
