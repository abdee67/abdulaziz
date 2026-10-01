import { useEffect, useState } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import SocialSidebar from "./SocialSidebar";
import EmailSidebar from "./EmailSidebar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import MobileActionBar from "./MobileActionBar";
import { SECTIONS } from "@/constants";
import { scrollToId } from "@/lib/scroll";

type SectionId = (typeof SECTIONS)[number];

const Portfolio = () => {
  const [currentSection, setCurrentSection] = useState<SectionId>(SECTIONS[0]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        // Pick the last section whose top has passed a probe line a quarter of
        // the way down the viewport. More reliable than the previous
        // "is the probe inside this section's bounds" test, which lost track of
        // the active item whenever a section was shorter than the probe offset.
        const probe = window.scrollY + window.innerHeight * 0.25;

        let active: SectionId = SECTIONS[0];
        for (const id of SECTIONS) {
          const element = document.getElementById(id);
          if (element && element.offsetTop <= probe) active = id;
        }

        setCurrentSection(active);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <Header onSectionClick={scrollToId} />
      <Navigation currentSection={currentSection} onSectionClick={scrollToId} />
      <SocialSidebar />
      <EmailSidebar />

      <main>
        <HeroSection onSectionClick={scrollToId} />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
      <MobileActionBar />
    </div>
  );
};

export default Portfolio;
