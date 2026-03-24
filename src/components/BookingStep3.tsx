import { useI18n } from "@/providers/I18nProvider"
import { Button } from "@/components/Button"
import { cn } from "@/lib/utils"

function FloatingInput({ label, value, onChange, type = "text", inputMode }: any) {
  return (
    <div className="group relative border-b border-black/10 focus-within:border-black transition-colors">
      <label className="text-[9px] uppercase tracking-widest text-black/40 block mb-1 group-focus-within:text-black">
        {label}
      </label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        inputMode={inputMode} 
        className="w-full bg-transparent outline-none text-xs py-2" 
      />
    </div>
  )
}

interface Step3Props {
  form: any
  setForm: (f: any) => void
  hasChildren: boolean
  setHasChildren: (b: boolean) => void
  selectedFormula: any
  selectedTime: string
  onBack: () => void
}

export default function BookingStep3({ form, setForm, hasChildren, setHasChildren, selectedFormula, selectedTime, onBack }: Step3Props) {
  const { t, locale } = useI18n()
  const currentLocale = (locale as "fr" | "en") || "fr"

  // Helper to get translated text for the final message
  const getTypeLabel = () => {
    if (form.gender === "man") return t("Booking.typeMan");
    if (form.gender === "woman") return t("Booking.typeWoman");
    if (form.gender === "mixed") return t("Booking.typeMixed");
    return "---";
  };

  const getBookingDetails = () => {
    const childInfo = hasChildren ? `\n👶 ${t("Booking.children")}: ${form.childrenCount}` : ""
    const typeLabel = getTypeLabel();

    return {
      text: `✨ ${t("Booking.title").toUpperCase()} ✨\n\n🌿 Rituel: ${selectedFormula?.name[currentLocale]}\n👤 ${t("Booking.name")}: ${form.name}\n📞 ${t("Booking.phone")}: ${form.phone}\n📅 ${t("Booking.date")}: ${form.date}\n⏰ Heure: ${selectedTime}\n👥 Type: ${typeLabel}\n👥 ${t("Booking.adults")}: ${form.persons}${childInfo}\n📝 Note: ${form.message || "---"}`,
      subject: `Booking Request: ${selectedFormula?.name[currentLocale]} - ${form.name}`,
    }
  }

  const handleWhatsApp = () => {
    const { text } = getBookingDetails()
    window.open(`https://wa.me/212661325840?text=${encodeURIComponent(text)}`, "_blank")
  }

  const handleEmail = () => {
    const { text, subject } = getBookingDetails()
    window.location.href = `mailto:reservations.ziani@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text.replace(/\*/g, ""))}`
  }

  // Validation: Required fields must be filled
  const isFormValid = 
    form.name.trim().length > 2 && 
    form.phone.length >= 10 && 
    form.gender !== "";

  return (
    <div className="space-y-8">
      <h4 className="text-2xl lg:text-4xl font-primary uppercase">{t("Booking.contact")}</h4>
      
      <div className="grid lg:grid-cols-2 gap-x-10 gap-y-6">
        {/* Name Input */}
        <FloatingInput 
            label={t("Booking.fullName")} 
            value={form.name} 
            onChange={(e: any) => setForm({ ...form, name: e.target.value })} 
        />

        {/* Phone Input */}
        <FloatingInput 
            label={t("Booking.phone")} 
            value={form.phone} 
            type="tel" 
            inputMode="numeric" 
            onChange={(e: any) => setForm({ ...form, phone: e.target.value.replace(/(?!^\+)\D/g, "") })} 
        />
        
        {/* GENDER SELECTION - REQUIRED */}
        <div className={cn("border-b transition-colors", form.gender ? "border-black/10" : "border-black/30")}>
          <label className="text-[9px] uppercase tracking-widest text-black/40 block mb-1">
            {t("Booking.groupType")} <span className="text-red-500">*</span>
          </label>
          <select 
            key={currentLocale} // Force re-render when language changes
            value={form.gender} 
            onChange={(e) => setForm({ ...form, gender: e.target.value })} 
            className="w-full py-2 bg-transparent outline-none text-xs cursor-pointer"
          >
            <option value="" disabled>{t("Booking.selectType")}</option>
            <option value="man">{t("Booking.typeMan")}</option>
            <option value="woman">{t("Booking.typeWoman")}</option>
            <option value="mixed">{t("Booking.typeMixed")}</option>
          </select>
        </div>

        {/* Adults Select */}
        <div className="border-b border-black/10">
          <label className="text-[9px] uppercase tracking-widest text-black/40 block mb-1">{t("Booking.adults")}</label>
          <select value={form.persons} onChange={(e) => setForm({ ...form, persons: e.target.value })} className="w-full py-2 bg-transparent outline-none text-xs">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (<option key={n} value={n}>{n} {t("Booking.adults")}</option>))}
          </select>
        </div>

        {/* Children Toggle */}
        <div className="flex flex-col justify-center">
          <button onClick={() => setHasChildren(!hasChildren)} className="flex items-center gap-3 group w-fit cursor-pointer">
            <div className={cn("w-8 h-4 rounded-full relative transition-colors", hasChildren ? "bg-black" : "bg-black/10")}>
              <div className={cn("absolute top-1 w-2 h-2 rounded-full bg-[#E5E5DD] transition-all", hasChildren ? "left-5" : "left-1")} />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-black/60 group-hover:text-black">{t("Booking.withChildren")}</span>
          </button>
          {hasChildren && (
            <select value={form.childrenCount} onChange={(e) => setForm({ ...form, childrenCount: e.target.value })} className="mt-3 bg-transparent border-b border-black/10 py-1 text-xs outline-none">
              {[1, 2, 3, 4, 5].map((n) => (<option key={n} value={n}>{n} {t("Booking.children")}</option>))}
            </select>
          )}
        </div>
      </div>

      <FloatingInput label={t("Booking.messageNote")} value={form.message} onChange={(e: any) => setForm({ ...form, message: e.target.value })} />

      <div className="space-y-4 pt-8 border-t border-black/5">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 cursor-pointer">{t("Booking.back")}</button>
          {!isFormValid && <span className="text-[8px] uppercase text-red-500/60 font-bold">{t("Booking.req")}</span>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button variant="solid" disabled={!isFormValid} onClick={handleWhatsApp}>WhatsApp</Button>
          <Button variant="outline" disabled={!isFormValid} onClick={handleEmail}>Email</Button>
        </div>
      </div>
    </div>
  )
}