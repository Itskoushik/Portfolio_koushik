"use client"

import { useEffect, useState, useRef } from "react"
import { 
  ArrowDown, Github, Linkedin, Mail, Radar, Terminal,
  Brain, Bot, Database, Figma, Code2
} from "lucide-react"
import Image from "next/image"
import { useMouseParallax } from "@/hooks/use-mouse-parallax"
import { MagneticButton } from "@/components/magnetic-button"
import { TextScramble } from "@/components/text-scramble"

const roles = [
  "Python Developer",
  "Mobile Testing Engineer",
  "Defence Grade-GUI Systems",
  "QA Automation Expert",
]

const floatingIcons = [
  { icon: Brain, label: "AI", x: "45%", y: "-2%", delay: 0.5, color: "text-primary" },          
  { icon: Bot, label: "Selenium", x: "80%", y: "22%", delay: 1.2, color: "text-accent" },        
  { icon: Terminal, label: "Python", x: "88%", y: "55%", delay: 1.5, color: "text-accent" },     
  { icon: Code2, label: "QA Automation", x: "75%", y: "85%", delay: 1.6, color: "text-chart-3" },
  { icon: Figma, label: "Figma", x: "45%", y: "100%", delay: 0.8, color: "text-primary" },       
  { icon: Radar, label: "GUI", x: "10%", y: "95%", delay: 2, color: "text-chart-3" },            
  { icon: Database, label: "Oracle SQL", x: "-8%", y: "52%", delay: 1.8, color: "text-accent" },
]




export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const parallax = useMouseParallax(0.8)
  const sectionRef = useRef<HTMLElement>(null)
  const radarRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Radar sweep animation on canvas
  useEffect(() => {
    const canvas = radarRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = 300
    canvas.width = size
    canvas.height = size
    const cx = size / 2
    const cy = size / 2
    const radius = size / 2 - 10
    let angle = 0
    let raf: number

    // Random blips
    const blips = Array.from({ length: 6 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 30 + Math.random() * (radius - 40),
      pulse: 0,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, size, size)

      // Rings
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath()
        ctx.arc(cx, cy, (radius / 3) * i, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(185, 90%, 55%, ${0.08})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Cross lines
      ctx.strokeStyle = "hsla(185, 90%, 55%, 0.06)"
      ctx.beginPath()
      ctx.moveTo(cx, 10)
      ctx.lineTo(cx, size - 10)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(10, cy)
      ctx.lineTo(size - 10, cy)
      ctx.stroke()

      // Sweep - draw multiple thin arcs fading out for sweep trail effect
      const sweepSegments = 20
      for (let s = 0; s < sweepSegments; s++) {
        const segAngle = angle - (s / sweepSegments) * 0.7
        const alpha = 0.15 * (1 - s / sweepSegments)
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.arc(cx, cy, radius, segAngle - 0.04, segAngle)
        ctx.closePath()
        ctx.fillStyle = `hsla(185, 90%, 55%, ${alpha})`
        ctx.fill()
      }

      // Sweep line
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius)
      ctx.strokeStyle = "hsla(185, 90%, 55%, 0.4)"
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Blips
      for (const blip of blips) {
        const angleDiff = ((angle - blip.a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2)
        if (angleDiff < 0.3) blip.pulse = 1
        if (blip.pulse > 0) {
          const bx = cx + Math.cos(blip.a) * blip.r
          const by = cy + Math.sin(blip.a) * blip.r
          ctx.beginPath()
          ctx.arc(bx, by, 3 * blip.pulse, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(185, 90%, 55%, ${blip.pulse * 0.8})`
          ctx.fill()
          // Glow
          ctx.beginPath()
          ctx.arc(bx, by, 8 * blip.pulse, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(185, 90%, 55%, ${blip.pulse * 0.15})`
          ctx.fill()
          blip.pulse -= 0.008
        }
      }

      // Center dot
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = "hsl(185, 90%, 55%)"
      ctx.fill()

      angle += 0.02
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentRole.length) {
            setCharIndex((prev) => prev + 1)
          } else {
            setTimeout(() => setIsDeleting(true), 1500)
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((prev) => prev - 1)
          } else {
            setIsDeleting(false)
            setRoleIndex((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 40 : 80
    )
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, roleIndex])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient orbs with parallax */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px]"
          style={{ transform: `translate(${parallax.x * 0.3}px, ${parallax.y * 0.3}px)` }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[100px]"
          style={{ transform: `translate(${parallax.x * -0.4}px, ${parallax.y * -0.4}px)` }}
        />
        <div
          className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart-3/10 blur-[80px]"
          style={{ transform: `translate(calc(-50% + ${parallax.x * 0.2}px), calc(-50% + ${parallax.y * 0.2}px))` }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 pt-24 pb-12 lg:flex-row lg:gap-16 lg:pt-0">
        {/* Left content */}
        <div
          className={`flex-1 space-y-6 transition-all duration-1000 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Building ISTJ GUI application for Hal.
          </div>

          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <TextScramble text="Hello, I'm" trigger={mounted} className="text-foreground block" speed={40} />
            <span className="gradient-text mt-1 block">
              <TextScramble text="Koushik Ram" trigger={mounted} speed={50} />
            </span>
          </h1>

          <div className="h-8 font-heading text-lg font-medium text-muted-foreground sm:text-xl">
            <span className="text-primary">{'>>'}</span>{' '}
            <span>{roles[roleIndex].slice(0, charIndex)}</span>
            <span className="animate-pulse-glow text-primary">_</span>
          </div>

          <p
            className={`max-w-lg text-base leading-relaxed text-muted-foreground transition-all duration-1000 delay-500 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            I build Python GUI systems for defence applications, automate mobile testing
            at scale, and engineer battle-tested automation frameworks.
            Turning mission-critical requirements into reliable software.
          </p>

          <div
            className={`flex flex-wrap items-center gap-4 pt-2 transition-all duration-1000 delay-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <MagneticButton
              href="#projects"
              strength={0.2}
              className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-shadow hover:shadow-lg hover:shadow-primary/30"
            >
              View Projects
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              strength={0.2}
              className="rounded-full border border-border bg-secondary/50 px-7 py-3 font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-secondary"
            >
              Get in Touch
            </MagneticButton>
          </div>

          <div
            className={`flex items-center gap-4 pt-4 transition-all duration-1000 delay-[900ms] ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {[
              { icon: Github, href: "https://github.com/Itskoushik", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/itskoushikram/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:koushik.d.ram@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <MagneticButton
                key={label}
                href={href}
                strength={0.35}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-md hover:shadow-primary/10"
              >
                <Icon size={18} />
                <span className="sr-only">{label}</span>
              </MagneticButton>
            ))}
          </div>
        </div>

        {/* Right - Radar canvas + illustration with parallax */}
        <div
          className={`relative flex-1 flex justify-center transition-all duration-1000 delay-300 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Radar canvas behind the portrait */}
          <canvas
            ref={radarRef}
            className="absolute inset-0 m-auto opacity-30 pointer-events-none"
            style={{
              width: 420,
              height: 420,
              transform: `translate(${parallax.x * -0.2}px, ${parallax.y * -0.2}px)`,
            }}
            aria-hidden="true"
          />

          {/* Decorative rings */}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div
              className="h-[350px] w-[350px] animate-spin-slow rounded-full border border-dashed border-primary/20 sm:h-[420px] sm:w-[420px]"
              style={{ transform: `rotate(${parallax.x}deg)` }}
            />
            <div
              className="absolute h-[300px] w-[300px] rounded-full border border-dashed border-accent/10 sm:h-[370px] sm:w-[370px]"
              style={{ animationDirection: "reverse", animationDuration: "30s", transform: `rotate(${-parallax.x * 0.5}deg)` }}
            />
          </div>

          {/* Hex glow */}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="h-[320px] w-[320px] rounded-full bg-gradient-to-br from-primary/30 via-transparent to-accent/20 blur-3xl sm:h-[400px] sm:w-[400px]" />
          </div>

          <div
            className="relative h-[300px] w-[300px] overflow-hidden rounded-full border-2 border-primary/30 glow-purple sm:h-[380px] sm:w-[380px]"
            style={{ transform: `translate(${parallax.x * 0.5}px, ${parallax.y * 0.5}px)` }}
          >
            <Image
              src="/hero-illustration.jpg"
              alt="Koushik Ram - Developer illustration"
              fill
              className="object-cover"
              priority
            />
            {/* Scan line overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
              style={{ backgroundSize: "100% 4px", backgroundRepeat: "repeat", mixBlendMode: "overlay" }}
              aria-hidden="true"
            />
          </div>

          {/* Floating tech badges with parallax */}
          {floatingIcons.map(({ icon: Icon, label, x, y, delay, color }) => (
            <div
              key={label}
              className="absolute animate-float glass rounded-xl px-3 py-2 text-xs font-medium"
              style={{
                left: x,
                top: y,
                animationDelay: `${delay}s`,
                transform: `translate(${parallax.x * (0.3 + delay * 0.1)}px, ${parallax.y * (0.3 + delay * 0.1)}px)`,
              }}
            >
              <span className={`flex items-center gap-1.5 ${color}`}>
                <Icon size={14} />
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Scroll Down</span>
        <div className="flex h-6 w-4 items-start justify-center rounded-full border border-muted-foreground/30 p-1">
          <div className="h-1.5 w-1 animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    </section>
  )
}
