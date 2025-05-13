"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { FlagImage } from "@/components/flag-image"

type Language = "en" | "ro"

interface Translations {
  [key: string]: {
    en: string
    ro: string
  }
}

const translations: Translations = {
  // Common
  back: {
    en: "Back",
    ro: "Înapoi",
  },
  save: {
    en: "Save",
    ro: "Salvează",
  },
  cancel: {
    en: "Cancel",
    ro: "Anulează",
  },
  continue: {
    en: "Continue",
    ro: "Continuă",
  },
  tryAgain: {
    en: "Try Again",
    ro: "Încearcă din nou",
  },
  allRightsReserved: {
    en: "All rights reserved",
    ro: "Toate drepturile rezervate",
  },
  language: {
    en: "Language",
    ro: "Limbă",
  },
  termsOfService: {
    en: "Terms of Service",
    ro: "Termeni și Condiții",
  },

  // Auth
  signIn: {
    en: "Sign In",
    ro: "Conectare",
  },
  signUp: {
    en: "Sign Up",
    ro: "Înregistrare",
  },
  signOut: {
    en: "Sign Out",
    ro: "Deconectare",
  },
  signingIn: {
    en: "Signing in...",
    ro: "Se conectează...",
  },
  signingUp: {
    en: "Signing up...",
    ro: "Se înregistrează...",
  },
  email: {
    en: "Email",
    ro: "Email",
  },
  password: {
    en: "Password",
    ro: "Parolă",
  },
  confirmPassword: {
    en: "Confirm Password",
    ro: "Confirmă Parola",
  },
  name: {
    en: "Name",
    ro: "Nume",
  },
  username: {
    en: "Username",
    ro: "Nume de utilizator",
  },
  bio: {
    en: "Bio",
    ro: "Descriere",
  },
  optional: {
    en: "optional",
    ro: "opțional",
  },
  forgotPassword: {
    en: "Forgot password?",
    ro: "Ai uitat parola?",
  },
  createAccount: {
    en: "Create Account",
    ro: "Creează Cont",
  },
  signInDescription: {
    en: "Sign in to your account",
    ro: "Conectează-te la contul tău",
  },
  signUpDescription: {
    en: "Join EduTune to create your own songs",
    ro: "Alătură-te EduTune pentru a crea propriile melodii",
  },
  dontHaveAccount: {
    en: "Don't have an account?",
    ro: "Nu ai cont?",
  },
  alreadyHaveAccount: {
    en: "Already have an account?",
    ro: "Ai deja un cont?",
  },
  signInSuccess: {
    en: "Successfully signed in",
    ro: "Conectare reușită",
  },
  signUpSuccess: {
    en: "Successfully signed up",
    ro: "Înregistrare reușită",
  },
  redirectingToProfile: {
    en: "Redirecting to your profile",
    ro: "Redirecționare către profilul tău",
  },
  unknownError: {
    en: "An unknown error occurred",
    ro: "A apărut o eroare necunoscută",
  },
  signInWithGoogle: {
    en: "Sign in with Google",
    ro: "Conectare cu Google",
  },
  or: {
    en: "or",
    ro: "sau",
  },

  // Navigation
  profile: {
    en: "Profile",
    ro: "Profil",
  },
  settings: {
    en: "Settings",
    ro: "Setări",
  },

  // Generator
  subject: {
    en: "Subject",
    ro: "Subiect",
  },
  lyrics: {
    en: "Lyrics",
    ro: "Versuri",
  },
  musicGenre: {
    en: "Music Genre",
    ro: "Gen Muzical",
  },
  song: {
    en: "Song",
    ro: "Melodie",
  },
  generatingLyrics: {
    en: "Generating lyrics...",
    ro: "Se generează versurile...",
  },
  chooseLyrics: {
    en: "Choose your preferred lyrics:",
    ro: "Alege versurile preferate:",
  },
  chooseMusicGenre: {
    en: "Choose music genre:",
    ro: "Alege genul muzical:",
  },
  preparingOptions: {
    en: "Preparing options...",
    ro: "Se pregătesc opțiunile...",
  },
  generateSong: {
    en: "Generate Song",
    ro: "Generează Melodia",
  },
  generatedSongs: {
    en: "Generated Songs:",
    ro: "Melodii Generate:",
  },
  composingSong: {
    en: "Composing the song...",
    ro: "Se compune melodia...",
  },
  composingTime: {
    en: "This process may take up to a minute",
    ro: "Acest proces poate dura până la un minut",
  },
  selectedLyrics: {
    en: "Selected Lyrics:",
    ro: "Versurile Selectate:",
  },

  // Hero
  heroTitle1: {
    en: "EduTune.",
    ro: "EduTune.",
  },
  heroTitle2: {
    en: "Redefine learning!",
    ro: "Redefinește învățatul!",
  },
  heroTitle3: {
    en: "Learn through music!",
    ro: "Învață prin muzică!",
  },
  heroDescription: {
    en: "Transform any subject into a memorable tune with the help of artificial intelligence.",
    ro: "Transformă orice materie într-o melodie memorabilă cu ajutorul inteligenței artificiale.",
  },
  inputPlaceholder: {
    en: "Enter class and subject (e.g., Grade 9, History)",
    ro: "Introdu clasa și materia (ex: Clasa 9, Istorie)",
  },
  start: {
    en: "Start",
    ro: "Începe",
  },
  learnMore: {
    en: "Learn more",
    ro: "Află mai multe",
  },
}

// Keywords to highlight in each language
const highlightKeywords = {
  en: {
    artificial: "artificial intelligence",
    memorable: "memorable",
    transform: "Transform",
    music: "music",
    learn: "learning",
  },
  ro: {
    artificial: "inteligenței artificiale",
    memorable: "memorabilă",
    transform: "Transformă",
    music: "muzică",
    learn: "învățarea",
  },
}

interface TranslationContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
  highlight: (text: string) => React.ReactNode
  LanguageToggle: React.FC
}

const TranslationContext = createContext<TranslationContextType>({
  language: "ro",
  setLanguage: () => {},
  t: (key) => key,
  highlight: (text) => text,
  LanguageToggle: () => null,
})

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ro")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ro")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key][language]
  }

  const highlight = (text: string): React.ReactNode => {
    let result = text
    const keywords = highlightKeywords[language]

    Object.values(keywords).forEach((word) => {
      if (result.includes(word)) {
        result = result.replace(new RegExp(`(${word})`, "gi"), '<span class="font-bold text-purple-400">$1</span>')
      }
    })

    // Make uppercase words bold and colored
    result = result.replace(/\b([A-Z]+)\b/g, '<span class="font-bold text-purple-400">$1</span>')

    return <span dangerouslySetInnerHTML={{ __html: result }} />
  }

  const LanguageToggle: React.FC = () => {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-gray-400 text-sm">{t("language")}:</span>
        <button
          onClick={() => setLanguage("ro")}
          className={`flex items-center justify-center w-8 h-8 rounded-full overflow-hidden ${
            language === "ro" ? "ring-2 ring-purple-500" : "opacity-50"
          }`}
          aria-label="Romanian"
        >
          <FlagImage country="ro" width={32} height={32} />
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`flex items-center justify-center w-8 h-8 rounded-full overflow-hidden ${
            language === "en" ? "ring-2 ring-purple-500" : "opacity-50"
          }`}
          aria-label="English"
        >
          <FlagImage country="uk" width={32} height={32} />
        </button>
      </div>
    )
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, highlight, LanguageToggle }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => useContext(TranslationContext)
