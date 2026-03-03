import { useI18n } from "@/providers/I18nProvider"
import { Button } from "@/components/Button"
import { formulesData } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface Step1Props {
  selectedFormula: any
  setSelectedFormula: (f: any) => void
  onNext: () => void
}

export default function BookingStep1({ selectedFormula, setSelectedFormula, onNext }: Step1Props) {
  const { t, locale } = useI18n()
  const currentLocale = (locale as "fr" | "en") || "fr"

  return (
    <div className="space-y-6">
      <h4 className="text-2xl lg:text-4xl font-primary uppercase">{t("Booking.package")}</h4>
      <div className="grid gap-3 max-h-[40vh] lg:max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
        {formulesData.map((pkg) => (
          <button key={pkg.id} onClick={() => setSelectedFormula(pkg)}
            className={cn("flex items-center justify-between p-5 border transition-all duration-300", selectedFormula?.id === pkg.id ? "border-black bg-black text-white" : "border-black/10 bg-transparent hover:border-black")}>
            <span className="text-[10px] uppercase tracking-widest font-bold text-left">{pkg.name[currentLocale]}</span>
            <span className="font-primary text-md lg:text-lg">{pkg.price} MAD</span>
          </button>
        ))}
      </div>
      <Button variant={selectedFormula ? "solid" : "outline"} disabled={!selectedFormula} onClick={onNext}>{t("Booking.continue")}</Button>
    </div>
  )
}
