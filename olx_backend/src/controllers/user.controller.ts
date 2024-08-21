import { RequestHandler } from "express"
import { db } from "../lib/db"
import { createUser } from "../services/user"
import { User } from "@prisma/client"


export const getStates: RequestHandler = async (req, res) => {
    const states = await db.state.findMany()

    res.send({ states })
}

export const signIn: RequestHandler = async (req, res) => {

}


export const signUp: RequestHandler = async (req, res) => {
    
    const user = { ...req.body }
    try{
        await createUser(user)
        
        res.sendStatus(201)
    } catch(e) {
        res.status(400).send(e)
    }

}


export const info: RequestHandler = async (req, res) => {

}


export const editAction: RequestHandler = async (req, res) => {

}
