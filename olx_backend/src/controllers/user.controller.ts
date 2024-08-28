import { RequestHandler } from "express"
import { db } from "../lib/db"
import { createUser, findUserByEmail, findUserByIdOrToken } from "../services/user"
import { matchedData, validationResult } from "express-validator"
import { errorMenssage } from "../helpers/errosMenssage"
import { ICreatingUser } from "../types/db"
import jwt from "jsonwebtoken"
import { createState } from "../helpers/createStates"
import bcrypt from "bcrypt"


export const getStates: RequestHandler = async (req, res) => {
    const states = await db.state.findMany()

    res.send({ states })
}

export const signIn: RequestHandler = async (req, res) => {

}


export const signUp: RequestHandler = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const msg = errors.array()
        return res.status(400).json(errorMenssage(msg[0].msg))
    }

    const user: ICreatingUser = matchedData(req)
    // const user = { ...req.body }


    try {
        await createUser(user)

        res.sendStatus(201)
    } catch (e) {
        res.status(400).send(e)
    }

}


export const info: RequestHandler = async (req, res) => {
    const { id } = req.query
    // const { token } = req.query 

    //ele pega a categoria slug dos anucios (no ad, só tem o id da categoria)  
    const user = await db.user.findUnique({
        where: { id: String(id) },
        select: {
            id: true,
            name: true,
            email: true,
            state: true,
            token: true,
            ads: true
        }

    })
    if (!user)
        return res.status(400).send(errorMenssage("usuário não encontrado"))


    res.json(user)
}


export const editAction: RequestHandler = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const msg = errors.array()
        return res.status(400).json(errorMenssage(msg[0].msg))
    }

    try {
        const data = matchedData(req)

        // const user = await findUserByIdOrToken(token.id)
        if (data.email) {
            const sameEmailUser = await findUserByEmail(data.email)
            if (
                sameEmailUser && sameEmailUser.token != data.token)
                return res.status(400).send(errorMenssage("Email já usado"))
        }
        

        data.state = data.state.toUpperCase()

        if (data.state) {
            const existingState = await db.state.findFirst({ where: { name: data.state } })
            if (!existingState)
                return res.status(400).send(errorMenssage("Estado não existe"))
        }
        

        if (data.password) {
            const salt = bcrypt.genSaltSync(10, "a")
            data.passwordHash = bcrypt.hashSync(data.password, salt)
            delete data.password
        }

        var affected
        if(data.id) {
            affected = await db.user.update({
                where: { id: data.id },
                data: { ...data },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    state: true,
                    token: true
                }
            }) 
        } else {
            affected = await db.user.update({
                where: { token: data.token },
                data: { ...data },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    state: true,
                    token: true
                }
            })
        }

        // if(!affected) throw ""
        res.send(affected)
    } catch (e) {
        console.log(e)
        res.status(500).send(errorMenssage("Erro no servidor"))
    }
}

