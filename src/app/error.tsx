"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {

    return (
        <main className="content-grid flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                <AlertTriangle className="size-8" />
            </div>
            <h1 className="mt-6 text-3xl font-bold">Não foi possível carregar esta página</h1>
            <p className="mt-3 max-w-md text-muted-foreground">Verifique sua conexão e tente novamente. Se o problema continuar, entre novamente na plataforma.</p>
            <Button type="button" className="mt-7" onClick={reset}><RefreshCw />Tentar novamente</Button>
        </main>
    )

}
