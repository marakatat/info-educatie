import type React from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { TranslationProvider } from "@/contexts/translation-context"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Footer } from "@/components/footer"
import "./globals.css"
import { Suspense } from "react"

export const metadata = {
  title: "EduTune - Învață prin muzică",
  description: "Transformă orice materie într-o melodie memorabilă cu ajutorul inteligenței artificiale.",
  icons: {
    icon: "/favicon.svg",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" className="overflow-x-hidden">
      <body className="overflow-x-hidden flex flex-col min-h-screen">
        <AuthProvider>
          <TranslationProvider>
            <Suspense>
              <div className="flex-grow">{children}</div>
              <Footer />
            </Suspense>
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </TranslationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
