import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import Navbar from "./components/Navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { SettingsProvider } from "@/components/settings-provider"
import { LanguageProvider } from "./contexts/LanguageContext"
import Chatbot from "./components/Chatbot"
import Footer from "./components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HealthConnect",
  description: "Comprehensive Healthcare Management System",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-50 min-h-screen flex flex-col`}>
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SettingsProvider>
              <Navbar />
              <main className="flex-grow container mx-auto px-4 py-8 mt-16">{children}</main>
              <Chatbot />
              <Footer />
            </SettingsProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

