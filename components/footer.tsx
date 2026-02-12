"use client"

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"

export function Footer() {
  return (
    <footer className="relative border-t border-border/30 py-10">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6">
        <MagneticButton
          href="#home"
          strength={0.3}
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-md hover:shadow-primary/10 -mt-16 mb-4 bg-card"
        >
          <ArrowUp size={16} className="transition-transform group-hover:-translate-y-0.5" />
          <span className="sr-only">Back to top</span>
        </MagneticButton>

        <a href="#home" className="font-heading text-lg font-bold gradient-text">
          {'<KR />'}
        </a>

        <p className="text-center text-sm leading-relaxed text-muted-foreground max-w-md">
          Crafting defence-grade GUI systems, scalable mobile test automation, and robust AI and Python solutions. 
          Footballer at heart, engineer by profession.
        </p>


        <div className="flex items-center gap-4">
          {[
            { icon: Github, href: "https://github.com/Itskoushik", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/itskoushikram/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:koushik.d.ram@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <MagneticButton
              key={label}
              href={href}
              strength={0.3}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon size={16} />
              <span className="sr-only">{label}</span>
            </MagneticButton>
          ))}
        </div>

        <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        <p className="text-xs text-muted-foreground">
          {"\u00A9"} {new Date().getFullYear()} Koushik Ram. Crafted with precision and caffeine.
        </p>
      </div>
    </footer>
  )
}
