"use client"
#helloworld
import React from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useState, useRef, useEffect } from "react"
import { Send, Github, Linkedin, Mail, MapPin, Phone, CheckCircle } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"

function RippleInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  textarea = false,
}: {
  id: string
  name: string
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  textarea?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const Tag = textarea ? "textarea" : "input"

  return (
    <div ref={ref} className="relative group">
      <label htmlFor={id} className={`absolute left-4 transition-all duration-300 pointer-events-none ${
        focused || value
          ? "-top-2.5 text-xs font-semibold text-primary bg-card px-1"
          : "top-3.5 text-sm text-muted-foreground"
      }`}>
        {label}
      </label>
      <Tag
        name={name}
        id={id}
        type={type}
        required
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={textarea ? 5 : undefined}
        className={`w-full rounded-xl border bg-card/50 px-4 py-3.5 text-sm text-foreground outline-none transition-all duration-300 ${
          textarea ? "resize-none" : ""
        } ${
          focused
            ? "border-primary/60 shadow-lg shadow-primary/10"
            : "border-border/60 hover:border-border"
        }`}
        placeholder={focused ? placeholder : ""}
      />
      {/* Bottom glow bar */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-primary transition-all duration-300 ${
        focused ? "w-4/5 opacity-100" : "w-0 opacity-0"
      }`} />
    </div>
  )
}

export function ContactSection() {
  const { ref, isVisible } = useScrollReveal()
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
  e.preventDefault()
  setSending(true)

  const formData = new FormData(e.target)

  try {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })

    setSending(false)
    setSent(true)
    setFormState({ name: "", email: "", message: "" })
    setTimeout(() => setSent(false), 3000)
  } catch (err) {
    console.error(err)
    setSending(false)
  }
}


  return (
    <section id="contact" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -bottom-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -top-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6" ref={ref}>
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Contact
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {"Let's "}<span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            {"Whether it’s a project, opportunity, or tech conversation — my inbox is always open :)"}
          </p>
        </div>

        <div
          className={`grid gap-8 lg:grid-cols-5 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Contact info */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm">
              <h3 className="font-heading text-lg font-bold text-foreground">
                Get in Touch
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {"I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."}
              </p>

              <div className="mt-6 space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "koushik.d.ram@gmail.com", color: "primary" },
                  { icon: MapPin, label: "Location", value: "Bengaluru, India", color: "accent" },
                  { icon: Phone, label: "Phone", value: "+91 98860 39692", color: "chart-3" },
                ].map((item, i) => {
                  const Icon = item.icon
                  const bg = item.color === "primary" ? "bg-primary/10" : item.color === "accent" ? "bg-accent/10" : "bg-chart-3/10"
                  const text = item.color === "primary" ? "text-primary" : item.color === "accent" ? "text-accent" : "text-chart-3"
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center gap-3 transition-all duration-500 ${
                        isVisible
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-8 opacity-0"
                      }`}
                      style={{ transitionDelay: isVisible ? `${300 + i * 150}ms` : "0ms" }}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
                        <Icon size={18} className={text} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 flex items-center gap-3">
                {[
                  { icon: Github, href: "https://github.com/Itskoushik", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/itskoushikram/", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:koushik.d.ram@gmail.com", label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <MagneticButton
                    key={label}
                    href={href}
                    strength={0.3}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-md hover:shadow-primary/10"
                  >
                    <Icon size={18} />
                    <span className="sr-only">{label}</span>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <form 
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                {/* Netlify hidden fields */}
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />

            
              <div className="space-y-6">
                <RippleInput
                  id="name"
                  name="name"
                  label="Your Name"
                  placeholder="Binod"
                  value={formState.name}
                  onChange={(v) => setFormState((prev) => ({ ...prev, name: v }))}
                />
                <RippleInput
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Binod@example.com"
                  value={formState.email}
                  onChange={(v) => setFormState((prev) => ({ ...prev, email: v }))}
                />
                <RippleInput
                  id="message"
                  name="message"
                  label="Message"
                  placeholder="What would you like to build or discuss?"
                  value={formState.message}
                  onChange={(v) => setFormState((prev) => ({ ...prev, message: v }))}
                  textarea
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="mt-6 group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-60"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />

                <span className="relative z-10 flex items-center gap-2">
                  {sending ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Sending...
                    </>
                  ) : sent ? (
                    <>
                      <CheckCircle size={16} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      Send Message
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
