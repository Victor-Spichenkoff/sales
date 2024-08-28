import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { findUserByIdOrToken, findUserByToken } from "../services/user";
import { JWTPayload } from "../types/jwt";
import { errorMenssage } from "../helpers/errosMenssage";

export const isTokenValid: RequestHandler = async (req, res) => {
    const token = req.body.token

    try {
        const payload = jwt.decode(token) as JWTPayload//erro possivel
    
        const user = await findUserByIdOrToken(payload.id)
        
        if(!user || !payload.iat)
            throw errorMenssage("Token inválido" )

        const now = Math.floor(Date.now() / 1000);

        if(payload.exp && payload.exp < now)
            throw errorMenssage("Sessão expirou!" )

        res.send(true)
    } catch(e) {
        res.status(401).send(e)
    }
}