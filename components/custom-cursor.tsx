"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Only on desktop
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches === false) return

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const handleDown = () => setClicking(true)
    const handleUp = () => setClicking(false)

    const handleEnter = (e: Event) => {
      const el = e.target as HTMLElement
      if (el.closest("a, button, [role='button'], input, textarea, [data-magnetic]")) {
        setHovering(true)
      }
    }
    const handleLeave = (e: Event) => {
      const el = e.target as HTMLElement
      if (el.closest("a, button, [role='button'], input, textarea, [data-magnetic]")) {
        setHovering(false)
      }
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mousedown", handleDown)
    window.addEventListener("mouseup", handleUp)
    document.addEventListener("mouseover", handleEnter)
    document.addEventListener("mouseout", handleLeave)

    let raf: number
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mousedown", handleDown)
      window.removeEventListener("mouseup", handleUp)
      document.removeEventListener("mouseover", handleEnter)
      document.removeEventListener("mouseout", handleLeave)
    }
  }, [])

  return (
    <>
      {/* Outer ring - trails the mouse */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        aria-hidden="true"
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            hovering
              ? "h-12 w-12 border-primary/80 bg-primary/10"
              : clicking
                ? "h-6 w-6 border-accent/60 bg-accent/10"
                : "h-8 w-8 border-primary/40"
          }`}
        />
      </div>
      {/* Inner dot - sticks to mouse */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        aria-hidden="true"
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            hovering ? "h-1.5 w-1.5 bg-primary" : "h-1 w-1 bg-foreground"
          }`}
        />
      </div>
    </>
  )
}
