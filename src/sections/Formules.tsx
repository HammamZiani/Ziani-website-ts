import { Section } from "@/components/Section";
import { SectionTitle } from "@/components/SectionTitle";
import { AnimatedText } from "@/hooks/animations";
import { useI18n } from "@/providers/I18nProvider";
import { formulesData, Images } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FormulesProps {
  onSelectFormula?: (id: number) => void;
}

export function Formules({ onSelectFormula }: FormulesProps) {
  const { t, locale } = useI18n();
  const currentLocale = locale as "fr" | "en";

  return (
    <Section bgImage={Images.Hero_Bg}>
      <section
        id="formulas"
        className="relative overflow-hidden px-6 py-24 md:px-12 lg:px-24 lg:py-32"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 text-center md:mb-20 lg:mb-24">
            <SectionTitle
              small={
                <AnimatedText
                  text={t("Formulas.label")}
                  wordClass="formula-reveal-word"
                />
              }
              title={
                <AnimatedText
                  text={t("SectionTitle.our")}
                  wordClass="formula-reveal-word"
                />
              }
              accent={
                <AnimatedText
                  text={t("SectionTitle.formulas")}
                  wordClass="formula-reveal-word"
                />
              }
              className="font-primary uppercase leading-tight text-white text-6xl lg:text-7xl"
              smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-brand-yellow"
              smallDevClass="justify-center"
            />
          </div>
          <div className="flex flex-col gap-10 md:flex-row md:items-stretch md:justify-center lg:gap-8">
            {formulesData.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                locale={currentLocale}
                t={t}
                onSelectFormula={onSelectFormula}
              />
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

function PackageCard({
  pkg,
  locale,
  t,
  onSelectFormula,
}: {
  pkg: any;
  locale: "fr" | "en";
  t: (k: string) => string;
  onSelectFormula?: (id: number) => void;
}) {
  const popular = pkg.isPopular;

  return (
    <div
      className={cn(
        "formula-card-entrance will-change-transform relative flex w-full flex-col border p-8 backdrop-blur-lg transition-all duration-500 bg-[#0a1a2f]/40 group",
        popular
          ? "border-brand-yellow md:-translate-y-6 md:scale-105 z-20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          : "border-white/10",
      )}
    >
      {popular && (
        <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2 bg-brand-yellow px-5 py-1.5 shadow-lg">
          <span className="whitespace-nowrap text-[0.55rem] font-bold uppercase tracking-[0.3em] text-black">
            {t("Formulas.popular")}
          </span>
        </div>
      )}
      <div className="relative z-10 mb-8 text-center md:mb-10">
        <h3 className="mb-3 font-primary text-xl uppercase text-white sm:text-2xl lg:text-3xl">
          {pkg.name[locale]}
        </h3>
        <div
          className="mx-auto mb-6 h-px w-12 transition-all duration-500 group-hover:w-20"
          style={{ backgroundColor: pkg.color }}
        />
        <span className="block font-primary text-3xl tracking-widest text-white sm:text-4xl">
          {pkg.price} DH
        </span>
      </div>
      <div className="relative z-10 grow">
        <ul className="space-y-4">
          {(pkg.descriptions[locale] || []).map((item: string) => (
            <li
              key={item}
              className="flex items-start gap-4 text-[0.68rem] uppercase tracking-[0.15em] leading-relaxed text-white/90 lg:text-[0.75rem]"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-1 flex-shrink-0"
                style={{ color: pkg.color }}
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative z-10 mt-10">
        <button
          onClick={() => onSelectFormula?.(pkg.id)}
          className={cn(
            "w-full cursor-pointer border py-4 text-[0.65rem] uppercase tracking-[0.4em] font-bold transition-all duration-300",
            popular
              ? "bg-brand-yellow text-black border-brand-yellow hover:bg-transparent hover:text-brand-yellow"
              : "border-white/20 text-white hover:border-white",
          )}
        >
          {t("Booking.submit")}
        </button>
      </div>
    </div>
  );
}
