"use client"

import { ExternalLink, Github, Shield, Smartphone, Radar, Terminal, Vote, Music, Sprout, Brain } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { TiltCard } from "@/components/tilt-card"
import { useRef, useEffect, useState } from "react"
import { useMouseParallax } from "@/hooks/use-mouse-parallax"

const projects = [
  {
    title: "Intercom System Test Jig (ISTJ) Software ",
    description:
      "Developed a Python-based ISTJ GUI system for HAL to manage and automate defence test workflows, including secure login, hardware connectivity validation, multi-level approval dashboards, and final report generation.",
    tags: ["Python", "PyQt5", "Pyserial", "SQlite", "PyVisa"],
    icon: Radar,
    color: "accent" as const,
    github: "https://github.com/Itskoushik/ISTJ_software",
    demo: "#",
    featured: true,
  },
  {
    title: "Mobile Test Automation",
    description:
      "End-to-end mobile testing framework supporting Android & iOS with parallel device execution, visual regression testing, and CI/CD integrated reporting dashboards.",
    tags: ["Appium", "Python", "Pytest", "Android Studio"],
    icon: Smartphone,
    color: "primary" as const,
    github: "https://github.com",
    demo: "#",
    featured: false,
  },
    {
    title: "Hayasaka Music Streaming",
    description:
      "Feature-rich streaming app with personalized playlists, real-time audio waveform visualization, and ML-powered recommendation engine.",
    tags: ["React", "Node.js", "MongoDB", "ML"],
    icon: Music,
    color: "chart-3" as const,
    github: "https://github.com/Itskoushik/hayasaka.music",
    demo: "https://hayasakamusic.netlify.app/",
    featured: true,
  },
  {
    title: "Blockchain E-Voting System",
    description:
      "Decentralized voting platform with blockchain-backed transparency, tamper-proof vote recording, real-time counting, and cryptographic voter anonymity.",
    tags: ["Python", "Blockchain", "Meta-Mask", "Solidity", "Ganache"],
    icon: Vote,
    color: "accent" as const,
    github: "https://github.com/Itskoushik/E-Voting-System",
    demo: "#",
    featured: true,
  },
  {
  title: "KrishiBharat- Agri Distribution Platform",
  description:
    "Full-stack agriculture platform connecting distributors and individual farmers with product listings, order management, and role-based dashboards for seamless agri supply chain operations.",
  tags: ["React.js", "Node.js", "MySQL", "HTML", "CSS", "XAMPP"],
  icon: Sprout,
  color: "primary" as const,
  github: "https://github.com/Itskoushik/agri-project",
  demo: "#",
  featured: false,
  },
  {
  title: "EyeCue IntelliSense- Gesture & Eye Controlled Mouse",
  description:
    "AI-powered smart mouse controller enabling hands-free interaction using real-time eye tracking and hand gesture recognition. Designed for accessibility, productivity, and futuristic human-computer interaction.",
  tags: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI", "Computer Vision"],
  icon: Brain, 
  color: "accent" as const,
  github: "https://github.com/Itskoushik/EyeCue-IntelliSense",
  demo: "#",
  featured: false,
},
  

]

const glareColors: Record<string, string> = {
  primary: "rgba(168, 85, 247, 0.15)",
  accent: "rgba(6, 182, 212, 0.15)",
  "chart-3": "rgba(217, 70, 239, 0.15)",
}

const colorMap = {
  primary: {
    border: "border-primary/20 hover:border-primary/50",
    bg: "bg-primary/10",
    text: "text-primary",
    tag: "bg-primary/10 text-primary",
    glow: "via-primary/50",
    shadow: "group-hover:shadow-primary/10",
  },
  accent: {
    border: "border-accent/20 hover:border-accent/50",
    bg: "bg-accent/10",
    text: "text-accent",
    tag: "bg-accent/10 text-accent",
    glow: "via-accent/50",
    shadow: "group-hover:shadow-accent/10",
  },
  "chart-3": {
    border: "border-chart-3/20 hover:border-chart-3/50",
    bg: "bg-chart-3/10",
    text: "text-chart-3",
    tag: "bg-chart-3/10 text-chart-3",
    glow: "via-chart-3/50",
    shadow: "group-hover:shadow-chart-3/10",
  },
}

function AnimatedBorder({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf: number
    let t = 0

    const draw = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const hue = color === "primary" ? 265 : color === "accent" ? 185 : 300
      const perimeter = 2 * (w + h)
      const dotPos = (t * 60) % perimeter
      let dx: number
      let dy: number

      if (dotPos < w) {
        dx = dotPos
        dy = 0
      } else if (dotPos < w + h) {
        dx = w
        dy = dotPos - w
      } else if (dotPos < 2 * w + h) {
        dx = w - (dotPos - w - h)
        dy = h
      } else {
        dx = 0
        dy = h - (dotPos - 2 * w - h)
      }

      const gradient = ctx.createRadialGradient(dx, dy, 0, dx, dy, 80)
      gradient.addColorStop(0, `hsla(${hue}, 90%, 65%, 0.6)`)
      gradient.addColorStop(1, `hsla(${hue}, 90%, 65%, 0)`)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      t += 0.016
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(raf)
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      aria-hidden="true"
    />
  )
}

// Live code terminal inside featured cards
function MiniTerminal({ lines, color }: { lines: string[]; color: string }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= lines.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 400)
    return () => clearInterval(interval)
  }, [inView, lines.length])

  const hueClass = color === "accent" ? "text-accent" : color === "primary" ? "text-primary" : "text-chart-3"

  return (
    <div ref={ref} className="mt-4 rounded-lg bg-background/80 p-3 font-mono text-[10px] leading-relaxed overflow-hidden border border-border/30">
      <div className="flex items-center gap-1.5 mb-2">
        <div className="h-2 w-2 rounded-full bg-destructive/60" />
        <div className="h-2 w-2 rounded-full bg-chart-4/60" />
        <div className="h-2 w-2 rounded-full bg-accent/60" />
        <span className="ml-2 text-muted-foreground text-[9px]">terminal</span>
      </div>
      {lines.slice(0, visibleLines).map((line, i) => (
        <div key={i} className={`${line.startsWith("$") ? "text-muted-foreground" : line.startsWith(">") ? hueClass : "text-foreground/70"}`}>
          {line}
        </div>
      ))}
      {visibleLines < lines.length && (
        <span className="animate-pulse-glow text-primary">_</span>
      )}
    </div>
  )
}

const terminalData: Record<string, string[]> = {
  "Defence Radar GUI System": [
    "$ python radar_gui.py --mode=tracking",
    "> Initializing radar sweep...",
    "> Signal acquired: 3 targets",
    "> Rendering HUD overlay",
    "> Status: OPERATIONAL",
  ],
  "Mobile Test Automation Framework": [
    "$ pytest tests/ --parallel=4",
    "> Discovering 248 test cases...",
    "> Running on 4 devices",
    "> 248/248 passed (0 failed)",
    "> Report: coverage 96.8%",
  ],
}

export function ProjectsSection() {
  const { ref, isVisible } = useScrollReveal()
  const parallax = useMouseParallax(0.3)

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      {/* Floating background decoration */}
      <div
        className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]"
        style={{ transform: `translate(${parallax.x * -0.3}px, ${parallax.y * -0.3}px)` }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6" ref={ref}>
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Portfolio
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Defence systems, mobile testing, and full-stack applications
          </p>
        </div>

        {/* Bento grid layout */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const colors = colorMap[project.color]
            const Icon = project.icon
            const isFeatured = project.featured
            const terminal = terminalData[project.title]
            return (
              <TiltCard
                key={project.title}
                glareColor={glareColors[project.color]}
                className={`group rounded-2xl border ${colors.border} bg-card/60 backdrop-blur-sm transition-all duration-700 hover:shadow-2xl ${colors.shadow} ${
                  isFeatured ? "md:col-span-1 lg:row-span-1" : ""
                } ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
              >
                <AnimatedBorder color={project.color} />

                <div className="relative z-10 p-6">
                  {/* Top glow line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${colors.glow} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                    aria-hidden="true"
                  />

                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon size={24} className={colors.text} />
                    </div>
                    {isFeatured && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {/* Live terminal for featured projects */}
                  {terminal && <MiniTerminal lines={terminal} color={project.color} />}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className={`rounded-full px-3 py-1 text-xs font-medium ${colors.tag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/50 px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
                    >
                      <Github size={14} />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-all ${colors.bg} ${colors.text} hover:opacity-80`}
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
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
