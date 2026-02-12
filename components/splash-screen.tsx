'use client'

import { useEffect, useState, useRef } from 'react'
import { ParticleField } from "@/components/particle-field"
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400','600','700','800'],
  variable: '--font-orbitron'
})

export function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Fix hydration mismatch by using state instead of random
  useEffect(() => {
    setAnimationKey(Math.random())
  }, [])

  useEffect(() => {
    // Initialize audio context on first interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
    }

    window.addEventListener('click', initAudio)
    window.addEventListener('touchstart', initAudio)

    return () => {
      window.removeEventListener('click', initAudio)
      window.removeEventListener('touchstart', initAudio)
    }
  }, [])

  // Sound effect generator
  const playSound = (frequency: number, duration: number, type: 'sine' | 'square' = 'sine') => {
    if (!audioContextRef.current) return

    const ctx = audioContextRef.current
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = type
    osc.frequency.setValueAtTime(frequency, ctx.currentTime)
    osc.connect(gain)
    gain.connect(ctx.destination)

    gain.gain.setValueAtTime(0.1, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration)
  }

  // Trigger sounds for each stage
  useEffect(() => {
    if (stage === 1) {
      // Power on beep
      playSound(440, 0.1)
      playSound(550, 0.1)
    } else if (stage === 2) {
      // Eyes light up sound
      playSound(880, 0.15, 'sine')
      setTimeout(() => playSound(1200, 0.15, 'sine'), 100)
    } else if (stage === 3) {
      // Scan sound
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          playSound(600 + i * 100, 0.08, 'square')
        }, i * 120)
      }
    } else if (stage === 4) {
      // Success sound
      playSound(800, 0.1)
      setTimeout(() => playSound(1000, 0.15), 100)
      setTimeout(() => playSound(1200, 0.2), 200)
    }
  }, [stage])
  // ===== PHASE TEXTS =====
  const phaseMessages = [
  "Initializing secure interface...",
  "Loading intelligence core...",
  "Calibrating system modules...",
  "Running diagnostics...",
  "Systems online",
  "Welcome !"
]

  // Sequence animation stages
  useEffect(() => {
    const timings = [
      500,  // Initial delay
      1200, // Power core lights up
      1000, // Eyes glow
      1500, // Robot scans
      1200, // Text appears
      800,  // Hold and transition
    ]

    let currentStage = 0
    const timer = setInterval(() => {
      currentStage += 1
      if (currentStage >= timings.length) {
        clearInterval(timer)
        onComplete?.()
      } else {
        setStage(currentStage)
      }
    }, timings[currentStage])

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className={`fixed inset-0 flex items-center justify-center overflow-hidden bg-[#06070d] ${orbitron.variable}`}>
  
      {/* Particle background */}
      <ParticleField />

      {/* Purple glow orb */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/20 blur-[140px] rounded-full" />
      
      {/* Cyan glow orb */}
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-cyan-500/20 blur-[140px] rounded-full" />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      {/* Floating particles - fixed with deterministic positioning */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20"
            style={{
              left: `${15 + (i * 12.5)}%`,
              top: `${20 + (i % 3) * 30}%`,
              animation: `float-up ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="relative flex flex-col items-center justify-center gap-8">
        {/* Robot SVG */}
        <div className="relative w-64 h-64">
          <svg
            viewBox="0 0 200 240"
            className="w-full h-full"
            key={`robot-${animationKey}`}
          >
            {/* Shadow */}
            <ellipse cx="100" cy="210" rx="50" ry="12" fill="#d0d5dd" opacity="0.4" />

            {/* Body - Main rounded shape */}
            <g>
              {/* Body background glow */}
              <defs>
                <radialGradient id="bodyGlow" cx="50%" cy="40%">
                  <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="50%" stopColor="#1e40af" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </linearGradient>
              </defs>

              {/* Body circle */}
              <circle cx="100" cy="110" r="65" fill="url(#bodyGradient)" strokeWidth="2" stroke="#0c4a6e" />
              <circle cx="100" cy="110" r="65" fill="url(#bodyGlow)" />
            </g>

            {/* Left Arm */}
            <g>
              <ellipse cx="35" cy="100" rx="18" ry="28" fill="#1e40af" stroke="#0c4a6e" strokeWidth="2" />
              <circle cx="25" cy="125" r="12" fill="#1e40af" stroke="#0c4a6e" strokeWidth="2" />
            </g>

            {/* Right Arm */}
            <g>
              <ellipse cx="165" cy="100" rx="18" ry="28" fill="#1e40af" stroke="#0c4a6e" strokeWidth="2" />
              <circle cx="175" cy="125" r="12" fill="#1e40af" stroke="#0c4a6e" strokeWidth="2" />
            </g>

            {/* Eyes Container - with glow effect */}
            <g>
              <defs>
                <filter id="eyeGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Left Eye White */}
              <circle cx="75" cy="85" r="20" fill="#ffffff" stroke="#0c4a6e" strokeWidth="2" />

              {/* Left Eye Pupil with glow */}
              <g filter="url(#eyeGlow)">
                <defs>
                  <radialGradient id="eyePupilLeft" cx="35%" cy="35%">
                    <stop offset="0%" stopColor="#7dd3fc" />
                    <stop offset="50%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </radialGradient>
                </defs>
                <circle
                  cx="75"
                  cy="85"
                  r="14"
                  fill="url(#eyePupilLeft)"
                  style={{
                    animation: 'eye-blink 3.2s infinite',
                    opacity: 1,
                  }}
                />
                {/* Eye shine */}
                <circle cx="71" cy="81" r="5" fill="#ffffff" opacity={stage >= 2 ? 0.7 : 0} />
              </g>

              {/* Right Eye White */}
              <circle cx="125" cy="85" r="20" fill="#ffffff" stroke="#0c4a6e" strokeWidth="2" />

              {/* Right Eye Pupil with glow */}
              <g filter="url(#eyeGlow)">
                <defs>
                  <radialGradient id="eyePupilRight" cx="35%" cy="35%">
                    <stop offset="0%" stopColor="#7dd3fc" />
                    <stop offset="50%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </radialGradient>
                </defs>
                <circle
                  cx="125"
                  cy="85"
                  r="14"
                  fill="url(#eyePupilRight)"
                  style={{
                      animation: 'eye-blink 3.2s infinite',
                      opacity: 1,
                    }}

                />
                {/* Eye shine */}
                <circle cx="121" cy="81" r="5" fill="#ffffff" opacity={stage >= 2 ? 0.7 : 0} />
              </g>
            </g>

            {/* Mouth/Speaker area - cyan accent */}
            <g>
              <defs>
                <linearGradient id="mouthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
              </defs>
              <rect
                x="70"
                y="135"
                width="60"
                height="28"
                rx="6"
                fill="url(#mouthGradient)"
                stroke="#0c4a6e"
                strokeWidth="2"
              />
              {/* Speaker lines */}
              <line x1="80" y1="145" x2="80" y2="158" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
              <line x1="95" y1="142" x2="95" y2="161" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
              <line x1="110" y1="143" x2="110" y2="160" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
              <line x1="125" y1="145" x2="125" y2="158" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
            </g>

            {/* Antenna left */}
            <g>
              <line x1="65" y1="35" x2="55" y2="15" stroke="#0c4a6e" strokeWidth="3" strokeLinecap="round" />
              <circle cx="55" cy="15" r="4" fill="#06b6d4" stroke="#0c4a6e" strokeWidth="1" />
            </g>

            {/* Antenna right */}
            <g>
              <line x1="135" y1="35" x2="145" y2="15" stroke="#0c4a6e" strokeWidth="3" strokeLinecap="round" />
              <circle cx="145" cy="15" r="4" fill="#06b6d4" stroke="#0c4a6e" strokeWidth="1" />
            </g>

            {/* Scan line - appears at stage 3 */}
            {stage >= 3 && (
              <g style={{ animation: 'robot-scan 1.5s ease-in-out' }}>
                <line
                  x1="40"
                  y1="110"
                  x2="160"
                  y2="110"
                  stroke="#06b6d4"
                  strokeWidth="2"
                  opacity="0.8"
                  style={{
                    filter: 'drop-shadow(0 0 8px #06b6d4)',
                  }}
                />
              </g>
            )}
          </svg>
        </div>

        {/* Dynamic Boot Text */}
        <div className="text-center h-[80px] flex flex-col justify-center">

          <h1
            key={stage}
            className="text-xl md:text-1.5xl font-semibold text-white tracking-[0.5em]"
            style={{
              fontFamily: "var(--font-orbitron)", letterSpacing: "4px",
              animation: "fadeSlide 0.5s ease",
              textShadow: stage >= 4 ? "0 0 15px rgba(14,165,233,0.5)" : "none"
            }}
          >
            {phaseMessages[Math.min(stage, phaseMessages.length - 1)]}
          </h1>


        </div>

        <p
            className="text-cyan-400 text-[12px] mt-4 tracking-[0.4em]"
            style={{
              fontFamily: "var(--font-orbitron)", 
              letterSpacing: "2px",     
              opacity: stage >= 1 ? 0.7 : 0,
              transition: "0.5s"
            }}
          >
            Initializing portfolio...
          </p>
        {/* Progress indicator */}
        
        <div className="flex gap-2 mt-4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={`progress-${i}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: stage > i ? '24px' : '6px',
                backgroundColor: stage > i ? '#0ea5e9' : '#cbd5e1',
              }}
            />
          ))}
        </div>
        
      </div>
      <style>{`
@keyframes eye-blink{
  0%, 92%, 100% { opacity: 1; }
  95% { opacity: 0; }
  97% { opacity: 1; }
}


@keyframes fadeSlide{
  from{opacity:0; transform:translateY(10px)}
  to{opacity:1; transform:translateY(0)}
}
`}</style>

    </div>
  )
}
