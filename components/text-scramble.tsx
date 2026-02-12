"use client"

import { useEffect, useState, useRef } from "react"

const chars = "!@#$%^&*()_+{}|:<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

interface TextScrambleProps {
  text: string
  className?: string
  trigger?: boolean
  speed?: number
}

export function TextScramble({ text, className = "", trigger = true, speed = 30 }: TextScrambleProps) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const iteration = useRef(0)

  useEffect(() => {
    if (!trigger) {
      setDisplayed("")
      setDone(false)
      iteration.current = 0
      return
    }

    iteration.current = 0
    setDone(false)

    const interval = setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iteration.current) return text[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      )

      iteration.current += 0.5

      if (iteration.current >= text.length) {
        setDisplayed(text)
        setDone(true)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, trigger, speed])

  return <span className={className}>{displayed || text}</span>
}
