"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const indicatorRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Active section detection
      const sections = navLinks.map((l) => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animate indicator position
  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return
    const activeLink = navRef.current.querySelector(`[data-section="${activeSection}"]`) as HTMLElement
    if (activeLink) {
      const rect = activeLink.getBoundingClientRect()
      const navRect = navRef.current.getBoundingClientRect()
      indicatorRef.current.style.left = `${rect.left - navRect.left}px`
      indicatorRef.current.style.width = `${rect.width}px`
    }
  }, [activeSection])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong py-3 shadow-lg shadow-primary/5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <MagneticButton href="https://www.linkedin.com/in/itskoushikram/" strength={0.2} className="font-heading text-xl font-bold tracking-tight gradient-text">
          {'<KR />'}
        </MagneticButton>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex relative" ref={navRef}>
          {/* Sliding active indicator */}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-0.5 rounded-full bg-primary transition-all duration-300 ease-out"
            aria-hidden="true"
          />
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-section={link.href.slice(1)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                activeSection === link.href.slice(1)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          <MagneticButton
            href="https://drive.google.com/file/d/1SKpXqPE2oakdeVVslUr5dUTqyoQ4547n/view?usp=sharing"
            strength={0.25}
            className="ml-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            Hire Me
          </MagneticButton>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-10 text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          <div className="relative h-6 w-6">
            <Menu
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
            />
            <X
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile nav with slide animation */}
      <div
        className={`mx-4 mt-2 overflow-hidden transition-all duration-500 ease-out md:hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-strong rounded-2xl p-4">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                activeSection === link.href.slice(1)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
              style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  )
}
