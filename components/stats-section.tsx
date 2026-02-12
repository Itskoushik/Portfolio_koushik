"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useEffect, useState, useRef } from "react"
import { Smartphone, Bot, Shield, Layers } from "lucide-react"

const stats = [
  { label: "Mobile Tests Automated", value: 500, suffix: "+", icon: Smartphone, color: "primary" },
  { label: "Automation Scripts", value: 150, suffix: "+", icon: Bot, color: "accent" },
  { label: "Projects", value: 12, suffix: "+", icon: Shield, color: "chart-3" },
  { label: "Technologies Used", value: 15, suffix: "+", icon: Layers, color: "primary" },
]

function AnimatedCounter({ target, animate, suffix }: { target: number; animate: boolean; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!animate) return
    const duration = 2000
    const startTime = performance.now()
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * target)
      setCount(current)
      if (ref.current) {
        ref.current.style.transform = `scale(${1 + (1 - progress) * 0.15})`
      }
      if (progress < 1) {
        requestAnimationFrame(step)
      } else if (ref.current) {
        ref.current.style.transform = "scale(1)"
      }
    }
    requestAnimationFrame(step)
  }, [animate, target])

  return (
    <span ref={ref} className="inline-block transition-transform">
      {count}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  const { ref, isVisible } = useScrollReveal()

  const colorStyles: Record<string, { bg: string; text: string; border: string }> = {
    primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
    accent: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20" },
    "chart-3": { bg: "bg-chart-3/10", text: "text-chart-3", border: "border-chart-3/20" },
  }

  return (
    <section className="relative py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6" ref={ref}>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const styles = colorStyles[stat.color]
            return (
              <div
                key={stat.label}
                className={`group relative overflow-hidden rounded-2xl border ${styles.border} bg-card/60 p-6 text-center backdrop-blur-sm transition-all duration-700 hover:border-border hover:shadow-xl ${
                  isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
                }`}
                style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
              >
                <div className={`absolute inset-0 ${styles.bg} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} aria-hidden="true" />

                <div className="relative z-10">
                  <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${styles.bg} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                    <Icon size={22} className={styles.text} />
                  </div>
                  <div className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                    <AnimatedCounter target={stat.value} animate={isVisible} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
