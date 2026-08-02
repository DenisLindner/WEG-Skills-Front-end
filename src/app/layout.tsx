import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: { default: "WEG Skills", template: "%s | WEG Skills" },
    description: "Conhecimento técnico que conecta pessoas, indústria e futuro.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pt-BR">
            <body>{children}</body>
        </html>
    )
}