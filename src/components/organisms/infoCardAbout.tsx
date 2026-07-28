import { Card, CardContent } from "../atoms/card"
import Image from "next/image"
export default function infoCardAbout() {
    return (
        <section className="pt-[5rem] pb-[5rem] flex flex-col items-center justify-center w-[100%]  gap-[50px] bg-[#00335C] ">
            <div className="hidden min-[768px]:flex flex-row gap-[50px] items-center">
                <Card className="w-[27rem] h-[20rem] shadow-[-8px_0px_15px_#00000050]">
                    <CardContent>
                        <h2 className="text-[2rem] text-[#00335C] font-bold">O que é?</h2>
                        <p className="text-[1rem]">WEG Skills é uma plataforma de aprendizagem e desenvolvimento criada para capacitar colaboradores por meio de cursos,
                            treinamentos e trilhas de conhecimento. Seu objetivo é estimular o aprendizado contínuo, desenvolver competências
                            técnicas e comportamentais e apoiar o crescimento profissional, alinhando o desenvolvimento das pessoas às necessidades da empresa.</p>
                    </CardContent>
                </Card>
                <Image src="" alt="" width={500} height={200} className="w-[20rem] h-[15rem]" />
            </div>
            <div className="hidden min-[768px]:flex flex-row gap-[50px] items-center">
                <Image src="" alt="" width={500} height={200} className="w-[20rem] h-[15rem]" />
                <Card className="w-[27rem] h-[18rem] shadow-[8px_0px_15px_#00000050]">
                    <CardContent>
                        <h2 className="text-[2rem] text-[#00335C] font-bold">Motivo da criação</h2>
                        <p className="text-[1rem]">O WEG Skills foi desenvolvido para centralizar o acesso ao conhecimento e incentivar uma cultura de aprendizagem contínua.
                            A plataforma facilita a qualificação dos colaboradores, padroniza treinamentos, acompanha a evolução individual e prepara equipes
                            para os desafios tecnológicos e organizacionais, contribuindo para a inovação e a competitividade da WEG.</p>
                    </CardContent>
                </Card>
            </div>
            <div className="hidden min-[768px]:flex flex-row gap-[50px] items-center">
                <Card className="w-[27rem] h-[18rem] shadow-[-8px_0px_15px_#00000050]">
                    <CardContent>
                        <h2 className="text-[2rem] text-[#00335C] font-bold">Parceiros</h2>
                        <p className="text-[1rem]">
                            O WEG Skills reúne conteúdos produzidos pela própria WEG e por instituições especializadas em educação e tecnologia.
                            Por meio dessas parcerias, os colaboradores têm acesso a cursos atualizados, certificações, materiais didáticos e
                            trilhas de aprendizagem que ampliam seus conhecimentos e fortalecem seu desenvolvimento profissional.
                        </p>
                    </CardContent>
                </Card>
                <Image src="" alt="" width={500} height={200} className="w-[20rem] h-[15rem]" />
            </div>
        </section>
    )
}