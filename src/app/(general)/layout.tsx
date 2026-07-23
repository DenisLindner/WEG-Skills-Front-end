import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/molecules/header";
import Footer from "@/components/molecules/footer";

const interSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WEG Skills",
  description: "Buildt by CentroWEG",
};

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-BR" className={`${interSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header/>
        {children}
        <Footer />
      </body>
    </html>
  );

}
