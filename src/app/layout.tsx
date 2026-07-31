import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const interSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL ?? "http://localhost:3000"),
  title: { default: "WEG Skills", template: "%s | WEG Skills" },
  description: "Conhecimento técnico que conecta pessoas, indústria e futuro.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${interSans.variable} antialiased`}>
      <body className="min-h-screen bg-background font-sans text-foreground">{children}</body>
    </html>
  )
}
