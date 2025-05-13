import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import { SparklesCore } from "@/components/sparkles"
import { FloatingNotes } from "@/components/floating-notes"
import { FloatingPaper } from "@/components/floating-paper"
import LearnMore from "@/components/learn-more"
import { NotificationHandler } from "@/components/notification-handler"
import { Suspense } from "react"

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[1] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0">
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

      {/* Floating elements background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingNotes count={8} />
        <FloatingPaper count={4} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <LearnMore />

        {/* Wrap the NotificationHandler in a Suspense boundary */}
        <Suspense fallback={null}>
          <NotificationHandler />
        </Suspense>
      </div>
    </main>
  )
}
