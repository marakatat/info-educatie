"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Music, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/contexts/translation-context"

export default function LearnMore() {
  const { t, highlight } = useTranslation()

  // Function to highlight uppercase words
  const highlightUppercase = (text: string): React.ReactNode => {
    const parts = text.split(/(\b[A-Z]+\b)/g)
    return (
      <>
        {parts.map((part, i) => {
          if (/\b[A-Z]+\b/.test(part)) {
            return (
              <span key={i} className="font-bold text-purple-400">
                {part}
              </span>
            )
          }
          return part
        })}
      </>
    )
  }

  return (
    <section id="learn-more" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
            {t("howItWorks")}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{highlight(t("transformLearning"))}</p>
        </motion.div>

        <Card className="border border-white/10 bg-black/60 backdrop-blur-md mb-12">
          <CardContent className="p-6 md:p-8">
            <p className="text-gray-300 leading-relaxed">
              {highlightUppercase(`Cu toții știm cât de rapid reținem acea melodie enervantă care rămâne în capul nostru zile la rând. Doar
              dacă ar fi o metodă prin care să putem învăța ascultând muzică?
              
              Prin folosirea noii inteligențe artificiale putem să realizăm melodii. Ok, dar cu ce scop dacă materia tot
              lungă, stufoasă și neinteresantă e? Inteligența artificială ne sare în ajutor DIN NOU!
              
              Folosind un model de chatbot în backend, rezumă și transformă în versuri tot ce este important! ASTFEL
              avem toate ingredientele + elementul X care este platforma noastră EduTune care vă prezintă acest produs
              finit, ușor și rapid de utilizat!
              
              Doar trebuie să îi dai clasa și materia pe care vrei să înveți! (nu suntem responsabili de posibilele
              erori)
              
              Dacă dorești, ai de asemenea opțiunea de a încărca notițele tale (asta dacă nu ai în scris ca egiptenii)
              și numai de cât vei avea un cântec perfect de ascultat care o să îți rămână în cap de vrei, sau nu...
              
              ASTFEL tu vei avea mereu acele informații pregătite pentru orice moment în care ai avea nevoie de ele.
              Deci, te-am convins?`)}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border border-white/10 bg-black/60 backdrop-blur-md h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="bg-purple-500/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t("uploadNotes")}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{highlight(t("uploadNotesDesc"))}</p>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 mt-auto bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-none"
                >
                  {t("uploadButton")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="border border-white/10 bg-black/60 backdrop-blur-md h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="bg-pink-500/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Music className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t("listenAndLearn")}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{highlight(t("listenAndLearnDesc"))}</p>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 mt-auto bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-none"
                >
                  {t("examples")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
