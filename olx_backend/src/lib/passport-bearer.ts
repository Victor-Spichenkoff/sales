import { Strategy as BearerStrategy } from "passport-http-bearer"
import { findUserByToken } from "../services/user"
import { RequestHandler } from "express"
import passport from "passport"
import { User } from "@prisma/client"

export const bearerStrategy = new BearerStrategy(async (token, done) => {
    const user = findUserByToken(token)

    if(user)
        return done(null, user)

    return done(null, false)
})


export const bearerStrategyMiddleware: RequestHandler = (req, res, next) => {
    const authRequest = passport.authenticate("bearer", 
        (err: any, user: User | false) => {
            if(user) {
                req.user = user
                return next()
            }

            res.status(401).send({ error: "Token inválido" })
    })

    authRequest(req, res, next)
}