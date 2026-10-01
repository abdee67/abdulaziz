import { cn } from "@/lib/utils";
import Monogram from "@/components/brand/Monogram";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Navbar identity: the AM monogram from `public/logo.png`.
 *
 * The previous mark was the template author's own logo (two angled strokes and a
 * diamond). This is the real brand asset, rendered through the shared `Monogram`
 * component so the header mark and the footer mark cannot drift apart.
 *
 * The PNG is transparent outside its circle, so no rounding or ring is applied —
 * both only added artifacts around artwork that is already a shape.
 */
const Logo = ({ className, size = "md" }: LogoProps) => {
  const markSize = {
    sm: "h-10 w-10",
    md: "h-12 w-12",
    lg: "h-14 w-14",
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Monogram
        className={cn("shrink-0", markSize[size])}
        label="Abdulaziz Muhammed"
      />
    </div>
  );
};

export default Logo;