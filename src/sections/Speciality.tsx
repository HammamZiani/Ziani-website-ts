import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Section } from "@/components/Section"
import { SectionTitle } from "@/components/SectionTitle"
import { AnimatedText } from "@/hooks/animations"
import { useI18n } from "@/providers/I18nProvider"
import { Images } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

export function Speciality() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { locale, t } = useI18n()

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const words = sectionRef.current?.querySelectorAll(".spec-reveal-word")
      const border = sectionRef.current?.querySelector(".spec-card-border")
      const overlay = sectionRef.current?.querySelector(".spec-overlay")
      const subtitle = sectionRef.current?.querySelector(".spec-subtitle")
      const body = sectionRef.current?.querySelector(".spec-body")
      const imageWrap = sectionRef.current?.querySelector(".spec-image-wrap")
      const imageInner = sectionRef.current?.querySelector(".spec-image")
      const imageFrame = sectionRef.current?.querySelector(".spec-image-frame")
      const imageLabel = sectionRef.current?.querySelector(".spec-image-label")

      if (!words?.length || !imageWrap || !imageInner) return

      gsap.set(words, { y: "100%", opacity: 0 })
      gsap.set(imageInner, { scale: 1.15 })
      gsap.set(border, { scaleY: 0, transformOrigin: "top" })
      gsap.set([overlay, subtitle, body].filter(Boolean), { opacity: 0, y: 16 })
      gsap.set([imageFrame, imageLabel].filter(Boolean), { opacity: 0 })

      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 65%" } })

      tl.to(words, { y: "0%", opacity: 1, duration: 1, stagger: 0.018, ease: "expo.out" })
        .to(border, { scaleY: 1, duration: 1.2, ease: "power4.inOut" }, "-=0.5")
        .to(overlay, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.9")
        .to([subtitle, body].filter(Boolean), { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }, "-=0.3")
        .fromTo(imageWrap, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "expo.inOut" }, 0.3)
        .to(imageInner, { scale: 1, duration: 2.2, ease: "expo.out" }, 0.3)
        .to(imageFrame, { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5")
        .to(imageLabel, { opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3")
    }, sectionRef)

    return () => ctx.revert()
  }, [locale])

  return (
    <Section bgImage={Images.Hero_Bg}>
      <section id="specialty" ref={sectionRef} className="relative flex min-h-screen w-full flex-col items-center overflow-hidden px-6 py-24 md:px-12 lg:flex-row lg:px-20 lg:py-0">
        <div className="z-20 flex w-full flex-col justify-center lg:w-1/2 lg:pr-16">
          <div className="mb-10">
            <SectionTitle
              small={<AnimatedText text={t("Specialty.label")} wordClass="spec-reveal-word" />}
              title={<AnimatedText text={t("SectionTitle.our")} wordClass="spec-reveal-word" />}
              accent={<AnimatedText text={t("SectionTitle.specialty")} wordClass="spec-reveal-word" />}
              className="font-primary uppercase leading-[0.85] tracking-tighter text-6xl lg:text-7xl"
              smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-brand-yellow"
            />
          </div>
          <div className="relative p-8 md:p-12">
            <div className="spec-card-border absolute bottom-0 left-0 top-0 w-px bg-white/20" />
            <div className="spec-overlay absolute inset-0 -z-10 bg-black/20 backdrop-blur-sm" />
            <div className="spec-corner absolute right-0 top-0 h-8 w-8 border-r border-t border-brand-yellow/50" />
            <p className="spec-subtitle mb-8 font-secondary text-lg uppercase leading-tight tracking-tight text-brand-yellow lg:text-xl">
              {t("Specialty.subtitle")}
            </p>
            <div className="spec-body max-w-lg space-y-6">
              <p className="font-secondary text-sm leading-relaxed tracking-wider uppercase text-white/80 md:text-base">
                {t("Specialty.description")}
              </p>
            </div>
          </div>
        </div>

        <div className="group relative mt-12 h-[50vh] w-full lg:mt-0 lg:h-[75vh] lg:w-1/2">
          <div className="spec-image-frame absolute inset-0 translate-x-4 translate-y-4 border border-brand-yellow/20 transition-transform duration-1000 group-hover:translate-x-0 group-hover:translate-y-0 lg:translate-x-8 lg:translate-y-8" />
          <div className="spec-image-wrap relative h-full w-full overflow-hidden shadow-2xl shadow-black/50">
            <img src={Images.Speciality} alt="Hammam Ziani Art" className="spec-image h-full w-full object-cover transition-all duration-[1500ms] ease-out lg:group-hover:grayscale lg:group-hover:scale-110" />
            <div className="spec-image-label absolute bottom-6 left-6 bg-black/60 px-4 py-2 backdrop-blur-md">
              <span className="text-[0.6rem] uppercase tracking-[0.4em] text-white/50">{t("Specialty.patrimoine")}</span>
            </div>
          </div>
        </div>
      </section>
    </Section>
  )
}
