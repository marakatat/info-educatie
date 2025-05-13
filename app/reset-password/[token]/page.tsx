"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { SparklesCore } from "@/components/sparkles"
import { Bot, Check } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { useTranslation } from "@/contexts/translation-context"

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const { t } = useTranslation()
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isValidToken, setIsValidToken] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verify token validity
    const verifyToken = async () => {
      try {
        const response = await fetch(`/api/auth/verify-reset-token?token=${params.token}`)

        if (!response.ok) {
          setIsValidToken(false)
          toast({
            title: "Invalid or expired token",
            description: "This password reset link is invalid or has expired.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error verifying token:", error)
        setIsValidToken(false)
      } finally {
        setIsLoading(false)
      }
    }

    verifyToken()
  }, [params.token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: params.token, password }),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.message || "An error occurred",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error resetting password:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black/[0.96] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-purple-500 rounded-full border-t-transparent"></div>
      </div>
    )
  }

  if (!isValidToken) {
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
              <CardHeader>
                <CardTitle className="text-2xl text-white">Invalid Reset Link</CardTitle>
                <CardDescription className="text-gray-400">
                  This password reset link is invalid or has expired.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-6">
                <Link href="/forgot-password">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Request a new reset link</Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
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
            {!isSuccess ? (
              <>
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{t("resetPassword")}</CardTitle>
                  <CardDescription className="text-gray-400">Enter your new password below.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-300">
                        {t("newPassword")}
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        required
                        minLength={8}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-gray-300">
                        {t("confirmNewPassword")}
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        t("resetPasswordButton")
                      )}
                    </Button>
                  </form>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{t("passwordResetSuccess")}</CardTitle>
                  <CardDescription className="text-gray-400">{t("passwordResetSuccessDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center py-6">
                  <div className="bg-green-500/20 rounded-full p-4 mb-4">
                    <Check className="h-10 w-10 text-green-400" />
                  </div>
                  <Link href="/sign-in">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">{t("signIn")}</Button>
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
