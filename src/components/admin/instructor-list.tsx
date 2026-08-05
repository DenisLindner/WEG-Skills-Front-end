"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import {LoaderCircle, Trash2, UserRound} from "lucide-react";
import {UserProfile} from "@/types/user/user-profile";
import {deleteInstructorAction} from "@/actions/user/instructor/delete-instructor-action";
import {Button} from "@/components/ui/button";

type Notice = {
    kind: "success" | "error"
    text: string
}

export function InstructorList({instructors}: {instructors: UserProfile[]}) {
    const [pendingId, setPendingId] = useState<number | null>(null)
    const [notice, setNotice] = useState<Notice | null>(null)
    const router = useRouter()

    async function remove(instructor: UserProfile) {
        if (pendingId !== null) return
        if (!window.confirm("Excluir o instrutor " + instructor.name + "?")) return

        setPendingId(instructor.id)
        setNotice(null)

        try {
            const result = await deleteInstructorAction(instructor.id)
            if (!result.success) {
                if (result.status === 401) {
                    router.replace("/login?next=/admin")
                    router.refresh()
                    return
                }

                setNotice({
                    kind: "error",
                    text: result.status === 403
                        ? "Você não tem permissão para excluir instrutores."
                        : result.status === 404
                            ? "O instrutor não foi encontrado."
                            : result.status === 409
                                ? "Este instrutor possui cursos vinculados e não pode ser excluído."
                                : result.error.message || "Não foi possível excluir o instrutor.",
                })
                if (result.status === 404) router.refresh()
                return
            }

            setNotice({kind: "success", text: "Instrutor excluído."})
            router.refresh()
        } catch (error) {
            console.error("Instructor deletion failed", error)
            setNotice({kind: "error", text: "Não foi possível excluir o instrutor. Tente novamente."})
        } finally {
            setPendingId(null)
        }
    }

    return (
        <div>
            {notice && (
                <div
                    className={notice.kind === "error"
                        ? "mb-4 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive"
                        : "mb-4 rounded-xl border border-primary/15 bg-secondary p-4 text-sm"}
                    role={notice.kind === "error" ? "alert" : "status"}
                    aria-live="polite"
                >
                    {notice.text}
                </div>
            )}

            <div className="max-h-[32rem] divide-y divide-border overflow-y-auto overscroll-contain pr-2">
                {instructors.map((instructor) => (
                    <div key={instructor.id} className="flex items-center gap-3 py-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                            <UserRound className="size-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate font-semibold">{instructor.name}</p>
                            <p className="truncate text-sm text-muted-foreground">{instructor.email}</p>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            disabled={pendingId !== null}
                            onClick={() => void remove(instructor)}
                        >
                            {pendingId === instructor.id ? <LoaderCircle className="animate-spin" /> : <Trash2 />}
                            <span className="sr-only">Excluir instrutor {instructor.name}</span>
                        </Button>
                    </div>
                ))}
                {!instructors.length && <p className="py-8 text-center text-sm text-muted-foreground">Nenhum instrutor cadastrado.</p>}
            </div>
        </div>
    )
}
