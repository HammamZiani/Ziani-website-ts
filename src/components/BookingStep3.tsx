import { useI18n } from "@/providers/I18nProvider";
import { Button } from "@/components/Button";
import { Minus, Plus } from "lucide-react";

interface CounterProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
}

function Counter({ label, value, onChange, min = 0 }: CounterProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-black/10">
      <span className="text-[10px] uppercase tracking-widest text-black/60">
        {label}
      </span>
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="size-6 flex items-center justify-center border border-black/20 rounded-full hover:bg-black hover:text-white transition-colors disabled:opacity-20"
          disabled={value <= min}
        >
          <Minus size={10} />
        </button>
        <span className="text-xs font-bold w-4 text-center">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="size-6 flex items-center justify-center border border-black/20 rounded-full hover:bg-black hover:text-white transition-colors"
        >
          <Plus size={10} />
        </button>
      </div>
    </div>
  );
}

/**
 * FIXED: FloatingInput
 * 1. Added 'text-[16px]' to prevent iOS auto-zoom.
 * 2. Added 'sm:text-xs' for desktop to keep your original design.
 * 3. Added 'inputMode' support for better mobile keyboards.
 */
function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  inputMode,
}: any) {
  return (
    <div className="group relative border-b border-black/10 focus-within:border-black transition-colors">
      <label className="text-[9px] uppercase tracking-widest text-black/40 block mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        inputMode={inputMode}
        /* Crucial: iOS zooms if font-size < 16px. 
           We set 16px (text-[16px]) for mobile and scale back to 12px (text-xs) on larger screens.
        */
        className="w-full bg-transparent outline-none text-[16px] sm:text-xs py-2 placeholder:text-black/20"
      />
    </div>
  );
}

export default function BookingStep3({
  form,
  setForm,
  selectedFormula,
  selectedTime,
  onBack,
}: any) {
  const { t, locale } = useI18n();
  const currentLocale = (locale as "fr" | "en") || "fr";

  const totalPersons =
    (form.men || 0) + (form.women || 0) + (form.children || 0);

  const isFormValid =
    form.name.trim().length >= 3 &&
    form.phone.trim().length >= 9 &&
    totalPersons > 0;

  const getBookingDetails = () => {
    const details = [];
    if (form.men > 0)
      details.push("👨 " + form.men + " " + t("Booking.typeMan"));
    if (form.women > 0)
      details.push("👩 " + form.women + " " + t("Booking.typeWoman"));
    if (form.children > 0)
      details.push("👶 " + form.children + " " + t("Booking.children"));

    const messageBody = [
      "✨ " + t("Booking.title").toUpperCase() + " ✨",
      "",
      "🌿 Rituel: " + (selectedFormula?.name[currentLocale] || ""),
      "👤 " + t("Booking.name") + ": " + form.name,
      "📞 " + t("Booking.phone") + ": " + form.phone,
      "📅 " + t("Booking.date") + ": " + form.date,
      "⏰ Heure: " + selectedTime,
      "👥 Total: " + totalPersons + " Pers.",
      details.join("\n"),
      "📝 Note: " + (form.message || "---"),
    ].join("\n");

    return { text: messageBody, subject: "Booking: " + form.name };
  };

  const handleWhatsApp = () => {
    const { text } = getBookingDetails();
    const url = `https://api.whatsapp.com/send?phone=212661325840&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleEmail = () => {
    const { text, subject } = getBookingDetails();
    window.location.href = `mailto:reservations.ziani@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-8">
      <h4 className="text-2xl lg:text-4xl font-primary uppercase">
        {t("Booking.contact")}
      </h4>

      <div className="grid lg:grid-cols-2 gap-x-12 gap-y-10">
        <div className="space-y-6">
          <FloatingInput
            label={t("Booking.fullName")}
            value={form.name}
            onChange={(e: any) => setForm({ ...form, name: e.target.value })}
          />
          <FloatingInput
            label={t("Booking.phone")}
            value={form.phone}
            type="tel"
            inputMode="tel" // Opens numeric keypad on iPhone
            onChange={(e: any) => setForm({ ...form, phone: e.target.value })}
          />
          <FloatingInput
            label={t("Booking.messageNote")}
            value={form.message}
            onChange={(e: any) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        <div className="flex flex-col bg-black/5 p-6 rounded-sm">
          <label className="text-[9px] uppercase tracking-[0.2em] text-black/40 mb-4 font-bold">
            {t("Booking.adults")} & {t("Booking.children")}
          </label>
          <Counter
            label={t("Booking.typeMan")}
            value={form.men}
            onChange={(val) => setForm({ ...form, men: val })}
          />
          <Counter
            label={t("Booking.typeWoman")}
            value={form.women}
            onChange={(val) => setForm({ ...form, women: val })}
          />
          <Counter
            label={t("Booking.children")}
            value={form.children}
            onChange={(val) => setForm({ ...form, children: val })}
          />

          <div className="mt-4 flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold">Total</span>
            <span className="text-xs font-bold">{totalPersons}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-8 border-t border-black/5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 cursor-pointer"
          >
            {t("Booking.back")}
          </button>
          {!isFormValid && (
            <span className="text-[8px] uppercase text-red-500/60 font-bold">
              {totalPersons === 0
                ? t("Booking.req")
                : t("Booking.reqPhoneAndName")}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="solid"
            disabled={!isFormValid}
            onClick={handleWhatsApp}
          >
            WhatsApp
          </Button>
          <Button
            variant="outline"
            disabled={!isFormValid}
            onClick={handleEmail}
          >
            Email
          </Button>
        </div>
      </div>
    </div>
  );
}
