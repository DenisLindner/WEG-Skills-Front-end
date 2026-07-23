'use client'

import { useState } from "react";
import { Separator } from "../atoms/separator";
import { Button } from "../atoms/button";

export default function bestCourse() {
    const [ativo1, setAtivo1] = useState(false);
    const [ativo2, setAtivo2] = useState(false);
    const [ativo3, setAtivo3] = useState(false);

    let card1 = {
        link: "",
        alt: "",
        title: "Ferramentaria para Sistemas WEB",
        description: "Como fazer ferramentas para a WEB",
        rate: 5
    }

    let card2 = {
        link: "",
        alt: "",
        title: "Ferramentaria para Sistemas Elétricos",
        description: "Como fazer ferramentas para a eletricista",
        rate: 5
    }

    let card3 = {
        link: "",
        alt: "",
        title: "Ferramentaria para Sistemas Astronômicos",
        description: "Como fazer ferramentas para o Astronômos",
        rate: 5
    }

    let cards = [card1, card2, card3]

    return (
        <div className="bg-[#00335C] h-[70vh] ">
            <div className="flex justify-center items-center flex-col">
                <h2 className="text-white text-[32px] font-bold  my-[30px]">Cursos melhor avaliados</h2>
                <div className=" w-[55%] flex justify-around mb-[30px]">
                    <Button 
                        variant={ativo1 ? "default" : "outline"}
                        onClick={() => setAtivo1(!ativo1)}
                        className={
                            ativo1 ?
                                "border-1px border-white rounded-[6px] text-[#00579D] font-bold w-[8.5rem] h-[2.5rem] bg-[#ffffff] " :
                                "border-1px border-white rounded-[6px] text-[#ffffff] w-[8.5rem] h-[2.5rem] bg-[] "}
                    >Automoção</Button>
                    <Button 
                        variant={ativo2 ? "default" : "outline"}
                        onClick={() => {
                            setAtivo2(!ativo2)
                            setAtivo1(ativo1)
                            setAtivo3(ativo3)
                        }}
                        className={
                            ativo2 ?
                                "border-1px border-white rounded-[6px] text-[#00579D] font-bold w-[8.5rem] h-[2.5rem] bg-[#ffffff] " :
                                "border-1px border-white rounded-[6px] text-[#ffffff] w-[8.5rem] h-[2.5rem] bg-[] "}>Manutenção</Button>
                    <Button 
                        variant={ativo3 ? "default" : "outline"}
                        onClick={() => setAtivo3(!ativo3)}
                        className={
                            ativo3 ?
                                "border-1px border-white rounded-[6px] text-[#00579D] font-bold w-[8.5rem] h-[2.5rem] bg-[#ffffff] " :
                                "border-1px border-white rounded-[6px] text-[#ffffff] w-[8.5rem] h-[2.5rem] bg-[] "}>Tecnologia</Button>
                </div>
            </div>
            <div className="flex justify-center">
                <Separator className={"w-[90vw] h-[2px] "} />
            </div>
            <div>
                {
                    cards.map((card) => (
                        <>
                        </>
                    ))
                }
            </div>
        </div>
    )
}