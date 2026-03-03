import { createContext, useState, useEffect, useMemo, type ReactNode } from "react"
import { translations, type Locale } from "@/lib/translations"

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "fr"
  const saved = localStorage.getItem("locale")
  if (saved === "en" || saved === "fr") return saved
  return navigator.language.startsWith("fr") ? "fr" : "en"
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", String(newLocale))
  }

  const t = useMemo(() => (key: any): string => translations[locale]?.[key] ?? key, [locale])

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t])

  if (!mounted) return null
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export { I18nContext }
export const useI18n = () => {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
import { useContext } from "react"
