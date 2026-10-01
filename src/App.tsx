import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Resume from "./pages/Resume";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingScreen from "@/components/LoadingScreen";
import CursorAura from "@/components/effects/CursorAura";
import ClickSpark from "@/components/animations/ClickSpark";
import SmoothScroll from "@/components/effects/SmoothScroll";
import { useTheme } from "@/contexts/ThemeContext";
import { refreshScroll } from "@/lib/scroll";

const App = () => {
  const { theme } = useTheme();
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    if (booting) return;

    // The document was scroll-locked behind the intro overlay, so the
    // smooth-scroll engine needs to re-measure once real layout is live.
    const timer = window.setTimeout(refreshScroll, 60);
    return () => window.clearTimeout(timer);
  }, [booting]);

  return (
    <ErrorBoundary>
      <TooltipProvider>
        {booting && <LoadingScreen onDone={() => setBooting(false)} />}
        <Toaster />
        <CursorAura />
        <ClickSpark
          sparkColor={theme === "dark" ? "#fff" : "#000"}
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <SmoothScroll>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SmoothScroll>
          </BrowserRouter>
        </ClickSpark>
      </TooltipProvider>
    </ErrorBoundary>
  );
};

export default App;
