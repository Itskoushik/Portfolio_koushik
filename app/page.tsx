"use client"

import { useState } from "react"
import { SplashScreen } from "@/components/splash-screen"
import { ParticleField } from "@/components/particle-field"
import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { StatsSection } from "@/components/stats-section"
import { ExperienceSection } from "@/components/experience-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Page() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <>
      <CustomCursor />

      {/* Splash Screen */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      {/* Main content - renders underneath splash, revealed when splash lifts */}
      <div
        className={`transition-opacity duration-500 ${splashDone ? "opacity-100" : "opacity-0"}`}
      >
        <ParticleField />
        <Navbar />
        <main className="relative z-10 noise-overlay grid-pattern">
          <HeroSection />

          <div className="relative h-px">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          <ProjectsSection />

          <div className="relative h-px">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          </div>

          <StatsSection />

          <div className="relative h-px">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-chart-3/20 to-transparent" />
          </div>

          <SkillsSection />

          <div className="relative h-px">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>

          <ExperienceSection />

          <div className="relative h-px">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          </div>

          <ContactSection />
          <Footer />
        </main>
      </div>
    </>
  )
}
