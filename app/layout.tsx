import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import clsx from 'clsx'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Rock Paper Scissors Game",
  description: "A simple rock paper scissors game built with Next.js, shadcn/ui and Framer Motion",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, "antialiased min-h-screen")}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
