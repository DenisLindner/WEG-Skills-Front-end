import {ApiFieldErrors} from "@/types/common/api-field-errors";

export type LoginState = {
    error?: {
        code: string
        message: string
        fieldErrors?: ApiFieldErrors
    }
}