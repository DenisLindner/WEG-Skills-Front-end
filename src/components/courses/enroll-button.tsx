"use client"

import { useActionState } from "react"
import Link from "next/link"
import { CheckCircle2, LoaderCircle } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {enrollAction, type EnrollState} from "@/actions/enrollment/enroll-action";

const initialState: EnrollState = {};

export function EnrollButton({ courseId, enrolled }: { courseId: number; enrolled: boolean }) {
    const action = enrollAction.bind(null, courseId);
    const [state, formAction, pending] = useActionState(action, initialState);

    if (enrolled || state.success) {
        return <Link href={`/student/course/${courseId}`} className={cn(buttonVariants({size: "lg"}), "w-full sm:w-auto")}><CheckCircle2/>Acessar conteúdo</Link>
    }

    return (
        <div>
            <form action={formAction}>
                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>{pending && <LoaderCircle className="animate-spin" />}{pending ? "Matriculando..." : "Matricular-se"}</Button>
            </form>
            {state.error && <p className="mt-2 max-w-sm text-sm text-destructive" role="alert">{state.error}</p>}
        </div>
    )
}
