import { errorMenssage } from "../helpers/errosMenssage"
import bcrypt from "bcrypt"
import { User as IUser } from "@prisma/client"
import { db } from "../lib/db"
import jwt from "jsonwebtoken"
import { ICreatingUser } from "../types/db"
import { JWTPayload } from "../types/jwt"

export const findUserByToken = async (token: string) => {
    const res = await db.user.findUnique({
        where: { token }
    })

    if (!res)
        return null

    return res
}

export const findUserById = async (id: string) => {
    const res = await db.user.findUnique({
        where: { id }
    })

    return res
}


/**
 * 
 * tenta criar o user, retorna um { error: "msg" } ou true
 * @returns 
 */
export const createUser = async (user: ICreatingUser) => {
    try {
        if (!user.password)
            throw "Informe a senha"


        const salt = bcrypt.genSaltSync(10, "a")
        user.passwordHash = bcrypt.hashSync(user.password, salt)
        delete user.password


        try {
            const res = await db.user.create({
                data: user as IUser
            })

            if (!res)
                throw "Erro interno"
        } catch (e: any) {
            if (e?.code == "P2002")
                throw "Email já usado"
            
            if(String(e).includes("missing"))
                throw "Dados ausentes!"

            throw "Erro interno"
        }

        return true
    } catch (e) {
        throw errorMenssage(String(e))
    }
}



export const createJWTToken = async (user: IUser) => {
    const payload: JWTPayload = {
        id: user.id
    }

    const token = jwt.sign(payload, String(process.env.JWT_KEY), {
        expiresIn: "3h"
    })

    const res = await db.user.update({
        where: { id: user.id },
        data: { token }
    })

    if (!res)
        throw errorMenssage("Erro ao entrar")

    return token
}


/**
 * Envia um erro caso não consiga fazer o login (inexistencia)
 * retorna o user se tudo certo
 */
export const findUserByEmailAndPassword = async (email: string, password: string) => {
    const user = await db.user.findUnique({
        where: { email }
    })

    if (!user)
        throw errorMenssage("Email não encontrado!")


    const isRightPassword = bcrypt.compareSync(password, user.passwordHash)

    if (!isRightPassword)
        throw errorMenssage("Senha incorreta!")


    return user
}