import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string({
        invalid_type_error: 'Informe um email'
    }).email({
        message: 'Email inválido'
    }),
    password: z.string().min(1, {
        message: 'Senha muito curta'
    }),
})