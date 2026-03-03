import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Section } from "@/components/Section";
import { SectionTitle } from "@/components/SectionTitle";
import { AnimatedText } from "@/hooks/animations";
import { useI18n } from "@/providers/I18nProvider";
import { galleryImages, Images } from "@/lib/constants";

export function Gallery() {
  const { t } = useI18n();

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [Autoplay({ delay: 3000, stopOnInteraction: false, playOnInit: true })],
  );

  return (
    <Section bgImage={Images.Hero_Bg}>
      <section
        id="gallery"
        className="relative h-screen w-full overflow-hidden flex flex-col justify-center gap-20"
      >
        <div className="z-20 text-center">
          <SectionTitle
            small={
              <AnimatedText
                text={t("Gallery.label")}
                wordClass="gallery-reveal-word"
              />
            }
            title={
              <AnimatedText
                text={t("SectionTitle.our")}
                wordClass="gallery-reveal-word"
              />
            }
            accent={
              <AnimatedText
                text={t("SectionTitle.gallery")}
                wordClass="gallery-reveal-word"
              />
            }
            className="font-primary uppercase leading-tight text-white text-6xl lg:text-7xl"
            smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-brand-yellow"
            smallDevClass="justify-center"
          />
        </div>

        <div
          className="relative z-10 w-full overflow-hidden cursor-grab active:cursor-grabbing"
          ref={emblaRef}
        >
          <div className="flex">
            {galleryImages.map((item) => (
              <div
                key={item.id}
                className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_22%] min-w-0 px-4"
              >
                <div className="gallery-card-reveal group relative aspect-3/4 overflow-hidden transition-all duration-700 ease-out">
                  <div className="absolute inset-0 z-10 border-0 group-hover:border-16 border-[#1e3a8a]/40 transition-all duration-500 ease-out pointer-events-none" />
                  <div className="absolute inset-0 z-20 group-hover:opacity-100 border border-[#C6A75E]/50 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_50px_rgba(198,167,94,0.2)]" />
                  <img
                    src={item.src}
                    alt=""
                    className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 z-30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-linear-to-t from-black/80 to-transparent">
                    <p className="text-[#C6A75E] text-[0.5rem] tracking-widest uppercase font-bold">
                      Ziani — 0{item.id}
                    </p>
                    <div className="h-px w-0 group-hover:w-12 bg-[#C6A75E] transition-all duration-700 mt-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gallery-bottom-ui relative z-10 px-6 md:px-12 lg:px-20 mt-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-white/20 text-[0.6rem] tracking-[0.5em] uppercase">
              {t("Gallery.scroll")}
            </span>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-[#1e3a8a] animate-pulse" />
              <div className="w-1 h-1 rounded-full bg-[#C6A75E]" />
              <div className="w-1 h-1 rounded-full bg-[#1e3a8a] animate-pulse" />
            </div>
          </div>
          <div className="text-brand-yellow font-primary italic text-xl">
            {t("Gallery.heritage")}
          </div>
        </div>
      </section>
    </Section>
  );
}
