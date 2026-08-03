"use client"

import { useActionState, useState } from "react"
import { LoaderCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {createReviewAction, type CreateReviewState} from "@/actions/review/create-review-action";

const initialState: CreateReviewState = {};

export function ReviewForm({ courseId }: { courseId: number }) {
    const [rate, setRate] = useState(10)
    const action = createReviewAction.bind(null, courseId);
    const [state, formAction, pending] = useActionState(action, initialState);

    if (state.success) {
        return <p className="rounded-2xl border border-border bg-secondary/40 p-5 text-sm" role="status">{state.message}</p>;
    }

    return (
        <form action={formAction} className="rounded-2xl border border-border bg-secondary/40 p-5">
            <div className="flex flex-wrap items-center gap-4">
                <div>
                    <p className="font-semibold">Avalie este curso</p>
                    <p className="text-sm text-muted-foreground">Escolha uma nota de 0 a 10.</p>
                </div>
                <label className="ml-auto flex items-center gap-2">
                    <Star className="size-5 fill-amber-400 text-amber-400" />
                    <span className="sr-only">Nota</span>
                    <select name="rate" value={rate} onChange={(event) =>
                        setRate(Number(event.target.value))} className="h-10 rounded-lg border border-input bg-white px-3 text-sm">{Array.from({ length: 11 }, (_, value) =>
                        <option key={value} value={value}>{value}/10</option>)}
                    </select>
                </label>
                <Button type="submit" size="sm" disabled={pending}>{pending && <LoaderCircle className="animate-spin" />}Enviar</Button>
            </div>
            {state.error && <p className="mt-3 text-sm text-destructive" role="alert">{state.error}</p>}
        </form>
    )
}
