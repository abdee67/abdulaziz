import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/constants";

/**
 * Vertical social rail.
 *
 * Restored to the original size and prominence (24px icons at `left-6`, 32-unit
 * rule, `z-50`) — the earlier version had shrunk it to 16px pinned at the very
 * edge, which read as almost invisible.
 *
 * It is no longer hidden below a breakpoint: each section reserves room for it
 * via `RAIL_GUTTER`, so the icons can stay this size all the way down to a phone
 * without ever landing on top of the copy.
 */
const SocialSidebar = () => {
  return (
    <div className="fixed left-2.5 top-1/2 z-50 -translate-y-1/2 sm:left-4 md:left-6">
      <div className="flex flex-col items-center space-y-6">
        {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-foreground hover:text-primary",
              "transition-colors duration-300 hover:-translate-y-1"
            )}
            aria-label={label}
          >
            <Icon className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
          </a>
        ))}
        <div className="h-16 w-px bg-border sm:h-24 md:h-32" />
      </div>
    </div>
  );
};

export default SocialSidebar;