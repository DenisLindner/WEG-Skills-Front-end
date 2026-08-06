"use server";

import {runAction} from "@/lib/action-result";
import {certificateService} from "@/services/certificate.service";

export async function validateCertificateAction(code: string) {
    const normalizedCode = code.trim()
    if (!normalizedCode || normalizedCode.length > 128) {
        return {
            success: false as const,
            status: 400,
            error: {
                code: "invalid-certificate-code",
                message: "Informe um código de certificado válido.",
            },
        }
    }

    return runAction(
        () => certificateService.validate(normalizedCode),
        {clearSessionOnUnauthorized: false},
    );
}
