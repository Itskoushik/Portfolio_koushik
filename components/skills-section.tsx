"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useEffect, useState, useRef } from "react"
import { Shield, Smartphone, Code2, Wrench } from "lucide-react"
import { TiltCard } from "@/components/tilt-card"
import { useMouseParallax } from "@/hooks/use-mouse-parallax"

const skillCategories = [
  {
    title: "Defence Grad GUI",
    icon: Shield,
    color: "accent",
    skills: [
      { name: "PyQt5", level: 92 },
      { name: "Docklite", level: 78 },
      { name: "PySerial", level: 85 },
      { name: "PyVisa", level: 88 },
      { name: "SQlite", level: 90 },
    ],
  },
  {
    title: "QA Automation",
    icon: Smartphone,
    color: "primary",
    skills: [
      { name: "Appium", level: 90 },
      { name: "Selenium", level: 92 },
      { name: "Pytest", level: 91 },
      { name: "POM", level: 83 },
      { name: "Manual Testing", level: 82 },
      { name: "API Testing", level: 87 },
    ],
  },
  {
    title: "Development",
    icon: Code2,
    color: "chart-3",
    skills: [
      { name: "Python", level: 95 },
      { name: "C Programming", level: 80 },
      { name: "Basic Java", level: 60 },
      { name: "React / Next.js", level: 81 },
      { name: "HTML / CSS", level: 85 },
      { name: "MySQL / Oracle SQL", level: 78 },
      { name: "MongoDB", level: 82 },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: Wrench,
    color: "primary",
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "Docker", level: 75 },
      { name: "AWS / GCP", level: 72 },
      { name: "CI/CD Pipelines", level: 80 },
      { name: "Jira / Postman", level: 88 },
    ],
  },
]

function SkillBar({ name, level, color, animate, delay }: { name: string; level: number; color: string; animate: boolean; delay: number }) {
  const [width, setWidth] = useState(0)
  const [displayVal, setDisplayVal] = useState(0)

  useEffect(() => {
    if (!animate) return
    const timer = setTimeout(() => {
      setWidth(level)
      const duration = 1200
      const startTime = performance.now()
      const step = (time: number) => {
        const elapsed = time - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplayVal(Math.floor(eased * level))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, delay)
    return () => clearTimeout(timer)
  }, [animate, level, delay])

  const barColor =
    color === "primary"
      ? "bg-gradient-to-r from-primary to-primary/70"
      : color === "accent"
        ? "bg-gradient-to-r from-accent to-accent/70"
        : "bg-gradient-to-r from-chart-3 to-chart-3/70"

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{name}</span>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">{displayVal}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-secondary/80">
        <div
          className={`relative h-full rounded-full ${barColor} transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              animation: width > 0 ? "shimmer 2s infinite" : "none",
              backgroundSize: "200% 100%",
            }}
          />
          {width > 0 && (
            <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-foreground/80" />
          )}
        </div>
      </div>
    </div>
  )
}

// Orbiting tech words around the section
function OrbitingKeywords() {
  const keywords = ["Appium", "Selenium", "PyQt5", "Radar", "REST API", "Docker", "CI/CD", "NumPy"]
  const containerRef = useRef<HTMLDivElement>(null)
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    let raf: number
    const animate = () => {
      setAngle((prev) => prev + 0.003)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {keywords.map((kw, i) => {
        const a = angle + (i / keywords.length) * Math.PI * 2
        const rx = 48 // percent
        const ry = 42
        const x = 50 + Math.cos(a) * rx
        const y = 50 + Math.sin(a) * ry
        const opacity = 0.06 + (Math.sin(a) + 1) * 0.04
        return (
          <span
            key={kw}
            className="absolute font-mono text-xs text-primary whitespace-nowrap"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              opacity,
              transform: "translate(-50%, -50%)",
            }}
          >
            {kw}
          </span>
        )
      })}
    </div>
  )
}

export function SkillsSection() {
  const { ref, isVisible } = useScrollReveal()
  const parallax = useMouseParallax(0.2)

  const colorStyles: Record<string, { bg: string; text: string; border: string; glare: string }> = {
    primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20", glare: "rgba(168, 85, 247, 0.12)" },
    accent: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20", glare: "rgba(6, 182, 212, 0.12)" },
    "chart-3": { bg: "bg-chart-3/10", text: "text-chart-3", border: "border-chart-3/20", glare: "rgba(217, 70, 239, 0.12)" },
  }

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <OrbitingKeywords />

      <div
        className="absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px]"
        style={{ transform: `translate(${parallax.x * -0.3}px, ${parallax.y * -0.3}px)` }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6" ref={ref}>
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            Expertise
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Defence GUI systems, mobile testing automation, and full-stack development
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, catIndex) => {
            const Icon = category.icon
            const styles = colorStyles[category.color]
            return (
              <TiltCard
                key={category.title}
                glareColor={styles.glare}
                className={`group rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-700 hover:border-border hover:shadow-xl ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: isVisible ? `${catIndex * 150}ms` : "0ms" }}
              >
                <div className="relative z-10 p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.bg} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon size={20} className={styles.text} />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{category.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBar
                        key={`${skill.name}-${skillIndex}`}
                        name={skill.name}
                        level={skill.level}
                        color={category.color}
                        animate={isVisible}
                        delay={catIndex * 150 + skillIndex * 100}
                      />
                    ))}
                  </div>
                </div>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
