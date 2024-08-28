import { checkSchema } from "express-validator";

export const userEditValidator =  checkSchema({
    name: {
        optional: true,
        trim: true,
        isLength: {
            options: { min: 2 }
        },
        errorMessage: "Nome inválido"
    },
    email: {
        optional: true,
        normalizeEmail: true,//formata certinho
        isEmail: true,
        trim: true,
        errorMessage: "Email inválido"
    },
    password: {
        optional: true,
        isLength: {
            options: { min: 2 }
        },
        errorMessage: "Senha deve ter 2 caracteres ou mais"
    },
    state: {
        optional: true,
        trim: true,
        isLength: {
            options: { min: 2, max: 2 }
        },
        errorMessage: "Informe um Estado"
    },
    token: {
        optional: true,//coloque ele pelo menos
        errorMessage: "Token não informado"
    }
})
