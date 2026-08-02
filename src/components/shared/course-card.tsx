import Link from "next/link"
import { ArrowUpRight, ImageIcon, Star } from "lucide-react"
import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge";
import {Course} from "@/types/course/course";
import {CourseWithRating} from "@/types/course/course-with-rating";

export function CourseCard({ course }: { course: Course | CourseWithRating }) {
    const rating = "rating" in course ? course.rating : null
    return (
        <Card className="group overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
            <Link href={`/courses/${course.id}`} className="block focus-visible:ring-inset">
                <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-linear-to-br from-[#dcecf8] to-[#b8d7ee]">
                    {course.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={course.imageUrl} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    ) : <ImageIcon className="size-10 text-primary/35" aria-hidden="true" />}
                    <Badge className="absolute left-3 top-3 bg-white/90 text-primary shadow-sm">{course.status === "PUBLISHED" ? "Publicado" : "Rascunho"}</Badge>
                </div>
                <CardContent className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="line-clamp-2 text-lg font-semibold leading-snug">{course.title}</h3>
                        <ArrowUpRight className="mt-1 size-5 shrink-0 text-primary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="line-clamp-2 min-h-10 text-sm leading-relaxed text-muted-foreground">{course.description || "Conteúdo técnico organizado para apoiar seu desenvolvimento."}</p>
                    {rating !== null &&
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                            <Star className="size-4 fill-amber-400 text-amber-400" />{rating.toFixed(1)}
                            <span className="font-normal text-muted-foreground">/ 10</span>
                        </div>}
                </CardContent>
            </Link>
        </Card>
    )
}

