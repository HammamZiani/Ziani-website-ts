import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLight } from "@/components/Section";
import { SectionTitle } from "@/components/SectionTitle";
import { useI18n } from "@/providers/I18nProvider";
import { bathsData } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const { t } = useI18n();

  return (
    <SectionLight>
      <div id="baths" className="w-full max-w-screen-2xl">
        <div className="about-title mb-16 lg:mb-24 text-center">
          <SectionTitle
            small={t("About.label")}
            title={t("Baths.our")}
            accent={t("Baths.baths")}
            className="font-primary uppercase tracking-tighter leading-none text-6xl lg:text-7xl"
            smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-black/40"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bathsData.map((item) => (
            <BathCard key={item.num} {...item} t={t} />
          ))}
        </div>
      </div>
    </SectionLight>
  );
}

function BathCard({
  img,
  titleKey,
  descKey,
  num,
  t,
}: {
  img: string;
  titleKey: string;
  descKey: string;
  num: string;
  t: (k: any) => string;
}) {
  return (
    <article className="bath-card group flex h-full flex-col">
      <div className="card-image-wrap relative mb-6 aspect-[3/4] max-h-[550px] overflow-hidden bg-gray-100 shadow-sm">
        <img
          src={img}
          alt={t(titleKey)}
          className="card-image-inner h-full w-full object-cover"
        />
        <span className="absolute left-4 top-4 z-20 font-secondary text-[0.5rem] tracking-[0.3em] text-white mix-blend-difference">
          {num}
        </span>
      </div>
      <div className="flex flex-grow flex-col">
        <h3 className="card-content-item mb-2 font-primary text-2xl uppercase tracking-tighter text-blue-900 lg:text-3xl">
          {t(titleKey)}
        </h3>
        <p className="card-content-item max-w-[200px] font-secondary text-[0.7rem] uppercase leading-relaxed tracking-[0.15em]">
          {t(descKey)}
        </p>
        <div className="card-content-item relative mt-6 h-px w-full overflow-hidden bg-blue-900/10">
          <div className="absolute inset-0 -translate-x-full bg-brand-yellow transition-transform duration-700 ease-in-out lg:group-hover:translate-x-0" />
        </div>
      </div>
    </article>
  );
}
