import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full bg-[#f8f9fa] border-t border-slate-200/80 py-10 text-[#005294]">
            <div className="mx-auto max-w-[95%] sm:max-w-[90%] px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
                {/* Card */}
                <div className="w-full bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-sm flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
                    {/* Logo */}
                    <div className="flex flex-col gap-3 max-w-md">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/assets/icons/Logo WEG Skills Azul.svg"
                                alt="WEG Skills Logo"
                                width={150}
                                height={38}
                                className="h-9 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed pt-5">
                            Plataforma de capacitação profissional e desenvolvimento de competências da WEG.
                        </p>
                    </div>

                    {/* Colunas */}
                    <div className="flex flex-row flex-wrap sm:flex-nowrap gap-10 sm:gap-16 lg:gap-24 w-full lg:w-auto">
                        {/* Navegação */}
                        <div className="flex flex-col gap-3 min-w-[140px]">
                            <h4 className="text-sm font-bold text-[#005294]">
                                Navegação
                            </h4>
                            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm font-medium text-slate-600">
                                <li>
                                    <Link href="/" className="hover:text-[#005294] transition-colors">
                                        Início
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#sobre" className="hover:text-[#005294] transition-colors">
                                        Sobre o WEG Skills
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/certificate" className="hover:text-[#005294] transition-colors">
                                        Validar Certificado
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contato */}
                        <div className="flex flex-col gap-3 min-w-[180px]">
                            <h4 className="text-sm font-bold text-[#005294]">
                                Contato
                            </h4>
                            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm font-medium text-slate-600">
                                <li className="flex items-center gap-2 whitespace-nowrap">
                                    <svg
                                        className="w-4 h-4 text-[#005294] shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <Link
                                        href="https://www.weg.net"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-[#005294] transition-colors"
                                    >
                                        www.weg.net
                                    </Link>
                                </li>

                                <li className="flex items-center gap-2 whitespace-nowrap">
                                    <svg
                                        className="w-4 h-4 text-[#005294] shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <span>(47) 3276-4905</span>
                                </li>

                                <li className="flex items-center gap-2 whitespace-nowrap">
                                    <svg
                                        className="w-4 h-4 text-[#005294] shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span>Jaraguá do Sul - SC</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Rodapé */}
                <div className="pt-6 border-t border-slate-200/80 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
                    {/* Copyright e Links */}
                    <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 text-center lg:text-left order-2 lg:order-1">
                        <span className="order-3 lg:order-1">
                            © {currentYear} WEG. Todos os direitos reservados.
                        </span>
                        <div className="flex items-center gap-4 sm:gap-6 order-1 lg:order-2">
                            <Link href="/#privacidade" className="hover:text-[#005294] transition-colors">
                                Política de Privacidade
                            </Link>
                            <Link href="/#termos" className="hover:text-[#005294] transition-colors">
                                Termos de Uso
                            </Link>
                        </div>
                    </div>

                    {/* Redes Sociais */}
                    <div className="flex items-center gap-2 order-1 lg:order-2">
                        <Link
                            href="https://www.linkedin.com/company/weg"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-[#005294] hover:text-white hover:border-[#005294] transition-all shadow-xs"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                            </svg>
                        </Link>

                        <Link
                            href="https://www.youtube.com/user/wegnetbr"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-[#005294] hover:text-white hover:border-[#005294] transition-all shadow-xs"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </Link>

                        <Link
                            href="https://www.instagram.com/wegnet"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-[#005294] hover:text-white hover:border-[#005294] transition-all shadow-xs"
                        >
                            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
