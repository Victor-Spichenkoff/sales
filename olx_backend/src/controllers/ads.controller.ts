import { RequestHandler } from "express"
import { db } from "../lib/db"
import jimp from "jimp"
import { findUserByIdOrToken } from "../services/user"
import { errorMenssage } from "../helpers/errosMenssage"
import { addImage } from "../helpers/addImage"

export const getCategories: RequestHandler = async (req, res) => {
    const categoriesFromDb = await db.category.findMany()
    
    // let categories = categoriesFromDb.map(category => {
    //     return {
    //         ...category,
    //         img: `${req.protocol}://${req.get('host')}/public/assets/images/${category.slug}.png`
    //     }
    // })

    res.send(categoriesFromDb)

}


export const AddAction: RequestHandler = async (req: any, res) => {
    let data = req.body
    // let { title, price, priceNegotiable, description, category,token } = req.body

    if(!data.title || !data.category) 
        return res.status(400).send(errorMenssage("Títlo e categoria são obrigatórios"))

    if(data.price)
        data.price = Number(data.price.replace(".", "").replace(",", ".").replace("R$", "").replace("R$ ", ""))



    const user = await findUserByIdOrToken(data.token, true)
    const category = await db.category.findFirst({where: { slug: data.category }})

    if(!category)   
        return req.status(400).send(errorMenssage("Categoria não existe"))

    delete data.token
    data.status = "novo"//true//erro aqui
    data.idUser = user?.id
    data.state = "new"
    data.views = 0 
    data.priceNegotiable = data.priceNegotiable == "true" || data.priceNegotiable === true

    console.log(req.files.image.data)
        if(req.files && req.files.image) {//receber só uma
        const url = await addImage(req.files.image.data)
        data.image = url
    }


    const created = await db.ads.create({
        data: { ...data }
    })

    res.send({ id: created.id })
}


export const getList: RequestHandler = async (req, res) => {
    const ads = await db.ads.findMany()

    res.send(ads)
}


export const editAction: RequestHandler = async (req, res) => {

}


export const getItem: RequestHandler = async (req, res) => {

}