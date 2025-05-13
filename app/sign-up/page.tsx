"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "@/contexts/translation-context"
import { SparklesCore } from "@/components/sparkles"
import Navbar from "@/components/navbar"
import { supabase } from "@/lib/supabase/client"
import { GoogleIcon } from "@/components/google-icon"

export default function SignUpPage() {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const username = formData.get("username") as string
    const name = formData.get("name") as string

    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            name,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      })

      if (authError) {
        setError(authError.message)
        return
      }

      if (authData.user) {
        toast({
          title: t("signUpSuccess"),
          description: t("emailVerificationSent"),
        })

        // Show a more detailed toast about email verification
        setTimeout(() => {
          toast({
            title: t("pleaseCheckEmail"),
            description: email,
            duration: 5000,
          })
        }, 1000)

        router.push("/")
      }
    } catch (err) {
      console.error("Sign up error:", err)
      setError(t("unknownError"))
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true)
    setError("")

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      })

      if (error) {
        setError(error.message)
      }
    } catch (err) {
      console.error("Google sign in error:", err)
      setError(t("unknownError"))
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative flex flex-col">
      {/* Ambient background with moving particles */}
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

      <div className="relative z-10">
        <Navbar />

        <div className="container flex items-center justify-center flex-grow py-12 px-4">
          <Card className="w-full max-w-md mx-auto border border-white/10 bg-black/60 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                {t("createAccount")}
              </CardTitle>
              <CardDescription className="text-gray-400">{t("signUpDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white text-black hover:bg-gray-100 border-0 flex items-center justify-center space-x-2"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
              >
                <GoogleIcon className="w-5 h-5" />
                <span>{isGoogleLoading ? "..." : t("signInWithGoogle")}</span>
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black px-2 text-gray-400">{t("or")}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    {t("name")}
                  </Label>
                  <Input id="name" name="name" required className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300">
                    {t("username")}
                  </Label>
                  <Input id="username" name="username" required className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    {t("email")}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    {t("password")}
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                {error && <p className="text-sm font-medium text-red-500">{error}</p>}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  disabled={isLoading}
                >
                  {isLoading ? t("signingUp") : t("signUp")}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-white/10 pt-4">
              <p className="text-gray-400 text-sm">
                {t("alreadyHaveAccount")}{" "}
                <Link href="/sign-in" className="text-purple-400 hover:text-purple-300">
                  {t("signIn")}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
