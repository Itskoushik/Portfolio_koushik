"use client"

import { useEffect, useRef, useState } from "react"

interface ParallaxState {
  x: number
  y: number
  rotateX: number
  rotateY: number
}

export function useMouseParallax(intensity = 1) {
  const [state, setState] = useState<ParallaxState>({ x: 0, y: 0, rotateX: 0, rotateY: 0 })
  const raf = useRef<number>(0)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      target.current = {
        x: ((e.clientX - cx) / cx) * intensity,
        y: ((e.clientY - cy) / cy) * intensity,
      }
    }

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08
      current.current.y += (target.current.y - current.current.y) * 0.08

      setState({
        x: current.current.x * 20,
        y: current.current.y * 20,
        rotateX: -current.current.y * 5,
        rotateY: current.current.x * 5,
      })

      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMove)
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      cancelAnimationFrame(raf.current)
    }
  }, [intensity])

  return state
}
