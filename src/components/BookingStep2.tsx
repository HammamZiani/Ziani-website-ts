import { useRef } from "react";
import { useI18n } from "@/providers/I18nProvider";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

const TIME_SLOTS = Array.from({ length: 31 }, (_, i) => {
  const hour = Math.floor(i / 2) + 7;
  const min = (i % 2) * 30;
  return `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
});


interface Step2Props {
  form: any;
  setForm: (f: any) => void;
  selectedTime: string;
  setSelectedTime: (t: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function BookingStep2({
  form,
  setForm,
  selectedTime,
  setSelectedTime,
  onNext,
  onBack,
}: Step2Props) {
  const { t } = useI18n();
  const dateInputRef = useRef<HTMLInputElement>(null);

  // This function opens the native date picker programmatically
  const handlePickerOpen = () => {
    if (dateInputRef.current) {
      try {
        // Modern browsers method to show the date picker
        dateInputRef.current.showPicker();
      } catch (error) {
        // Fallback for older browsers
        dateInputRef.current.focus();
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Scoped CSS to force the icon to be black even in dark mode */}
      <style>{`
        .black-cal-input::-webkit-calendar-picker-indicator {
          filter: invert(0) !important;
          cursor: pointer;
          opacity: 0.8;
        }
      `}</style>

      <h4 className="text-2xl lg:text-4xl font-primary uppercase">
        {t("Booking.dateTime")}
      </h4>

      <div className="flex flex-col gap-8">
        {/* Container triggers the picker on click */}
        <div
          className="border-b border-black/10 py-2 w-full max-w-sm cursor-pointer group"
          onClick={handlePickerOpen}
        >
          <label className="text-[9px] uppercase tracking-widest text-black/40 block mb-2 cursor-pointer group-hover:text-black transition-colors">
            {t("Booking.selectDate")}
          </label>

          <input
            ref={dateInputRef}
            type="date"
            value={form.date}
            // Setting min to today's date prevents past bookings
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            onClick={(e) => {
              e.stopPropagation(); // Prevents double-triggering from the div
              handlePickerOpen();
            }}
            style={{ colorScheme: "light" }}
            className="w-full bg-transparent outline-none text-md cursor-pointer h-8 black-cal-input"
          />
        </div>

        <div className="w-full">
          <label className="text-[9px] uppercase tracking-widest text-black/40 block mb-4">
            {t("Booking.slots")}
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 max-h-[220px] overflow-y-auto p-1 custom-scrollbar">
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "py-3 text-[10px] border transition-all cursor-pointer",
                  selectedTime === time
                    ? "bg-black text-white border-black"
                    : "border-black/10 text-black/40 hover:border-black hover:text-black",
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-10 pt-6 border-t border-black/5">
        <button
          onClick={onBack}
          className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
        >
          {t("Booking.back")}
        </button>
        <Button
          variant={form.date && selectedTime ? "solid" : "outline"}
          disabled={!form.date || !selectedTime}
          onClick={onNext}
        >
          {t("Booking.next")}
        </Button>
      </div>
    </div>
  );
}
