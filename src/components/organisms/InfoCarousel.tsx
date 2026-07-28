"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/atoms/carousel";

import CardInfo from "@/components/atoms/cardInfo";
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { User, BookOpen, GraduationCap, Hourglass, Factory, Unlock } from "lucide-react"

export default function InfoCarousel() {
    
    const plugin = React.useRef(
        Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })
    )

    let cards = [
        {
            id: 1,
            icon: User,
            alt: "Um profissional capacitado",
            titulo: "Profissionais",
            subtitulo: "Capacitados",
            dados: "+10.000"
        },
        {
            id: 2,
            icon: BookOpen,
            alt: "Um livro",
            titulo: "Cursos ",
            subtitulo: "Fornecidos",
            dados: "+50"
        },
        {
            id: 3,
            icon: GraduationCap,
            alt: "Pessoa utilizando um quadro branco",
            titulo: "Turmas ",
            subtitulo: "qualificadas",
            dados: "+100"
        },
        {
            id: 4,
            icon: Hourglass,
            alt: "Uma ampulheta",
            titulo: "Anos de ",
            subtitulo: "mercado",
            dados: "+50"
        },
        {
            id: 5,
            icon: Factory,
            alt: "Uma empresa",
            titulo: "Empresas ",
            subtitulo: "Beneficiadas",
            dados: "+70"
        },
        {
            id: 6,
            icon: Unlock,
            alt: "Uma cadeado aberto",
            titulo: "Cursos",
            subtitulo: "Gratuitos",
            dados: "+35"
        }
    ]

    return (
        <section className="h-fit flex items-center flex-col mt-[5vh] w-full max-w-full overflow-hidden">
            <div><h2 className="text-2xl sm:text-4xl md:text-[50px] text-[#00579D] font-bold w-full text-center">Informação sobre a WEG Skills</h2></div>
            <div className="flex justify-center items-center w-full max-w-6xl px-4 overflow-hidden">
                <Carousel className="w-full"
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[plugin.current]}
                >
                    <CarouselContent className="-ml-1">
                        {cards.map((card) => (
                            <CarouselItem key={card.id} className="basis-full pl-[12px] min-[376px]:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center items-center shrink-0">
                                <CardInfo Card={card} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}
