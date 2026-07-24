"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/atoms/carousel";

import CardInfo from "@/components/atoms/cardInfo";
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

export default function InfoCarousel() {
    
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    let card1 = {
        id: 1,
        icon:"/assets/icons/circle-user-solid-full.svg",
        alt:"Um profissional capacitado",
        titulo: "Profissionais",
        subtitulo: "Capacitados",
        dados: "+10.000"
    }

    let card2 = {
        id: 2,
        icon:"/assets/icons/book-solid-full.svg",
        alt:"Um livro",
        titulo: "Cursos ",
        subtitulo: "Fornecidos",
        dados: "+50"
    }

    let card3 = {
        id: 3,
        icon:"/assets/icons/chalkboard-user-solid-full.svg",
        alt:"Pessoa utilizando um quadro branco",
        titulo: "Turmas ",
        subtitulo: "qualificadas",
        dados: "+100"
    }

    let card4 = {
        id: 4,
        icon:"/assets/icons/hourglass-solid-full.svg",
        alt:"Uma ampulheta",
        titulo: "Anos de ",
        subtitulo: "mercado",
        dados: "+50"
    }

    let card5 = {
        id: 5,
        icon:"/assets/icons/industry-solid-full.svg",
        alt:"Uma empresa",
        titulo: "Empresas ",
        subtitulo: "Beneficiadas",
        dados: "+70"
    }

    let card6 = {
        id: 6,
        icon:"/assets/icons/unlock-solid-full.svg",
        alt:"Uma cadeado aberto",
        titulo: "Cursos",
        subtitulo: "Gratuitos",
        dados: "+35"
    }

    let cards = [
        card1, card2, card3, card4, card5, card6
    ]

    return (
        <section className="h-fit flex items-center flex-col mt-[5vh]">
            <div className=""><h2 className="text-[50px] text-[#00579D] font-bold w-full text-center ">Informação sobre a WEG Skills</h2></div>
            <div className="flex justify-center items-center">
                <Carousel className="w-[100%]"
                    plugins={[plugin.current]}
                    onMouseEnter={() => plugin.current.stop()}
                    onMouseLeave={() => plugin.current.reset()}
                >
                    <CarouselContent className="-ml-1">
                        {cards.map((card) => (
                            <CarouselItem key={card.id} className="basis-full pl-[12px] min-[376px]:basis-1/2  md:basis-1/3 lg:basis-1/4 flex items-center shrink-0">
                                <CardInfo Card={card} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}
