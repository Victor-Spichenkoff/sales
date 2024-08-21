import { RequestHandler } from "express"
import { Strategy as LocalStrategy } from "passport-local"
import { createJWTToken, findUserByEmailAndPassword } from "../services/user"
import passport from "passport"
import { User } from "@prisma/client"
import { errorMenssage } from "../helpers/errosMenssage"

export interface ILocalStrategyResponse {
    auth?: {
        token: string
    }
    user: User
}
// export interface ILocalStrategyResponse {
//     auth?: {
//         token: string
//     }
//     user: User
// }


export const localStrategy = new LocalStrategy({
    //troca o nome padrão
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    try {
        const user = await findUserByEmailAndPassword(email, password)
        if (user) {
            const token = await createJWTToken(user)
            user.token = token

            const response = user
            // const response: ILocalStrategyResponse = {
            //     auth: {
            //         token
            //     },
            //     user
            // }

            return done(null, response)

        } else {
            return done(null, false, {
                message: "Erro no login"
            })//1° == erro; 2° == user/false
        }
    } catch (e) {
        return done(e, false, {
            message: String(e)
        })
    }
})



//criar middleware para mexer isso
export const localStrategyLogin: RequestHandler = (req, res, next) => {
    const authRequest = passport.authenticate(
        "local",
        // (err: any, StartegyResponse: ILocalStrategyResponse | false) => {
        (err: any, StartegyResponse: User | false) => {
            if (StartegyResponse) {
                // req.user = StartegyResponse.user
                // req.authInfo = StartegyResponse.auth
                return res.send({
                    user: StartegyResponse,
                    // authInfo: StartegyResponse.auth,
                })
                // return next()
            }

            if(err?.error)
                return res.status(401).send( err )
            
            return res.status(500).send(errorMenssage("Erro interno!"))
        })

    authRequest(req, res, next)
} 
