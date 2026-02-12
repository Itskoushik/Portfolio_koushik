"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
  baseX: number
  baseY: number
  pulse: number
  pulseSpeed: number
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const particles: Particle[] = []
    const mouse = { x: -1000, y: -1000 }
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Create particles
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 15))
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        hue: Math.random() > 0.6 ? 185 : Math.random() > 0.3 ? 265 : 300,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse interaction - attract within range, repel when very close
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 200) {
          if (dist < 80) {
            // Repel when close
            const force = (80 - dist) / 80
            p.vx += (dx / dist) * force * 0.3
            p.vy += (dy / dist) * force * 0.3
          } else {
            // Gentle orbit around cursor
            const force = (200 - dist) / 200
            p.vx += (-dy / dist) * force * 0.05
            p.vy += (dx / dist) * force * 0.05
          }
        }

        // Slow drift
        p.vx += Math.sin(time + p.pulse) * 0.002
        p.vy += Math.cos(time + p.pulse * 1.3) * 0.002

        // Damping
        p.vx *= 0.985
        p.vy *= 0.985

        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10

        // Pulse size
        p.pulse += p.pulseSpeed
        const currentSize = p.size + Math.sin(p.pulse) * 0.5

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 4)
        gradient.addColorStop(0, `hsla(${p.hue}, 90%, 65%, ${p.opacity})`)
        gradient.addColorStop(0.4, `hsla(${p.hue}, 90%, 65%, ${p.opacity * 0.3})`)
        gradient.addColorStop(1, `hsla(${p.hue}, 90%, 65%, 0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, currentSize * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, currentSize * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 90%, 80%, ${p.opacity * 1.5})`
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const connDist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2)
          if (connDist < 140) {
            const alpha = 0.12 * (1 - connDist / 140)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `hsla(265, 70%, 60%, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }

        // Mouse connection lines
        if (dist < 200) {
          const alpha = 0.2 * (1 - dist / 200)
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `hsla(185, 80%, 55%, ${alpha})`
          ctx.lineWidth = 0.4
          ctx.stroke()
        }
      }

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  )
}
