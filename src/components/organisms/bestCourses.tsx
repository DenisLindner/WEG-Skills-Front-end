'use client'

import { useState } from "react";
import { Separator } from "../atoms/separator";
import { Button } from "../atoms/button";
import { CourseCard } from "@/components/molecules/course-card";
export default function bestCourse() {
    const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);

    let card1 = {
        id: 1,
        /* https://unsplash.com/pt-br/fotografias/tela-de-computador-exibindo-linhas-de-codigo-Pu27coP2jPk */
        ImageLink: "/assets/images/web-tools.jpg",
        title: "Ferramentaria para Sistemas WEB",
        description: "Como fazer ferramentas para a WEB elétrica",
        rate: 10
    }

    let card2 = {
        id: 2,
        /* https://unsplash.com/pt-br/fotografias/tela-de-computador-exibindo-linhas-de-codigo-Pu27coP2jPk */
        ImageLink: "/assets/images/eletric-tools.jpg",
        title: "Ferramentaria para Sistemas Elétricos",
        description: "Como fazer ferramentas para os eletricistas",
        rate: 9
    }

    let card3 = {
        id: 3,
        /* https://unsplash.com/pt-br/fotografias/uma-grande-variedade-de-antenas-parabolicas-sentados-em-cima-de-uma-estrada-de-terra--34L9zLtCcM */
        ImageLink: "/assets/images/astronomical-tools.jpg",
        title: "Ferramentaria para Sistemas Astronômicos",
        description: "Como fazer ferramentas para os Astrônomos",
        rate: 6.7
    }

    const cards = [card1, card2, card3]

    const toggleCategoria = (categoria: string) => {
        setCategoriaAtiva(prev => prev === categoria ? null : categoria);
    };

    return (
        <section className="w-full bg-[#00335C] py-10 flex flex-col justify-center items-center overflow-hidden">
            <div className="flex w-full justify-center items-center flex-col px-4">
                <h2 className="text-white text-2xl sm:text-3xl md:text-[32px] font-bold my-4 text-center">
                    Cursos melhor avaliados
                </h2>
            </div>

            <div className="flex justify-center w-full max-w-5xl px-6 my-2">
                <Separator className="w-full h-[2px] sm:h-[4px] bg-white/40" />
            </div>

            <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 lg:gap-12 w-full max-w-6xl px-4 sm:px-6 my-8">
                {
                    cards.map((card) => (
                        <CourseCard
                            key={card.id}
                            imageUrl={card.ImageLink}
                            title={card.title}
                            description={card.description}
                            rate={card.rate}
                            className="w-full md:w-[280px]"
                        />
                    ))
                }
            </div>
        </section>
    )
}