"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Music, FileMusic, Mic } from "lucide-react"

export function FloatingNotes({ count = 8 }) {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const [notes, setNotes] = useState<{ id: number; initialX: number; initialY: number; icon: number }[]>([])

  useEffect(() => {
    // Update dimensions only on client side
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()

    // Generate initial positions for notes
    const initialNotes = Array.from({ length: count }).map((_, i) => ({
      id: i,
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * window.innerHeight,
      icon: Math.floor(Math.random() * 3), // 0: Music, 1: FileMusic, 2: Mic
    }))
    setNotes(initialNotes)

    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [count])

  const renderIcon = (iconType: number, className: string) => {
    switch (iconType) {
      case 0:
        return <Music className={className} />
      case 1:
        return <FileMusic className={className} />
      case 2:
        return <Mic className={className} />
      default:
        return <Music className={className} />
    }
  }

  return (
    <div className="relative w-full h-full">
      {notes.map((note) => (
        <motion.div
          key={note.id}
          className="absolute"
          initial={{ x: note.initialX, y: note.initialY }}
          animate={{
            x: [
              note.initialX,
              note.initialX + Math.random() * 200 - 100,
              note.initialX + Math.random() * 200 - 100,
              note.initialX,
            ],
            y: [
              note.initialY,
              note.initialY + Math.random() * 200 - 100,
              note.initialY + Math.random() * 200 - 100,
              note.initialY,
            ],
            rotate: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          <div className="relative w-16 h-16 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center transform hover:scale-110 transition-transform">
            {renderIcon(note.icon, "w-8 h-8 text-purple-400/50")}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
