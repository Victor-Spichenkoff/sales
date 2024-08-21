import { RequestHandler } from "express";
import { db } from "../lib/db";
import bcrypt from "bcrypt"
export const getAllUsers:RequestHandler = async (req, res) => {
    const users = await db.user.findMany({
        select: {
            email: true,
            passwordHash: true
        }
    })

    res.send(users)
}