import { EMAIL } from "@/constants";

/**
 * Vertical email rail.
 *
 * Matches the original: `bottom-8`, a 20-unit rule, `z-40`, mono + tracking, with
 * `space-y-6` between the address and the rule.
 *
 * Changes from the original: the address is Abdulaziz's rather than the previous
 * author's, `text-md` (not a real Tailwind class — it did nothing) is replaced by
 * real sizes, and on phones the rail lifts to `bottom-24` so it clears the fixed
 * mobile action bar.
 *
 * Like the social rail it is never hidden; sections reserve room for it through
 * `RAIL_GUTTER`.
 */
const EmailSidebar = () => {
  return (
    <div className="fixed bottom-24 right-2.5 z-40 sm:right-4 md:bottom-8 md:right-6 lg:right-8">
      <div className="flex flex-col items-center space-y-6">
        <a
          href={`mailto:${EMAIL}`}
          className="font-mono text-xs tracking-wider text-muted-foreground transition-colors duration-300 hover:text-primary md:text-sm"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          {EMAIL}
        </a>
        <div className="h-20 w-px bg-border" />
      </div>
    </div>
  );
};

export default EmailSidebar;
