"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/atoms/carousel"

import CardInfo from "@/components/atoms/cardInfo"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { User, BookOpen, GraduationCap, Hourglass, Factory, Unlock } from "lucide-react"

export default function InfoCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  const cards = [
    {
      id: 1,
      icon: User,
      titulo: "Profissionais",
      subtitulo: "Capacitados",
      dados: "+10.000",
    },
    {
      id: 2,
      icon: BookOpen,
      titulo: "Cursos ",
      subtitulo: "Fornecidos",
      dados: "+50",
    },
    {
      id: 3,
      icon: GraduationCap,
      titulo: "Turmas ",
      subtitulo: "qualificadas",
      dados: "+100",
    },
    {
      id: 4,
      icon: Hourglass,
      titulo: "Anos de ",
      subtitulo: "mercado",
      dados: "+50",
    },
    {
      id: 5,
      icon: Factory,
      titulo: "Empresas ",
      subtitulo: "Beneficiadas",
      dados: "+70",
    },
    {
      id: 6,
      icon: Unlock,
      titulo: "Cursos",
      subtitulo: "Gratuitos",
      dados: "+35",
    },
  ]

  return (
    <section className="w-full max-w-full py-4 sm:py-6 flex flex-col items-center overflow-x-hidden">
      <div className="w-full text-center mb-4 sm:mb-6 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] text-[#00579D] font-bold leading-tight">
          Informações sobre a WEG Skills
        </h2>
      </div>
      <div className="w-full max-w-6xl px-4 sm:px-6 flex justify-center items-center">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
          plugins={[plugin.current]}
        >
          <CarouselContent className="-ml-2 md:-ml-4 py-2">
            {cards.map((card) => (
              <CarouselItem
                key={card.id}
                className="pl-2 md:pl-4 basis-full min-[480px]:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center items-center py-2"
              >
                <CardInfo Card={card} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
