"use client"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "pt" | "en"

type LanguageContextType = {
  lang: Language
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("pt")

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language | null
    if (saved) setLang(saved)
  }, [])

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === "pt" ? "en" : "pt"
      localStorage.setItem("lang", next)
      return next
    })
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider")
  }
  return context
}