import type { Metadata } from "next"
import Image from "next/image"
import { BookMarked, Globe2, UsersRound } from "lucide-react"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = { title: "Sobre" }

export default function AboutPage() {
    return (
            <main>
                <section className="bg-[#003057] py-20 text-white">
                    <div className="content-grid grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-sky-300">Sobre o WEG Skills</p>
                            <h1 className="text-balance text-4xl font-bold sm:text-5xl">Conhecimento compartilhado gera transformação.</h1>
                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">O WEG Skills aproxima pessoas de conteúdos técnicos relevantes, com uma experiência de aprendizagem simples, segura e mensurável.</p>
                        </div>
                        <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
                            <Image src="/assets/images/fabric-image.jpg" alt="Ferramentas técnicas organizadas" fill className="object-cover" sizes="(min-width: 1024px) 50vw, height: 100vw" />
                        </div>
                    </div>
                </section>
                <section className="content-grid grid gap-6 py-20 md:grid-cols-3">
                    <Card className="p-7">
                        <BookMarked className="mb-5 size-8 text-primary" />
                        <h2 className="mb-2 text-lg font-semibold">Conteúdo aplicado</h2>
                        <p className="text-sm leading-relaxed text-muted-foreground">Trilhas objetivas para transformar conhecimento em prática.</p>
                    </Card>
                    <Card className="p-7">
                        <UsersRound className="mb-5 size-8 text-primary" />
                        <h2 className="mb-2 text-lg font-semibold">Pessoas no centro</h2>
                        <p className="text-sm leading-relaxed text-muted-foreground">Uma experiência inclusiva, responsiva e acessível em qualquer dispositivo.</p>
                    </Card>
                    <Card className="p-7">
                        <Globe2 className="mb-5 size-8 text-primary" />
                        <h2 className="mb-2 text-lg font-semibold">Aprendizado contínuo</h2>
                        <p className="text-sm leading-relaxed text-muted-foreground">Competências que acompanham a evolução da tecnologia e da indústria.</p>
                    </Card>
                </section>
            </main>
        )
}
