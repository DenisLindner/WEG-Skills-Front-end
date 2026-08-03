import {Compass} from "lucide-react";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="content-grid flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-secondary text-primary">
                <Compass className="size-8" />
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-primary">Erro 404</p>
            <h1 className="mt-2 text-4xl font-bold">Página não encontrada</h1>
            <p className="mt-3 max-w-md text-muted-foreground">O endereço pode ter mudado ou o conteúdo não está disponível para sua conta.</p>
            <Link href="/" className={buttonVariants({ className: "mt-7" })}>Voltar ao início</Link>
        </main>
    )
}
