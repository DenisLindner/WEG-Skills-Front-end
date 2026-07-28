'use client'

import { useState } from "react";
import { Separator } from "../atoms/separator";
import { Button } from "../atoms/button";
import { CourseCard } from "@/components/molecules/course-card";

export default function BestCourses() {
    const [ativo1, setAtivo1] = useState(false);
    const [ativo2, setAtivo2] = useState(false);
    const [ativo3, setAtivo3] = useState(false);

    const card1 = {
        ImageLink: "/assets/images/web-tools.jpg",
        title: "Ferramentaria para Sistemas WEB",
        description: "Como fazer ferramentas para a WEB elétrica",
        rate: 10
    }

    const card2 = {
        ImageLink: "/assets/images/eletric-tools.jpg",
        title: "Ferramentaria para Sistemas Elétricos",
        description: "Como fazer ferramentas para os eletricistas",
        rate: 9
    }

    const card3 = {
        ImageLink: "/assets/images/astronomical-tools.jpg",
        title: "Ferramentaria para Sistemas Astronômicos",
        description: "Como fazer ferramentas para os Astrônomos",
        rate: 6.7
    }

    const cards = [card1, card2, card3]

    return (
        <section className="w-full bg-[#00335C] py-8 sm:py-12 flex flex-col justify-center items-center overflow-x-hidden">
            <div className="flex w-full max-w-6xl px-4 justify-center items-center flex-col text-center">
                <h2 className="text-white text-2xl sm:text-3xl md:text-[36px] font-bold my-4 sm:my-6 tracking-tight">
                    Cursos melhor avaliados
                </h2>

                <div className="w-full max-w-xl flex flex-wrap justify-center items-center gap-3 sm:gap-6 mb-6 px-2">
                    <Button 
                        variant={ativo1 ? "default" : "outline"}
                        onClick={() => setAtivo1(!ativo1)}
                        className={
                            ativo1 ?
                                "border border-white rounded-lg text-[#00579D] font-bold px-5 py-2.5 h-auto text-sm bg-white hover:bg-[#00579d] hover:text-white transition-colors cursor-pointer" :
                                "border border-white rounded-lg text-white px-5 py-2.5 h-auto text-sm bg-transparent hover:bg-[#50809d] transition-colors cursor-pointer"
                        }
                    >
                        Automação
                    </Button>
                    <Button 
                        variant={ativo2 ? "default" : "outline"}
                        onClick={() => setAtivo2(!ativo2)}
                        className={
                            ativo2 ?
                                "border border-white rounded-lg text-[#00579D] font-bold px-5 py-2.5 h-auto text-sm bg-white hover:bg-[#00579d] hover:text-white transition-colors cursor-pointer" :
                                "border border-white rounded-lg text-white px-5 py-2.5 h-auto text-sm bg-transparent hover:bg-[#50809d] transition-colors cursor-pointer"
                        }
                    >
                        Manutenção
                    </Button>
                    <Button 
                        variant={ativo3 ? "default" : "outline"}
                        onClick={() => setAtivo3(!ativo3)}
                        className={
                            ativo3 ?
                                "border border-white rounded-lg text-[#00579D] font-bold px-5 py-2.5 h-auto text-sm bg-white hover:bg-[#00579d] hover:text-white transition-colors cursor-pointer" :
                                "border border-white rounded-lg text-white px-5 py-2.5 h-auto text-sm bg-transparent hover:bg-[#50809d] transition-colors cursor-pointer"
                        }
                    >
                        Tecnologia
                    </Button>
                </div>
            </div>

            <div className="flex justify-center w-full max-w-5xl px-6 my-2">
                <Separator className="w-full h-[2px] sm:h-[4px] bg-white/40" />
            </div>

            <div className="w-full max-w-6xl px-4 flex flex-col md:flex-row flex-wrap justify-center items-start my-6 sm:my-10 gap-6 lg:gap-10">
                {cards.map((card, idx) => (
                    <CourseCard
                        key={idx}
                        imageUrl={card.ImageLink}
                        title={card.title}
                        description={card.description}
                        rate={card.rate}
                        className="w-full max-w-xs mx-auto md:mx-0"
                    />
                ))}
            </div>
        </section>
    )
}