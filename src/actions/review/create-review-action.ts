"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { reviewService } from "@/services/review.service";
import { ApiError } from "@/services/api-error";

export type CreateReviewState = {
    success?: boolean;
    message?: string;
    error?: string;
};

export async function createReviewAction(
    courseId: number,
    _previousState: CreateReviewState,
    formData: FormData,
): Promise<CreateReviewState> {
    const rate = Number(formData.get("rate"));

    if (!Number.isSafeInteger(courseId) || courseId <= 0) {
        return { error: "Curso inválido." };
    }

    if (!Number.isInteger(rate) || rate < 0 || rate > 10) {
        return { error: "Escolha uma nota entre 0 e 10." };
    }

    const session = await getSession();
    if (!session.authenticated) {
        return { error: "Sua sessão expirou. Entre novamente para avaliar." };
    }

    try {
        await reviewService.createReview(courseId, rate);
        revalidatePath(`/courses/${courseId}`);

        return {
            success: true,
            message: "Avaliação registrada.",
        };
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 401) {
                return { error: "Sua sessão expirou. Entre novamente." };
            }

            return { error: error.message };
        }

        return { error: "Não foi possível registrar sua avaliação." };
    }
}
