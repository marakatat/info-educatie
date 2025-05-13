"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Music, ChevronDown } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { useTranslation } from "@/contexts/translation-context"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TypingAnimation } from "@/components/typing-animation"

export default function Hero() {
  const { user } = useAuth()
  const { t, language, highlight } = useTranslation()
  const router = useRouter()
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleGetStarted = () => {
    if (!inputValue.trim()) {
      toast({
        title: "Câmp gol",
        description: "Te rugăm să introduci clasa și materia pentru a continua.",
        variant: "destructive",
      })
      return
    }

    if (!user) {
      // Redirect to sign-up page if user is not logged in
      router.push("/sign-up")
      return
    }

    // If user is logged in, redirect to the generator page with the query
    router.push(`/generator?query=${encodeURIComponent(inputValue)}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGetStarted()
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center justify-center">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-[120px] md:h-[150px] lg:h-[180px] flex items-center justify-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
              <TypingAnimation
                phrases={[t("heroTitle1"), t("heroTitle2"), t("heroTitle3")]}
                typingSpeed={100}
                deletingSpeed={50}
                delayBetweenPhrases={2000}
                initialPhrase={0}
                language={language}
              />
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
          >
            {highlight(t("heroDescription"))}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-3xl mx-auto"
          >
            <div className="relative w-full">
              <Input
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={t("inputPlaceholder")}
                className="bg-white/10 border-white/20 text-white py-6 pl-4 pr-12 text-lg rounded-lg w-full"
              />
              <Music className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex gap-2 sm:gap-4">
              <Button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-6 text-lg rounded-lg whitespace-nowrap flex items-center gap-2"
              >
                {t("start")} <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 flex items-center gap-2"
            onClick={() => document.getElementById("learn-more")?.scrollIntoView({ behavior: "smooth" })}
          >
            {t("learnMore")}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
