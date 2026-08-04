"use client"

import {useActionState, useState} from "react";
import {CheckCircle2, LoaderCircle, RefreshCw} from "lucide-react";
import {completeLessonAction, type CompleteLessonState} from "@/actions/lesson/complete-lesson-action";
import {findLessonByIdAction, type LessonState} from "@/actions/lesson/find-lesson-by-id-action";
import {Button} from "@/components/ui/button";
import {LessonDetails} from "@/types/lesson/lesson-details";

const initialLessonState: LessonState = {};
const initialCompletionState: CompleteLessonState = {};

export function LessonPlayer({
    lesson: initialLesson,
    courseId,
    completed,
}: {
    lesson: LessonDetails;
    courseId: number;
    completed: boolean;
}) {
    const renewAction = findLessonByIdAction.bind(null, initialLesson.id);
    const [renewState, renewFormAction, renewing] = useActionState(renewAction, initialLessonState);

    const completionAction = completeLessonAction.bind(null, initialLesson.id, courseId);
    const [completionState, completionFormAction, completing] = useActionState(
        completionAction,
        initialCompletionState,
    );

    const [videoError, setVideoError] = useState("");
    const lesson = renewState.lesson ?? initialLesson;
    const done = completed || Boolean(completionState.success);

    return (
        <div>
            <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-xl">
                {lesson.videoUrl ? (
                    <video
                        key={lesson.videoUrl}
                        controls
                        preload="metadata"
                        src={lesson.videoUrl}
                        className="h-full w-full"
                        onError={() => setVideoError("O acesso ao vídeo expirou. Renove para continuar.")}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center p-8 text-center text-sm text-white/65">
                        O vídeo desta aula ainda não está disponível.
                    </div>
                )}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
                <form action={completionFormAction}>
                    <Button type="submit" disabled={done || completing}>
                        {completing ? <LoaderCircle className="animate-spin" /> : <CheckCircle2 />}
                        {done ? "Aula concluída" : completing ? "Concluindo..." : "Marcar como concluída"}
                    </Button>
                </form>

                <form action={renewFormAction} onSubmit={() => setVideoError("")}>
                    <Button type="submit" variant="outline" disabled={renewing}>
                        {renewing ? <LoaderCircle className="animate-spin" /> : <RefreshCw />}
                        {renewing ? "Renovando..." : "Renovar acesso ao vídeo"}
                    </Button>
                </form>
            </div>

            <div className="mt-3 text-sm" aria-live="polite">
                {videoError && <p className="text-destructive">{videoError}</p>}
                {renewState.error && <p className="text-destructive">{renewState.error}</p>}
                {completionState.error && <p className="text-destructive">{completionState.error}</p>}
                {completionState.success && <p className="text-emerald-700">Aula concluída.</p>}
            </div>
        </div>
    );
}
