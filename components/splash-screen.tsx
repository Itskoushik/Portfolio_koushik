"use client"

import { useEffect, useRef, useState } from "react"

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [phase, setPhase] = useState<"coding" | "lifting" | "done">("coding")
  const [liftProgress, setLiftProgress] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let raf: number
    let frame = 0

    const totalCodeFrames = 140
    const totalLiftFrames = 50

    const cx = canvas.width / 2
    const cy = canvas.height / 2

    // 🧑‍💻 CODER DRAW
    function drawCoder(x: number, y: number, scale: number, alpha: number, typeFrame: number) {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.translate(x, y)
      ctx.scale(scale, scale)

      ctx.strokeStyle = "hsl(185, 90%, 55%)"
      ctx.lineWidth = 3
      ctx.lineCap = "round"

      // Head
      ctx.beginPath()
      ctx.arc(0, -55, 10, 0, Math.PI * 2)
      ctx.stroke()

      // Body
      ctx.beginPath()
      ctx.moveTo(0, -45)
      ctx.lineTo(0, -15)
      ctx.stroke()

      // Typing arms
      const typeOsc = Math.sin(typeFrame * 0.3) * 3
      ctx.beginPath()
      ctx.moveTo(0, -35)
      ctx.lineTo(20, -22 + typeOsc)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, -35)
      ctx.lineTo(-20, -22 - typeOsc)
      ctx.stroke()

      // Legs
      ctx.beginPath()
      ctx.moveTo(0, -15)
      ctx.lineTo(15, 5)
      ctx.lineTo(15, 25)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, -15)
      ctx.lineTo(-10, 5)
      ctx.lineTo(-10, 25)
      ctx.stroke()

      // Desk
      ctx.strokeStyle = "hsl(260,30%,25%)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(-40, -15)
      ctx.lineTo(40, -15)
      ctx.stroke()

      // Monitor
      ctx.strokeStyle = "hsl(265,90%,65%)"
      ctx.beginPath()
      ctx.rect(-18, -45, 36, 25)
      ctx.stroke()

      // Code glow
      ctx.fillStyle = `hsla(185, 90%, 55%, ${0.5 + Math.sin(typeFrame * 0.2) * 0.3})`
      const lines = Math.min(4, Math.floor(typeFrame / 8))
      for (let i = 0; i < lines; i++) {
        const lineWidth = 8 + Math.random() * 12
        ctx.fillRect(-12, -40 + i * 5, lineWidth, 2)
      }

      ctx.restore()
    }

    // 💻 TERMINAL TEXT SEQUENTIAL (one after another)
    const terminalQueue = [
      "> Compiling assets...",
      "> Injecting scripts...",
      "> Establishing secure connection...",
      "> Running build sequence...",
      "> Accessing root directory...",
      "> Launching dev environment..."
    ]

    let currentLine = ""
    let lineIdx = 0
    let charIdx = 0
    let waitAfterLine = 0
    let allDone = false



    // 🌧 Binary rain bg
    const columns = Math.floor(canvas.width / 14)
    const drops: number[] = Array(columns).fill(0).map(() => Math.random() * -100)

    function drawBinaryRain() {
      ctx.fillStyle = "hsla(265, 90%, 65%, 0.05)"
      ctx.font = "12px monospace"

      for (let i = 0; i < columns; i++) {
        const char = Math.random() > 0.5 ? "1" : "0"
        ctx.fillText(char, i * 14, drops[i] * 14)

        if (drops[i] * 14 > canvas.height && Math.random() > 0.97) {
          drops[i] = 0
        }
        drops[i] += 0.35
      }
    }

    const animate = () => {
      ctx.fillStyle = "hsl(240,20%,4%)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawBinaryRain()

      frame++

      if (!allDone) {
        if (frame === 1) setPhase("coding")

        drawCoder(cx, cy, 1.8, 1, frame)

        // sequential terminal typing (one line at a time)
        if (!allDone) {
          if (frame % 2 === 0 && waitAfterLine === 0) {
            if (charIdx < terminalQueue[lineIdx].length) {
              currentLine += terminalQueue[lineIdx][charIdx]
              charIdx++
            } else {
              waitAfterLine = 20 // pause before next line
            }
          }

          // wait then move to next line
          if (waitAfterLine > 0) {
            waitAfterLine--
            if (waitAfterLine === 0) {
              lineIdx++
              currentLine = ""
              charIdx = 0

              if (lineIdx >= terminalQueue.length) {
                allDone = true
              }
            }
          }
        }

        ctx.font = "15px monospace"
        ctx.fillStyle = "hsl(185,90%,55%)"
        ctx.textAlign = "center"

        ctx.fillText(
          currentLine + (frame % 30 < 15 ? "_" : ""),
          cx,
          cy + 90
        )
      }


      else {
        const liftFrame = frame - totalCodeFrames
        if (liftFrame === 1) setPhase("lifting")

        const liftP = Math.min(liftFrame / totalLiftFrames, 1)
        const eased = liftP * liftP * (3 - 2 * liftP)
        setLiftProgress(eased)

        if (liftP >= 1) {
          setPhase("done")
          onComplete()
          cancelAnimationFrame(raf)
          return
        }
      }

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  if (phase === "done") return null

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
      style={{
        transform: `translateY(${-liftProgress * 100}%)`,
        opacity: 1 - liftProgress,
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="text-xs font-mono text-muted-foreground">
          {phase === "coding" && "Loading ..."}
          {phase === "lifting" && "Welcome."}
        </div>

        <div className="h-0.5 w-48 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-accent to-chart-3"
            style={{
              width: phase === "coding" ? "80%" : "100%",
              transition: "width 0.3s",
            }}
          />
        </div>
      </div>
    </div>
  )
}
