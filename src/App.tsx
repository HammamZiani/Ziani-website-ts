import { useState, Suspense, lazy, useEffect } from "react";
import { TopBar } from "@/components/TopBar";
import Loader from "./components/Loader";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const Hero = lazy(() =>
  import("@/sections/Hero").then((m) => ({ default: m.Hero })),
);
const About = lazy(() =>
  import("@/sections/About").then((m) => ({ default: m.About })),
);
const Speciality = lazy(() =>
  import("@/sections/Speciality").then((m) => ({ default: m.Speciality })),
);
const Services = lazy(() =>
  import("@/sections/Services").then((m) => ({ default: m.Services })),
);
const Formules = lazy(() =>
  import("@/sections/Formules").then((m) => ({ default: m.Formules })),
);
const BeautyCenter = lazy(() =>
  import("@/sections/BeautyCenter").then((m) => ({ default: m.BeautyCenter })),
);
const Gallery = lazy(() =>
  import("@/sections/Gallery").then((m) => ({ default: m.Gallery })),
);
const Booking = lazy(() =>
  import("@/sections/Booking").then((m) => ({ default: m.Booking })),
);

export const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.registerPlugin(ScrollTrigger);

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFormulaId, setSelectedFormulaId] = useState<number | null>(
    null,
  );

  const reloadLoader = () => setIsLoading(true);

  useEffect(() => {
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (isLoading) document.body.classList.add("loading");
    else document.body.classList.remove("loading");

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        window.location.reload();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove("loading");
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <main className="select-none relative">
        <TopBar onLanguageChange={reloadLoader} />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Hero isLoaded={!isLoading} />
          <About />
          <Speciality />
          <Services />
          <Formules
            onSelectFormula={(id) => {
              setSelectedFormulaId(id);
              lenis.scrollTo("#booking", { offset: -100 });
            }}
          />
          <BeautyCenter />
          <Gallery />
          <Booking
            isLoaded={!isLoading}
            selectedFormulaId={selectedFormulaId}
          />
        </Suspense>
      </main>
    </>
  );
}
