import { Mail, Phone, Globe } from "lucide-react";
import FacebookIcon from "@/assets/icons/Facebook.svg";
import WhatsappIcon from "@/assets/icons/Whatsapp.svg";
import InstagramIcon from "@/assets/icons/Instagram.svg";
import { useI18n } from "@/providers/I18nProvider";

const locales = ["fr", "en"] as const;

function LocaleButton({
  locale,
  isActive,
  onClick,
}: {
  locale: (typeof locales)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-0.5 rounded-full transition-all cursor-pointer ${
        isActive ? "bg-blue-500 text-white" : "text-blue-300 hover:text-white"
      }`}
    >
      {locale.toUpperCase()}
    </button>
  );
}

export function TopBar({ onLanguageChange }: { onLanguageChange: () => void }) {
  const { locale, setLocale } = useI18n();

  return (
    <div className="bg-blue-900 text-white font-secondary text-[0.85rem]">
      <div className="flex items-center justify-between px-6 lg:px-20 py-3">
        <div className="flex items-center gap-3">
          <Globe className="text-blue-300 size-5" />
          <div className="flex bg-blue-950/50 p-1 rounded-full border border-blue-700/50">
            {locales.map((l) => (
              <LocaleButton
                key={l}
                locale={l}
                isActive={locale === l}
                onClick={() => {
                  if (l === locale) return;
                  onLanguageChange();
                  setLocale(l);
                }}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="tel:+212522319695"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone size={16} /> 05 22 31 96 95
          </a>
          <a
            href="mailto:hammamziani@yahoo.com"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail size={16} /> Hammamziani@yahoo.com
          </a>
        </div>

        <div className="md:hidden text-[0.75rem]">
          <a href="tel:+212522319695" className="flex items-center gap-2">
            <Phone size={14} /> 05 22 31 96 95
          </a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://www.facebook.com/profile.php?id=100063616118440"
            className="hover:opacity-80"
            target="_blank"
          >
            <img src={FacebookIcon} alt="Facebook" className="size-8" />
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=%2B212661166627&text&type=phone_number&app_absent=0"
            className="hover:opacity-80"
            target="_blank"
          >
            <img src={WhatsappIcon} alt="WhatsApp" className="size-8" />
          </a>
          <a
            href="https://www.instagram.com/hammamziani"
            className="hover:opacity-80"
            target="_blank"
          >
            <img src={InstagramIcon} alt="Instagram" className="size-8" />
          </a>
        </div>
      </div>
    </div>
  );
}
