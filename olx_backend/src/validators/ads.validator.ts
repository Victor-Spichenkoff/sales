import { checkSchema } from "express-validator";

export const adsValidator =  checkSchema({
    title: {
        trim: true,
        isLength: {
            options: { min: 2 }
        },
        errorMessage: "Título inválido"
    },
    price: {
        isNumeric: true,
        isLength: {
            options: { min: 0 } //formata certinho
        },
        errorMessage: "Preço inválido"
    },
    priceNegotiable: {
        optional: true
    },
    category: {
        optional: true,
        trim: true,
        isLength: {
            options: { min: 2, max: 2 }
        },
        errorMessage: "Informe uma categoria"
    },
    token: {
        optional: true,//coloque ele pelo menos
        errorMessage: "Token não informado"
    }
})
