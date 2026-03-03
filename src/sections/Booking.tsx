import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/providers/I18nProvider";
import { AnimatedText } from "@/hooks/animations";
import { formulesData, Images } from "@/lib/constants";
import BookingStep1 from "@/components/BookingStep1";
import BookingStep2 from "@/components/BookingStep2";
import BookingStep3 from "@/components/BookingStep3";

gsap.registerPlugin(ScrollTrigger);

interface BookingProps {
  isLoaded: boolean;
  selectedFormulaId?: number | null;
}

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-4 mb-8 lg:mb-12">
      <span className="text-[10px] font-bold tracking-widest">
        {step.toString().padStart(2, "0")} / 03
      </span>
      <div className="h-[1px] flex-1 bg-black/10 relative">
        <div
          className="absolute left-0 h-full bg-black transition-all duration-500"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>
    </div>
  );
}

export function Booking({ isLoaded, selectedFormulaId }: BookingProps) {
  const { locale, t } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);
  const [selectedFormula, setSelectedFormula] = useState<
    (typeof formulesData)[0] | null
  >(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [hasChildren, setHasChildren] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "+212",
    date: "",
    persons: "2",
    childrenCount: "1",
    message: "",
  });

  useEffect(() => {
    if (selectedFormulaId) {
      const formula = formulesData.find((f) => f.id === selectedFormulaId);
      if (formula) {
        setSelectedFormula(formula);
        setStep(2);
      }
    }
  }, [selectedFormulaId]);

  useEffect(() => {
    if (!sectionRef.current || !leftSideRef.current || !rightSideRef.current)
      return;
    const ctx = gsap.context(() => {
      const words = sectionRef.current?.querySelectorAll(
        ".booking-reveal-word",
      );
      if (words?.length) gsap.set(words, { y: "100%", opacity: 0 });
      gsap.set([leftSideRef.current, rightSideRef.current], {
        clipPath: "inset(100% 0% 0% 0%)",
      });
      gsap
        .timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        })
        .to(words, {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: "expo.out",
        })
        .to(
          [leftSideRef.current, rightSideRef.current],
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "expo.inOut",
            stagger: 0.1,
          },
          "-=0.6",
        );
    }, sectionRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="relative z-30 min-h-screen bg-[#E5E5DD] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        <div className="absolute border border-black inset-0 h-full w-full p-10 -z-10">
          <div className="h-full w-full border border-black relative">
            {[
              "-top-4 -left-4",
              "-top-4 -right-4",
              "-bottom-4 -left-4",
              "-bottom-4 -right-4",
            ].map((pos) => (
              <div key={pos} className={`absolute size-4 bg-black ${pos}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[0.7fr_1.3fr] min-h-screen">
        <div
          ref={leftSideRef}
          className="relative h-[25vh] lg:h-full overflow-hidden"
        >
          <img
            src={Images.Booking_Left}
            alt="Hammam"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-4 left-6 lg:bottom-16 lg:left-12 z-10 text-white">
            <h2 className="text-2xl lg:text-6xl font-primary uppercase leading-tight">
              <AnimatedText
                text={t("Booking.reserve")}
                wordClass="booking-reveal-word"
              />
              <br className="hidden lg:block" />
              <AnimatedText
                text={t("Booking.moment")}
                wordClass="booking-reveal-word"
                className="italic font-light text-brand-yellow/90 lg:normal-case"
              />
            </h2>
          </div>
        </div>

        <div
          ref={rightSideRef}
          className="flex flex-col px-6 py-8 lg:px-20 lg:justify-center bg-transparent min-h-full"
        >
          <div className="max-w-2xl w-full mx-auto">
            <StepIndicator step={step} />
            {step === 1 && (
              <BookingStep1
                selectedFormula={selectedFormula}
                setSelectedFormula={setSelectedFormula}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <BookingStep2
                form={form}
                setForm={setForm}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <BookingStep3
                form={form}
                setForm={setForm}
                hasChildren={hasChildren}
                setHasChildren={setHasChildren}
                selectedFormula={selectedFormula}
                selectedTime={selectedTime}
                onBack={() => setStep(2)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
