"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

interface DebugContextType {
  isDebugMode: boolean
  toggleDebugMode: () => void
}

const DebugContext = createContext<DebugContextType>({
  isDebugMode: false,
  toggleDebugMode: () => {},
})

export function DebugProvider({ children }: { children: React.ReactNode }) {
  const [isDebugMode, setIsDebugMode] = useState(false)

  const toggleDebugMode = () => {
    setIsDebugMode((prev) => !prev)
  }

  return <DebugContext.Provider value={{ isDebugMode, toggleDebugMode }}>{children}</DebugContext.Provider>
}

export const useDebug = () => useContext(DebugContext)
