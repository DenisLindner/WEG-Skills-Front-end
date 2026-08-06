import {getSession} from "@/lib/session";
import {CourseWithRating} from "@/types/course/course-with-rating";
import Image from "next/image";
import {ArrowRight, BookOpenCheck, Gauge, ShieldCheck} from "lucide-react";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {courseService} from "@/services/course.service";
import {CourseCard} from "@/components/shared/course-card";

export default async function Home() {
    const session = await getSession()
    let courses: CourseWithRating[]
    try {
        courses = await courseService.topCourses()
    } catch {
        courses = []
    }

    return (
        <main>
            <section className="relative isolate min-h-162.5 overflow-hidden bg-[#003057] text-white">
                <Image src="/assets/images/class.jpg" alt="Ambiente de aprendizagem técnica" fill priority
                       className="object-cover opacity-45" sizes="100vw"/>
                <div className="absolute inset-0 bg-linear-to-r from-[#002b4d] via-[#003057]/90 to-[#003057]/30"/>
                <div className="content-grid relative flex min-h-162.5 items-center py-20">
                    <div className="max-w-3xl space-y-7">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                            Conhecimento que movimenta a indústria
                        </div>
                        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">Aprenda hoje. Transforme o amanhã.</h1>
                        <p className="max-w-2xl text-balance text-lg leading-relaxed text-white/78 sm:text-xl">Uma plataforma para desenvolver competências técnicas com a experiência e a excelência WEG.</p>
                        <div className="flex flex-wrap gap-3">
                            <Link href={session.authenticated ? "/courses" : "/register"} className={buttonVariants({size: "lg"})}>{session.authenticated ? "Explorar cursos" : "Começar agora"}<ArrowRight/></Link>
                            <Link href="/about" className={buttonVariants({
                                variant: "outline",
                                size: "lg",
                                className: "border-white/35 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                            })}>Conhecer a plataforma</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content-grid -mt-10 relative z-10 grid gap-4 pb-20 sm:grid-cols-3">
                <Card className="p-6 shadow-lg">
                    <BookOpenCheck className="mb-5 size-8 text-primary"/>
                    <h2 className="mb-2 font-semibold">Aprendizado estruturado</h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">Cursos organizados em módulos e aulas para avançar no seu ritmo.</p>
                </Card>
                <Card className="p-6 shadow-lg">
                    <Gauge className="mb-5 size-8 text-primary"/>
                    <h2 className="mb-2 font-semibold">Progresso visível</h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">Acompanhe cada etapa concluída e saiba exatamente onde continuar.</p>
                </Card>
                <Card className="p-6 shadow-lg">
                    <ShieldCheck className="mb-5 size-8 text-primary"/>
                    <h2 className="mb-2 font-semibold">Certificação verificável</h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">Certificados com código público de validação ao finalizar o curso.</p>
                </Card>
            </section>

            <section className="content-grid pb-24">
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">Mais
                        procurados</p><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Cursos em
                        destaque</h2></div>
                    <Link href={session.authenticated ? "/courses" : "/login"}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Ver
                        catálogo completo <ArrowRight className="size-4"/></Link></div>
                {courses.length ?
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{courses.map((course) => <CourseCard key={course.id} course={course}/>)}</div>
                    : <Card className="border-dashed p-10 text-center text-muted-foreground">Os cursos em destaque parecerão aqui assim que estiverem disponíveis.</Card>}
            </section>
        </main>
    )
}
