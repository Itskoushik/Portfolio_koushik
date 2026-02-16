import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: 'Koushik Ram | QA Automation Engineer & Python Developer',
  description: 'Portfolio of Koushik Ram - QA Automation Engineer, Python Developer, and UI/UX Enthusiast. Building automation systems, scalable apps & stunning interfaces.',
}

export const viewport: Viewport = {
  themeColor: '#7c3aed',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased overflow-x-hidden">
  {children}

  {/* 🔥 Netlify hidden form detection (VERY IMPORTANT) */}
  <form name="contact" method="POST" data-netlify="true" hidden>
    <input type="hidden" name="form-name" value="contact" />
    <input type="text" name="name" />
    <input type="email" name="email" />
    <textarea name="message"></textarea>
  </form>

</body>

    </html>
  )
}
