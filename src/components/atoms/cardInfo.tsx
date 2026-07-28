import { LucideIcon } from "lucide-react"

export default function InfoCard({ Card }: { Card: { icon: LucideIcon; titulo: string; subtitulo: string; dados: string; alt?: string } }) {
    const Icon = Card.icon
    return (
        <div className="bg-[#f0f0f0] shadow-[-8px_8px_0px_#00579D] w-[210px] sm:w-[225px] h-[250px] sm:h-[270px] my-3 rounded-[6px] shrink-0 transition-transform hover:-translate-y-1">
            <div className="h-full flex justify-between items-center flex-col py-5 px-3">
                <div className="flex justify-center items-center flex-col gap-1.5 my-auto">
                    <div className="rounded-full size-14 sm:size-16 bg-[#00579D] flex justify-center items-center mb-2 shadow-sm">
                        <Icon className="size-7 sm:size-8 text-white" />
                    </div>
                    <h3 className="text-slate-500 text-sm sm:text-base font-medium text-center leading-tight">{Card.titulo}</h3>
                    <h3 className="text-slate-500 text-sm sm:text-base font-medium text-center leading-tight">{Card.subtitulo}</h3>
                </div>
                <p className="text-2xl sm:text-3xl text-[#00579D] font-bold mt-auto">{Card.dados}</p>
            </div>
        </div>
    )
}