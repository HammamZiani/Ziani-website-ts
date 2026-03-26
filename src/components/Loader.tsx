import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "@/assets/images/logo.webp";

gsap.registerPlugin(useGSAP);

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const uiItemsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!counterRef.current) return;

      // Lock scrolling
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const progressObj = { value: 0 };
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Fade in Logo and Counter
      tl.from(uiItemsRef.current, {
        y: 32,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
      });

      // 2. Animate the Percentage
      tl.to(progressObj, {
        value: 100,
        duration: 2.2,
        ease: "none",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = `${Math.floor(progressObj.value)}%`;
          }
        },
      });

      // 3. Exit the UI items upwards
      tl.to(
        uiItemsRef.current,
        {
          y: -40,
          opacity: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.in",
        },
        "+=0.2",
      );

      // 4. THE STAIRS ANIMATION (The Reveal)
      tl.to(
        panelsRef.current,
        {
          scaleY: 0,
          transformOrigin: "top", // Change to "bottom" if you want them to slide up
          stagger: 0.1,
          duration: 1,
          ease: "expo.inOut",
          onComplete: () => {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
            onComplete();
          },
        },
        "-=0.3",
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] h-[100dvh] w-screen overflow-hidden select-none touch-none"
    >
      {/* Background Panels (The Stairs) */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) panelsRef.current[i] = el;
            }}
            className="h-full w-full bg-[#0a0a0a] border-r border-white/[0.05] last:border-r-0"
          />
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-white">
        <div
          ref={(el) => {
            if (el) uiItemsRef.current[0] = el;
          }}
          className="mb-10"
        >
          <img
            src={Logo}
            alt="Logo"
            className="h-16 lg:h-20 w-auto object-contain grayscale brightness-150"
          />
        </div>

        <div
          ref={(el) => {
            if (el) uiItemsRef.current[1] = el;
          }}
          className="flex flex-col items-center"
        >
          <div className="overflow-hidden">
            <span
              ref={counterRef}
              className="block text-[15vw] lg:text-[10vw] font-primary leading-none tabular-nums font-bold tracking-tighter italic text-brand-yellow"
            >
              0%
            </span>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-8 h-px bg-white/20" />
            <span className="text-[10px] lg:text-xs uppercase tracking-[0.6em] text-white/50">
              Wellness Rituals
            </span>
            <div className="w-8 h-px bg-white/20" />
          </div>
        </div>

        {/* Bottom Metadata */}
        <div
          ref={(el) => {
            if (el) uiItemsRef.current[2] = el;
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8 opacity-30 whitespace-nowrap lg:gap-12"
        >
          <span className="text-[9px] uppercase tracking-widest">
            Heritage Experience
          </span>
          <span className="text-[9px] uppercase tracking-widest font-bold">
            ●
          </span>
          <span className="text-[9px] uppercase tracking-widest">
            Casablanca
          </span>
        </div>
      </div>
    </div>
  );
}
