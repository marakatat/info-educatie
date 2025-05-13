"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { SparklesCore } from "@/components/sparkles"
import { Bot, ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { useTranslation } from "@/contexts/translation-context"

export default function ForgotPasswordPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.message || "An error occurred",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error requesting password reset:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative flex items-center justify-center">
      <div className="h-full w-full absolute inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="fixed top-8 left-8 z-20">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-purple-500" />
            <span className="text-white font-medium text-xl">EduTune</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card className="border border-white/10 bg-black/60 backdrop-blur-md">
            {!isSubmitted ? (
              <>
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{t("resetPassword")}</CardTitle>
                  <CardDescription className="text-gray-400">{t("resetPasswordDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        {t("email")}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        t("sendResetLink")
                      )}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-white/10 pt-4">
                  <Link href="/sign-in" className="text-purple-400 hover:text-purple-300 flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t("backToSignIn")}
                  </Link>
                </CardFooter>
              </>
            ) : (
              <>
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{t("checkEmail")}</CardTitle>
                  <CardDescription className="text-gray-400">{t("checkEmailDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center py-6">
                  <div className="bg-purple-500/20 rounded-full p-4 mb-4">
                    <Mail className="h-10 w-10 text-purple-400" />
                  </div>
                  <p className="text-gray-300 text-center mb-6">
                    We've sent an email to <span className="text-white font-medium">{email}</span> with instructions to
                    reset your password.
                  </p>
                  <Link href="/sign-in">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      {t("backToSignIn")}
                    </Button>
                  </Link>
                </CardContent>
              </>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
