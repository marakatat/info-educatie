"use client"
import { Bot, Menu, LogOut, X } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useTranslation } from "@/contexts/translation-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ProfileAvatar } from "@/components/profile-avatar"
import { FlagImage } from "@/components/flag-image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const { user, isLoading } = useAuth()
  const { t, language, setLanguage } = useTranslation()
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      })

      if (response.ok) {
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setIsSigningOut(false)
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ro" : "en")
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10"
      >
        <Link href="/" className="flex items-center space-x-2">
          <Bot className="w-8 h-8 text-purple-500" />
          <span className="text-white font-medium text-xl">EduTune</span>
        </Link>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 rounded-full p-1 transition-colors"
            aria-label={language === "en" ? "Switch to Romanian" : "Switch to English"}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                language === "ro" ? "bg-purple-600" : "bg-transparent"
              }`}
            >
              <FlagImage country="ro" width={20} height={20} className="rounded-sm" />
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                language === "en" ? "bg-purple-600" : "bg-transparent"
              }`}
            >
              <FlagImage country="uk" width={20} height={20} className="rounded-sm" />
            </div>
          </button>

          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <div className="w-10 h-10 bg-black rounded-full animate-pulse"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none">
                    <ProfileAvatar name={user.name} className="cursor-pointer hover:opacity-80 transition-opacity" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-black/80 backdrop-blur-md border border-white/10 text-white"
                >
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-sm text-gray-400">@{user.username}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-white/5"
                    onClick={() => router.push(`/${user.username}`)}
                  >
                    {t("profile")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-white/5"
                    onClick={() => router.push("/settings")}
                  >
                    {t("settings")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                  >
                    {isSigningOut ? (
                      "Se deconectează..."
                    ) : (
                      <div className="flex items-center">
                        <LogOut className="w-4 h-4 mr-2" />
                        {t("signOut")}
                      </div>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/sign-in">
                  <button className="text-white hover:text-purple-400 px-4 py-2 border border-white/20 rounded-md transition-colors">
                    {t("signIn")}
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors">
                    {t("signUp")}
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center space-x-2">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col md:hidden">
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
              <Bot className="w-8 h-8 text-purple-500" />
              <span className="text-white font-medium text-xl">EduTune</span>
            </Link>
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col p-6 space-y-6">
            <div className="border-t border-white/10 pt-6">
              {isLoading ? (
                <div className="w-10 h-10 bg-black rounded-full animate-pulse"></div>
              ) : user ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <ProfileAvatar name={user.name} />
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">@{user.username}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        router.push(`/${user.username}`)
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full text-left text-gray-300 hover:text-white py-2"
                    >
                      {t("profile")}
                    </button>
                    <button
                      onClick={() => {
                        router.push("/settings")
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full text-left text-gray-300 hover:text-white py-2"
                    >
                      {t("settings")}
                    </button>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full text-left text-red-400 hover:text-red-300 py-2"
                      disabled={isSigningOut}
                    >
                      {isSigningOut ? "Se deconectează..." : t("signOut")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Link
                    href="/sign-in"
                    className="block w-full text-center text-white hover:text-purple-400 px-4 py-2 border border-white rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("signIn")}
                  </Link>
                  <Link
                    href="/sign-up"
                    className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("signUp")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
