"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/atoms/button"

export interface HeroPageConfig {
  title: React.ReactNode
  imageSrc: string
  hasButton?: boolean
  buttonText?: string
  buttonHref?: string
}

// Configurações das páginas para centralizar dados do Hero
export const HERO_PAGES_CONFIG: Record<string, HeroPageConfig> = {
  home: {
    title: (
      <>
        O mundo pede a<br />
        <span className="font-bold">WEG</span> faz
      </>
    ),
    imageSrc: "/assets/images/fabric.png",
    hasButton: true,
    buttonText: "Cursos",
    buttonHref: "#cursos",
  },
  courses: {
    title: (
      <>
        Conheça nossos<br />
        <span className="font-bold">Cursos</span>
      </>
    ),
    imageSrc: "/assets/images/web-tools.jpg",
    hasButton: false,
  },
  about: {
    title: (
      <>
        Sobre a<br />
        <span className="font-bold">WEG Skills</span>
      </>
    ),
    imageSrc: "/assets/images/astronomical-tools.jpg",
    hasButton: false,
  },
  certificate: {
    title: (
      <>
        Emissão de<br />
        <span className="font-bold">Certificados</span>
      </>
    ),
    imageSrc: "/assets/images/eletric-tools.jpg",
    hasButton: true,
    buttonText: "Emitir",
    buttonHref: "#emitir",
  },
}

interface HeroProps {
  page?: keyof typeof HERO_PAGES_CONFIG | string
  title?: React.ReactNode
  imageSrc?: string
  hasButton?: boolean
  buttonText?: string
  buttonHref?: string
  className?: string
}

export default function Hero({
  page = "home",
  title,
  imageSrc,
  hasButton,
  buttonText,
  buttonHref,
  className = "",
}: HeroProps) {
  // Obtém configuração pré-definida da página (se existir)
  const pageConfig = HERO_PAGES_CONFIG[page as string] || {}

  // Resolve os valores (props explícitas têm prioridade sobre o objeto de config)
  const finalTitle = title ?? pageConfig.title ?? "WEG Skills"
  const finalImageSrc = imageSrc ?? pageConfig.imageSrc ?? "/assets/images/fabric.png"
  const finalHasButton = hasButton ?? pageConfig.hasButton ?? false
  const finalButtonText = buttonText ?? pageConfig.buttonText ?? "Cursos"
  const finalButtonHref = buttonHref ?? pageConfig.buttonHref ?? "#"

  return (
    <section className={`relative w-full overflow-hidden bg-[#00335C] ${className}`}>
      {/* Background Image com Blur e Overlay Gradiente Escuro */}
      <div className="absolute inset-0 z-0">
        <Image
          src={finalImageSrc}
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center filter blur-[2px] scale-105"
        />
        {/* Overlay escuro com sutil gradiente lateral para melhor contraste e profundidade */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/45 to-black/30" />
      </div>

      {/* Conteúdo sobre a imagem - Deslocado mais para a direita conforme pedido */}
      <div className="relative z-10 mx-auto flex min-h-[380px] sm:min-h-[460px] md:min-h-[520px] w-full max-w-[90%] flex-col justify-center py-10 pl-4 sm:pl-16 md:pl-24 lg:pl-32">
        <div className="w-full max-w-2xl text-left">
          {/* Título Principal sempre em 2 linhas com font-light no texto e font-bold na WEG */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-light text-white leading-[1.15] tracking-tight">
            {finalTitle}
          </h1>

          {/* Linha separadora branca fina com margem ajustada */}
          <div className="mt-5 sm:mt-6 mb-6 sm:mb-8 h-[2px] w-full max-w-[340px] sm:max-w-[440px] bg-white/85 shadow-sm" />

          {/* Botão idêntico à print (com texto Cursos em font-bold azul) */}
          {finalHasButton && (
            <div>
              <Button
                nativeButton={false}
                render={<Link href={finalButtonHref} />}
                className="bg-white text-[#00579D] font-bold px-8 sm:px-11 py-2 sm:py-2.5 h-auto text-base sm:text-lg rounded-lg transition-all duration-300 hover:bg-[#ffffff00] hover:text-white border-2 border-white shadow-md hover:shadow-lg inline-flex items-center justify-center min-w-[130px] sm:min-w-[150px] text-center cursor-pointer"
              >
                {finalButtonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
