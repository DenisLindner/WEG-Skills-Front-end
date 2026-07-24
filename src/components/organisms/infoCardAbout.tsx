import { Card, CardContent } from "../atoms/card"
import Image from "next/image"
export default function infoCardAbout(){
    return(
        <section className="mt">
            <div className="flex flex-row">
                <Card className="w-[27rem] h-[18rem]">
                    <h2>O que é?</h2>
                    <CardContent>
                        <p>WEG Skills é uma plataforma de aprendizagem e desenvolvimento criada para capacitar colaboradores por meio de cursos, 
                            treinamentos e trilhas de conhecimento. Seu objetivo é estimular o aprendizado contínuo, desenvolver competências 
                            técnicas e comportamentais e apoiar o crescimento profissional, alinhando o desenvolvimento das pessoas às necessidades da empresa.</p>
                    </CardContent>
                </Card>
                <Image src="" alt="" width={500} height={200}/>
            </div>
            <div className="flex flex-row">
                <Image src="" alt="" width={500} height={200}/>
                <Card className="w-[27rem] h-[18rem]">
                    <h2>Motivo da criação</h2>
                    <CardContent>
                        <p>O WEG Skills foi desenvolvido para centralizar o acesso ao conhecimento e incentivar uma cultura de aprendizagem contínua.
                        A plataforma facilita a qualificação dos colaboradores, padroniza treinamentos, acompanha a evolução individual e prepara equipes
                         para os desafios tecnológicos e organizacionais, contribuindo para a inovação e a competitividade da WEG.</p>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-row">
                <Card className="w-[27rem] h-[18rem]">
                    <h2>Parceiros</h2>
                    <CardContent>
                        <p>
                            O WEG Skills reúne conteúdos produzidos pela própria WEG e por instituições especializadas em educação e tecnologia. 
                            Por meio dessas parcerias, os colaboradores têm acesso a cursos atualizados, certificações, materiais didáticos e 
                            trilhas de aprendizagem que ampliam seus conhecimentos e fortalecem seu desenvolvimento profissional.
                        </p>
                    </CardContent>
                </Card>
                <Image src="" alt="" width={500} height={200}/>
            </div>
        </section>
    )
}