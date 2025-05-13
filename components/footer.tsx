"use client"
import { Bot, Mail } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"
import Link from "next/link"

export function Footer() {
  const { t, LanguageToggle } = useTranslation()

  return (
    <footer className="bg-black border-t border-white/10 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Bot className="w-6 h-6 text-purple-500 mr-2" />
            <span className="text-white font-medium">EduTune</span>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <LanguageToggle />
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              {t("termsOfService")}
            </Link>
            <a
              href="mailto:contact@romdev.tech"
              className="text-gray-400 hover:text-white text-sm transition-colors flex items-center"
            >
              <Mail className="w-4 h-4 mr-1" />
              contact@romdev.tech
            </a>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} EduTune. {t("allRightsReserved")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
