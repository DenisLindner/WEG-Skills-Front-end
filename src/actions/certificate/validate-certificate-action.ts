"use server";

import {runAction} from "@/lib/action-result";
import {certificateService} from "@/services/certificate.service";

export async function validateCertificateAction(code: string) {
    return runAction(() => {
        return certificateService.validate(code.trim());
    });
}
