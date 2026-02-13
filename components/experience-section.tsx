"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Briefcase, GraduationCap, Shield } from "lucide-react"
import { useRef, useEffect, useState } from "react"

const experiences = [
  {
    title: "Python Developer -GUI Development",
    company: "Harvel Systems",
    period: "Dec 2025 - Present",
    description:
      " Machine automation using PyQt5, SCPI, UART, USB for embedded and test equipment integration. Automated UUT testing, data acquisition, and post-processing using Python-based automation frameworks",
    tags: ["Python", "PyQt5", "PySerial", "PyVisa", "SQLite"],
    icon: Shield,
    type: "work" as const,
  },
  {
    title: "QA Automation Testing Trainee",
    company: "PySpiders Rajajinagar",
    period: "MAY 2025 - NOV 2025",
    description:
      "Performed manual testing and automation on real-time projects like ShopperStack and QBank, creatingtest plans, test cases, and scenarios across functional, integration, system, and ad-hoc testing.\n Beta-tested the Steam game 7 Blood Moons, identifying critical issues and contributing to overall gameplay stability. \n Gained hands-on expertise in Advanced Python, Advanced Selenium, API Testing, and SQL, applying these skills to automate workflows, validate backend data, and improve overall product quality during training",
    tags: ["Appium", "ADV Selenium", "Pytest", "ADV Python", "CI/CD","J-meter","Jira","Oracle Sql"],
    icon: Briefcase,
    type: "work" as const,
  },
  {
    title: "UI/UX Designer intern",
    company: "Zidio Development",
    period: "Oct 2024 - Feb 2025",
    description:
      "Redesigned the company website to enhance usability and improved navigation efficiency by 15%. \n Created an Energy drink-based website Nitro-Drink, showcasing design versatility.",
    tags: ["Figma", "Framer", "Webflow", "Canva pro", "Adobe illustrator"],
    icon: Briefcase,
    type: "work" as const,
  },
]

function TimelineDot({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-5 w-5 items-center justify-center">
      <div
        className={`absolute h-5 w-5 rounded-full border-2 border-primary transition-all duration-700 ${
          active ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      />
      {active && (
        <div className="absolute h-5 w-5 animate-ping rounded-full bg-primary/30" />
      )}
      <div
        className={`relative h-2.5 w-2.5 rounded-full bg-primary transition-all duration-500 ${
          active ? "scale-100" : "scale-0"
        }`}
      />
    </div>
  )
}

function TimelineLine({ progress }: { progress: number }) {
  return (
    <div className="absolute left-6 top-0 bottom-0 w-px bg-border/30 sm:left-1/2" aria-hidden="true">
      <div
        className="w-full bg-gradient-to-b from-primary via-accent to-chart-3 transition-all duration-1000 ease-out"
        style={{ height: `${progress}%` }}
      />
    </div>
  )
}

// Scrolling command feed alongside timeline
function CommandFeed({ visible }: { visible: boolean }) {
  const commands = [
    "$ git commit -m 'feat: radar GUI v2.4'",
    "$ pytest mobile_tests/ --parallel=6",
    "$ python deploy_defence_panel.py",
    "$ docker build -t comm-panel:latest .",
    "$ aws s3 sync reports/ s3://test-reports",
  ]
  const [visCount, setVisCount] = useState(0)

  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setVisCount((prev) => {
        if (prev >= commands.length) { clearInterval(interval); return prev }
        return prev + 1
      })
    }, 600)
    return () => clearInterval(interval)
  }, [visible, commands.length])

  return (
    <div className="hidden lg:block absolute -right-4 top-1/4 w-72 opacity-[0.07] font-mono text-xs text-primary space-y-2 pointer-events-none" aria-hidden="true">
      {commands.slice(0, visCount).map((cmd, i) => (
        <div key={i} className="truncate">{cmd}</div>
      ))}
    </div>
  )
}

export function ExperienceSection() {
  const { ref, isVisible } = useScrollReveal()
  const [lineProgress, setLineProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isVisible) return
    let start: number
    const duration = 1500
    const animate = (time: number) => {
      if (!start) start = time
      const elapsed = time - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setLineProgress(eased * 100)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isVisible])

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" aria-hidden="true" />

      <div className="mx-auto max-w-4xl px-6" ref={ref}>
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-chart-3/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-chart-3">
            Journey
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div className="relative" ref={sectionRef}>
          <TimelineLine progress={lineProgress} />
          <CommandFeed visible={isVisible} />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const Icon = exp.icon
              const isLeft = index % 2 === 0
              const isActive = lineProgress > (index / experiences.length) * 100
              return (
                <div
                  key={exp.title}
                  className={`relative flex flex-col sm:flex-row ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  } items-start gap-8 transition-all duration-700 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                  style={{ transitionDelay: isVisible ? `${index * 300}ms` : "0ms" }}
                >
                  <div className={`ml-16 flex-1 sm:ml-0 ${isLeft ? "sm:text-right" : "sm:text-left"}`}>
                    <div className="group rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                      <div className={`flex items-center gap-2 ${isLeft ? "sm:justify-end" : ""}`}>
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${exp.type === "work" ? "bg-primary/10" : "bg-accent/10"}`}>
                          <Icon size={16} className={exp.type === "work" ? "text-primary" : "text-accent"} />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                          {exp.period}
                        </span>
                      </div>

                      <h3 className="mt-3 font-heading text-xl font-bold text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-sm font-medium text-accent">
                        {exp.company}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {exp.description}
                      </p>
                      <div className={`mt-4 flex flex-wrap gap-2 ${isLeft ? "sm:justify-end" : ""}`}>
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-3.5 top-6 z-10 sm:static sm:shrink-0 sm:flex sm:items-start sm:pt-6">
                    <TimelineDot active={isActive} />
                  </div>

                  <div className="hidden flex-1 sm:block" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
