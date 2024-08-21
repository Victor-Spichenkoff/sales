import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt"
import { findUserById } from "../services/user"
import { RequestHandler } from "express"
import passport from "passport"
import { User } from "@prisma/client"

const options = {

}

export const jwtStrategy = new JWTStrategy({
    //de onde; e como decifrar (chave que vai usar)
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: String(process.env.JWT_KEY)
}, async (payload, done) => {
    const { id } = payload

    const user = await findUserById(id)

    if (user)
        return done(null, user)

    return done(null, false)
})


export const jwtStrategyMiddleware: RequestHandler = (req, res, next) => {
    const authRequest = passport.authenticate(
        "jwt",
        (e:any, user: User | false) => {
            if(user)
                return next()

            res.status(401).send({ error: "Token inválido" })
        }
    )

    authRequest(req, res, next)
}