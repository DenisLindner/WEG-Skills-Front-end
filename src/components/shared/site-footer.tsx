import Link from "next/link"
import { ExternalLink, PlayCircle } from "lucide-react"
import { Logo } from "./logo"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#003057] text-white">
      <div className="content-grid grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4"><Logo inverse /><p className="max-w-md text-sm leading-relaxed text-white/70">Capacitação técnica acessível, organizada e conectada às necessidades da indústria.</p></div>
        <div><h2 className="mb-3 text-sm font-semibold">Explore</h2><nav className="flex flex-col gap-2 text-sm text-white/70"><Link href="/courses">Cursos</Link><Link href="/certificate">Validar certificado</Link><Link href="/about">Sobre o projeto</Link></nav></div>
        <div><h2 className="mb-3 text-sm font-semibold">WEG</h2><div className="flex gap-3"><a href="https://www.linkedin.com/company/weg" target="_blank" rel="noreferrer" className="rounded-lg bg-white/10 p-2 hover:bg-white/20"><ExternalLink className="size-5" /><span className="sr-only">LinkedIn</span></a><a href="https://www.youtube.com/user/wegnetbr" target="_blank" rel="noreferrer" className="rounded-lg bg-white/10 p-2 hover:bg-white/20"><PlayCircle className="size-5" /><span className="sr-only">YouTube</span></a></div></div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/55">© {new Date().getFullYear()} WEG Skills. Plataforma educacional.</div>
    </footer>
  )
}
