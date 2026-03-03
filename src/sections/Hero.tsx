import { Section } from "@/components/Section";
import { AnimatedText } from "@/hooks/animations";
import { Certificate } from "@/components/Certificate";
import { useI18n } from "@/providers/I18nProvider";
import { Images } from "@/lib/constants";
import { lenis } from "@/App";

interface HeroProps {
  isLoaded: boolean;
}

export function Hero({ isLoaded }: HeroProps) {
  const { t } = useI18n();

  const navItems = [
    { key: "Navigation.home", id: "home" },
    { key: "Navigation.baths", id: "baths" },
    { key: "Navigation.specialty", id: "specialty" },
    { key: "Navigation.services", id: "services" },
    { key: "Navigation.formulas", id: "formulas" },
    { key: "Navigation.salon", id: "salon" },
    { key: "Navigation.gallery", id: "gallery" },
    { key: "Navigation.booking", id: "booking" },
  ];

  return (
    <Section bgImage={Images.Hero_Bg}>
      <section
        id="home"
        className="relative flex min-h-screen w-full flex-col overflow-hidden"
      >
        <header className="absolute top-6 left-1/2 z-50 w-full max-w-400 -translate-x-1/2 px-6 lg:top-10 lg:px-12">
          <div className="text-center">
            <img src="/logo.webp" alt="Logo" className="mx-auto h-24" />
          </div>
          <nav className="mt-6 hidden lg:block">
            <ul className="flex justify-center gap-8 font-secondary text-[0.85rem] uppercase tracking-wide">
              {navItems.map((item) => (
                <li
                  key={item.key}
                  className="group relative cursor-pointer transition-all hover:text-white"
                  onClick={() =>
                    lenis.scrollTo(`#${item.id}`, { offset: -100 })
                  }
                >
                  {t(item.key)}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-yellow transition-all duration-300 group-hover:w-full" />
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="grid grow grid-cols-1 gap-12 px-6 py-32 md:py-36 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20 lg:px-16 xl:px-24 lg:mt-8">
          <div className="lg:col-start-1">
            <div className="flex flex-col justify-center space-y-10">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-brand-yellow" />
                <span className="text-[0.65rem] uppercase tracking-[0.5em] text-brand-yellow">
                  {t("Hero.founded")}
                </span>
              </div>
              <h1 className="font-primary text-4xl uppercase leading-[0.92] tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-[4vw]">
                <AnimatedText text={t("Hero.h1.part1")} />
                <br />
                <span className="font-light text-brand-yellow">
                  <AnimatedText text={t("Hero.h1.part2")} />
                </span>
                <AnimatedText text={t("Hero.h1.part3")} />
              </h1>
              <p className="max-w-2xl font-primary text-base uppercase leading-relaxed tracking-wide text-white/90 sm:text-lg lg:text-[1.05vw]">
                <AnimatedText text={t("Hero.tagline")} />
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center lg:col-start-2 lg:row-span-2 lg:justify-end">
            <div className="relative aspect-4/5 w-full max-w-90 sm:max-w-120 md:max-w-137.5 lg:max-w-none lg:w-[92%] xl:w-[88%]">
              <div className="relative h-full w-full overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.85)]">
                <img
                  src={Images.Hero_Right}
                  alt="Hammam Ziani"
                  className="h-full w-full object-cover transition-all duration-[3s] ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between md:justify-start gap-4 lg:gap-10 lg:col-start-1 hero-certificates">
            <Certificate
              topTitle="Excellence"
              bottomTitle="Tripadvisor"
              label="tripadvisor"
              href="https://www.tripadvisor.com/Attraction_Review-g293732-d2192796-Reviews-Hammam_Ziani-Casablanca_Casablanca_Settat.html"
            />
            <Certificate
              bottomTitle="Google"
              label="google"
              href="https://www.google.com.ng/travel/entity/key/ChgIhvSBi4mJ0_dxGgwvZy8xczA0OXM3NV8QBA/reviews?utm_campaign=sharing&utm_medium=link&utm_source=htls&ts=CAESABoECgIaACoECgAaAA"
            />
          </div>
        </main>
      </section>
    </Section>
  );
}
