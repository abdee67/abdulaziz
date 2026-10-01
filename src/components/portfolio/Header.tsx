import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { NAV_ITEMS } from "@/constants";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Container from "@/components/layout/Container";

interface HeaderProps {
  onSectionClick: (section: string) => void;
}

const Header = ({ onSectionClick }: HeaderProps) => {
  return (
    <header className="fixed top-0 w-full z-40 bg-background">
      <Container>
        <div className="flex items-center justify-between py-4">
          <div className="animate-fade-in">
            <Logo size="lg" />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionClick(item.id)}
                className={cn(
                  "text-foreground hover:text-primary",
                  "transition-colors duration-300 relative group"
                )}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <ThemeToggle />
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Link to="/resume">Resume</Link>
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;