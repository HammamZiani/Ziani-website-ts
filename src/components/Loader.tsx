import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "@/assets/images/logo.webp";

gsap.registerPlugin(useGSAP);

interface LoaderProps {
  imageUrls: string[];
  onComplete: () => void;
}

export default function Loader({ imageUrls, onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const uiItemsRef = useRef<HTMLDivElement[]>([]);

  const [realProgress, setRealProgress] = useState(0);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);

  // Handle the Image Preloading Logic
  useEffect(() => {
    const allAssets = [Logo, ...imageUrls].filter(Boolean);
    if (allAssets.length === 0) {
      setRealProgress(100);
      return;
    }

    let loadedCount = 0;

    allAssets.forEach((url) => {
      const img = new Image();
      img.src = url;

      const handleImageLoad = () => {
        loadedCount++;
        const percentage = Math.floor((loadedCount / allAssets.length) * 100);
        setRealProgress(percentage);
      };

      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; 
    });
  }, [imageUrls]);

  // Handle GSAP Intro and Progress Animations
  useGSAP(
    () => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const uiTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      uiTimeline.from(uiItemsRef.current, {
        y: 32,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
      });

      const counterVal = { current: 0 };

      progressTweenRef.current = gsap.to(counterVal, {
        current: realProgress,
        duration: 0.5,
        ease: "power1.out",
        paused: true,
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = `${Math.floor(counterVal.current)}%`;
          }
        },
        onComplete: () => {
          // FIX: Check the GSAP object value, not the React state, to avoid stale closures
          if (Math.round(counterVal.current) >= 100) {
            triggerExitSequence();
          }
        },
      });
    },
    { scope: containerRef }
  );

  useEffect(() => {
    if (progressTweenRef.current) {
      progressTweenRef.current.invalidate().vars.current = realProgress;
      progressTweenRef.current.restart();
    }
  }, [realProgress]);

  const triggerExitSequence = () => {
    const exitTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    exitTl.to(
      uiItemsRef.current,
      {
        y: -40,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.in",
      },
      "+=0.2"
    );

    exitTl.to(
      panelsRef.current,
      {
        scaleY: 0,
        transformOrigin: "top",
        stagger: 0.1,
        duration: 1,
        ease: "expo.inOut",
        onComplete: () => {
          document.body.style.overflow = "auto";
          document.documentElement.style.overflow = "auto";
          onComplete();
        },
      },
      "-=0.3"
    );
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] h-[100dvh] w-screen overflow-hidden select-none touch-none"
    >
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