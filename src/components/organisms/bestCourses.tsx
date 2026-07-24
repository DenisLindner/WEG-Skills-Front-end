'use client'

import { useState } from "react";
import { Separator } from "../atoms/separator";
import { Button } from "../atoms/button";
import {CourseCard} from "@/components/molecules/course-card";
export default function bestCourse() {
    const [ativo1, setAtivo1] = useState(false);
    const [ativo2, setAtivo2] = useState(false);
    const [ativo3, setAtivo3] = useState(false);

    let card1 = {
        id:1,
        /* https://unsplash.com/pt-br/fotografias/tela-de-computador-exibindo-linhas-de-codigo-Pu27coP2jPk */
        ImageLink: "/assets/images/web-tools.jpg",
        title: "Ferramentaria para Sistemas WEB",
        description: "Como fazer ferramentas para a WEB elétrica",
        rate: 10
    }

    let card2 = {
        id:2,
        /* https://unsplash.com/pt-br/fotografias/tela-de-computador-exibindo-linhas-de-codigo-Pu27coP2jPk */
        ImageLink: "/assets/images/eletric-tools.jpg",
        title: "Ferramentaria para Sistemas Elétricos",
        description: "Como fazer ferramentas para os eletricista",
        rate: 9
    }

    let card3 = {
        id:3,
        /* https://unsplash.com/pt-br/fotografias/uma-grande-variedade-de-antenas-parabolicas-sentados-em-cima-de-uma-estrada-de-terra--34L9zLtCcM */
        ImageLink: "/assets/images/astronomical-tools.jpg",
        title: "Ferramentaria para Sistemas Astronômicos",
        description: "Como fazer ferramentas para os Astronômos",
        rate: 6.7
    }

    let cards = [card1, card2, card3]

    return (
        <section className="bg-[#00335C] h-fit flex flex-col justify-center items-center">
            <div className="flex w-[100vw] justify-center items-center flex-col">
                <h2 className="text-white text-[32px] font-bold  my-[30px]">Cursos melhor avaliados</h2>
                <div className=" w-[55%] flex flex-col justify-center items-center gap-[30px]  mb-[30px] min-[475px]:flex-row">
                    <Button 
                        variant={ativo1 ? "default" : "outline"}
                        onClick={() => setAtivo1(!ativo1)}
                        className={
                            ativo1 ?
                                "border-1px border-white rounded-[6px] text-[#00579D] font-bold w-[8.5rem] h-[2.5rem] bg-[#ffffff] hover:bg-[#00579d] hover:text-white" :
                                "border-1px border-white rounded-[6px] text-[#ffffff] w-[8.5rem] h-[2.5rem] bg-[] hover:bg-[#50809d] "}
                    >Automoção</Button>
                    <Button 
                        variant={ativo2 ? "default" : "outline"}
                        onClick={() => {
                            setAtivo2(!ativo2)
                        }}
                        className={
                            ativo2 ?
                                "border-1px border-white rounded-[6px] text-[#00579D] font-bold w-[8.5rem] h-[2.5rem] bg-[#ffffff] hover:bg-[#00579d] hover:text-white" :
                                "border-1px border-white rounded-[6px] text-[#ffffff] w-[8.5rem] h-[2.5rem] bg-[] hover:bg-[#50809d] "}>Manutenção</Button>
                    <Button 
                        variant={ativo3 ? "default" : "outline"}
                        onClick={() => setAtivo3(!ativo3)}
                        className={
                            ativo3 ?
                                "border-1px border-white rounded-[6px] text-[#00579D] font-bold w-[8.5rem] h-[2.5rem] bg-[#ffffff] hover:bg-[#00579d] hover:text-white" :
                                "border-1px border-white rounded-[6px] text-[#ffffff] w-[8.5rem] h-[2.5rem] bg-[] hover:bg-[#50809d]"}>Tecnologia</Button>
                </div>
            </div>
            <div className="flex justify-center w-[90%]">
                <Separator className={"w-[90vw] h-[4px] bg-white"} />
            </div>
            <div className="flex  flex-col justify-center items-center mt-[7vh] mb-[7vh] gap-[20px]  min-[1100px]:gap-[100px] min-[900px]:flex-wrap min-[900]:flex-row min-[850px]:w-[75vw]  ">
                {
                    cards.map((card) => (
                        <CourseCard
                            key={card.id}
                            imageUrl={card.ImageLink}
                            title={card.title}
                            description={card.description}
                            rate={card.rate}
                        />
                    ))
                }
            </div>
        </section>
    )
}