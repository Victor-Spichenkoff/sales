import { RequestHandler } from "express";

export const privateRoute: RequestHandler = async (req, res, next) => {

    next()
}