"use client"

import { useRef, type ReactNode, type MouseEvent } from "react"
import Link from "next/link"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number
}

export function MagneticButton({ children, className = "", href, onClick, strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)

  const handleMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = "translate(0, 0)"
  }

const isExternal =
  href?.startsWith("http") ||
  href?.startsWith("mailto") ||
  href?.startsWith("tel")

if (href && isExternal) {
  return (
    <a
      ref={ref as any}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </a>
  )
}

if (href) {
  return (
    <Link href={href}>
      <span
        ref={ref as any}
        data-magnetic
        className={`inline-block cursor-pointer transition-transform duration-300 ease-out ${className}`}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </span>
    </Link>
  )
}

return (
  <button
    ref={ref as any}
    onClick={onClick}
    data-magnetic
    className={`inline-block transition-transform duration-300 ease-out ${className}`}
    onMouseMove={handleMove}
    onMouseLeave={handleLeave}
  >
    {children}
  </button>
)

}
