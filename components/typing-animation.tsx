"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenPhrases?: number
  initialPhrase?: number
  language?: "en" | "ro"
}

export function TypingAnimation({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenPhrases = 2000,
  initialPhrase = 0,
  language = "ro",
}: TypingAnimationProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(initialPhrase)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false)
        setIsDeleting(true)
      }, delayBetweenPhrases)
      return () => clearTimeout(timeout)
    }

    const currentPhrase = phrases[currentPhraseIndex]

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false)
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, deletingSpeed)
      }
    } else {
      if (currentText === currentPhrase) {
        setIsWaiting(true)
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1))
        }, typingSpeed)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, isWaiting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases])

  return (
    <span className="relative" style={{ color: "white" }}>
      {currentText}
      <span className="absolute right-[-0.5em] top-0 h-full w-[0.125em] bg-purple-500 animate-blink"></span>
    </span>
  )
}
