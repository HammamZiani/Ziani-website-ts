import { useMemo } from "react";

import { SectionTitle } from "@/components/SectionTitle";
import { AnimatedText } from "@/hooks/animations";
import { useI18n } from "@/providers/I18nProvider";
import { Images } from "@/lib/constants";

export function BeautyCenter() {
  const { locale, t } = useI18n();

  const services = useMemo(() => t("Beauty.tags" as any).split(","), [t]);

  return (
    <section
      id="salon"
      className="relative z-30 bg-[#E5E5DD] px-6 py-20 md:px-12 md:py-28 lg:px-24 lg:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 hidden sm:block">
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

      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-24">
          <div className="order-2 w-full lg:order-1 lg:w-1/2">
            <SectionTitle
              small={
                <AnimatedText
                  text={t("Beauty.label")}
                  wordClass="beauty-reveal-word"
                />
              }
              title={
                <AnimatedText
                  text={t("Beauty.title")}
                  wordClass="beauty-reveal-word"
                />
              }
              accent={
                <AnimatedText
                  text={t("Beauty.titleSpan")}
                  wordClass="beauty-reveal-word"
                />
              }
              className="mb-6 font-primary uppercase leading-[0.95] text-6xl lg:text-7xl"
              smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-black/40"
            />
            <div className="max-w-lg space-y-6">
              <p className="beauty-ui-fade text-sm leading-relaxed tracking-wide text-[#1a1a1a]/70 md:text-base uppercase">
                {t("Beauty.description")}
              </p>
              <div className="beauty-ui-fade flex flex-wrap gap-x-4 gap-y-2">
                {services.map((service) => (
                  <span
                    key={service}
                    className="border-r border-black/10 pr-4 text-[0.6rem] uppercase tracking-[0.2em] text-[#1a1a1a]/40 last:border-none"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative order-1 w-full lg:order-2 lg:w-1/2">
            <div className="beauty-ui-fade absolute -top-4 -left-4 hidden h-full w-full border border-brand-yellow/30 md:block lg:-top-6 lg:-left-6" />
            <div className="beauty-image-wrap relative z-10 aspect-[4/5] overflow-hidden bg-gray-50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
              <div className="group relative h-full w-full overflow-hidden">
                <img
                  src={Images.Salon}
                  alt="Centre de Beauté Ziani"
                  className="beauty-image-inner h-full w-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 transition-colors duration-700 group-hover:bg-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
