import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";

export function PaginationLinks({ page, totalPages, pathname, query = {} }: { page: number; totalPages: number; pathname: string; query?: Record<string, string | undefined> }) {
    if (totalPages <= 1) return null
    const href = (target: number) => `${pathname}?${new URLSearchParams({ ...Object.fromEntries(Object.entries(query).filter((entry): entry is [string, string] => Boolean(entry[1]))), page: String(target) }).toString()}`
    return (
        <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Paginação">
            {page > 0 && <Link href={href(page - 1)} className={buttonVariants({ variant: "outline" })}><ChevronLeft />Anterior</Link>}
            <span className="text-sm text-muted-foreground">Página <strong className="text-foreground">{page + 1}</strong> de {totalPages}</span>
            {page + 1 < totalPages && <Link href={href(page + 1)} className={buttonVariants({ variant: "outline" })}>Próxima<ChevronRight /></Link>}
        </nav>
    )
}