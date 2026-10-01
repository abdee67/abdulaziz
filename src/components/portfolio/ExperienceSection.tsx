import { ExternalLink } from "lucide-react";

import { Reveal, FadeInStagger, FadeInItem } from "@/components/animations/Reveal";
import { PORTFOLIO_DATA, type WorkExperience } from "@/data/portfolio-data";
import { RAIL_GUTTER } from "@/constants";

/**
 * Work history.
 *
 * Reads straight from `PORTFOLIO_DATA.experience`, which is mirrored from the CV,
 * so the section cannot show stale or borrowed roles.
 */
const dateRange = ({ start, end }: WorkExperience) =>
  `${start} — ${end ?? "Present"}`;

const ExperienceSection = () => {
  const experiences = PORTFOLIO_DATA.experience;

  return (
    <section id="experience" className={`py-24 ${RAIL_GUTTER}`}>
      <div className="container mx-auto max-w-3xl">
        <Reveal>
          <h2 className="section-title text-center mb-16">Experience</h2>
        </Reveal>

        <FadeInStagger className="space-y-8">
          {experiences.map((exp) => (
            <FadeInItem key={`${exp.company}-${exp.title}`}>
              <div className="neobrutalist-card p-6 md:p-8 transition-all">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {exp.title}
                    </h3>
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-bold text-lg inline-flex items-center gap-2 transition-colors hover:underline"
                    >
                      {exp.company}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                  <span className="stat-badge shrink-0">{dateRange(exp)}</span>
                </div>

                {exp.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {exp.badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-none border border-border px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-foreground/70"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                <ul className="space-y-3">
                  {exp.description.map((item) => (
                    <li key={item} className="flex items-start">
                      <div className="w-2 h-2 bg-primary mr-3 mt-2 flex-shrink-0 rotate-45" />
                      <span className="text-foreground/80 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
};

export default ExperienceSection;
