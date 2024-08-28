import { check, checkSchema } from "express-validator"



export const signupValidator = checkSchema({
    name: {
        trim: true,//já formata
        isLength: {
            options: { min: 2 }
        },
        errorMessage: "Nome inválido"
    },
    email: {
        normalizeEmail: true,//formata certinho
        isEmail: true,
        trim: true,
        errorMessage: "Email inválido"
    },
    password: {
        isLength: {
            options: { min: 2 }
        },
        errorMessage: "Senha deve ter 2 caracteres ou mais"
    },
    state: {
        trim: true,
        isLength: {
            options: { min: 2, max: 2 }
        },
        errorMessage: "Informe um Estado"
    }
})


export const signinValidador = checkSchema({
    email: {
        normalizeEmail: true,//formata certinho
        isEmail: true,
        trim: true,
        errorMessage: "Email inválido"
    },
    password: {
        isLength: {
            options: { min: 2 }
        },
        errorMessage: "Senha deve ter 2 caracterres ou mais"
    },
})

// {
//     "name": "Victor",
//     "email": "v@gmail.com",
//     "state": "SP",
//     "password": "12345"
// }