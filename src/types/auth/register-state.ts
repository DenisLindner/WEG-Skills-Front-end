import {ApiFieldErrors} from "@/types/common/api-field-errors";

export type RegisterState = {
    error?: {
        code: string
        message: string
        fieldErrors?: ApiFieldErrors
    }
}