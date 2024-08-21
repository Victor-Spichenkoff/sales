import { ErrorResponse } from "../types/responses"

export const errorMenssage = (msg: string): ErrorResponse => {
    return { error: msg }
}