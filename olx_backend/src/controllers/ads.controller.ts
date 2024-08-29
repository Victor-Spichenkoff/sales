import { RequestHandler } from "express"
import { db } from "../lib/db"
import jimp from "jimp"
import { findUserByIdOrToken } from "../services/user"
import { errorMenssage } from "../helpers/errosMenssage"
import { addImage } from "../helpers/addImage"
import path from "path"
import { ISort } from "../types/responses"
import { IFiltersAds } from "../types/ads"
import { getAdById, getAddByIdAndIncreaseViews, getAdsByFilter, getTotalSizeOfads } from "../services/ads"
import { stateExistsByName } from "../services/state"
import { getCategoryBySlug } from "../services/category"

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

    if (!data.title || !data.category)
        return res.status(400).send(errorMenssage("Títlo e categoria são obrigatórios"))

    if (data.price)
        data.price = Number(data.price.replace(".", "").replace(",", ".").replace("R$", "").replace("R$ ", ""))



    const user = await findUserByIdOrToken(data.token, true)
    const category = await getCategoryBySlug(data.category)
    
    // await db.category.findFirst({ where: { slug: data.category } })

    if (!category)
        return req.status(400).send(errorMenssage("Categoria não existe"))

    delete data.token
    data.status = true//erro aqui
    data.idUser = user?.id
    data.state = user?.state
    data.views = 0
    data.priceNegotiable = data.priceNegotiable == "true" || data.priceNegotiable === true

    console.log(req.files.image.data)
    if (req.files && req.files.image) {//receber só uma
        const url = await addImage(req.files.image.data)
        data.image = url
    }


    const created = await db.ads.create({
        data: { ...data }
    })

    res.send({ id: created.id })
}


export const getList: RequestHandler = async (req, res) => {
    //tem também todos os filtros
    const { page = 0, limit = 3, q = "", cat, state } = req.query
    //q == refere ao filtro de titulo
    const filters: IFiltersAds = {}
    const sort: ISort = String(req.query.sort).toLowerCase() as ISort//erro aqui


    const category = await getCategoryBySlug(String(cat))
    const stateFromDb = await stateExistsByName(String(state))


    filters.title = q.toString()

    if (category)
        filters.slug = category.slug
    if (stateFromDb)
        filters.state = String(state).toUpperCase()

    try 
    {
        let ads = await getAdsByFilter(page, limit, sort, filters)

        ads = ads.map((ad) => {
            ad.image = path.resolve(__dirname, `../../public/assets/userImages/${ad.image}`)
            return ad
        })
    
        const totalOfItem = await getTotalSizeOfads(filters)

        res.send({
            ads,
            total: totalOfItem
        })

    } catch
    {
        res.status(400).send(errorMenssage("Erro na consulta"))
    }

}


export const editAction: RequestHandler = async (req, res) => {
    const { id } = req.params
    let { title, status, price, priceNegotiable, description, category, image, token } = req.body


    const ad = await getAdById(String(id))
    if(!id || !ad)
        return res.status(400).send(errorMenssage("Produto não encontrado"))


    const user = await findUserByIdOrToken(token, true)

    if(user?.id != ad.idUser)
        return res.status(403).send(errorMenssage("Não é seu anúncio"))


    let updates:any = {}

    if(title)
        updates.title = title
    if(description)
        updates.description = description
    if(status)
        updates.status = status
    if(price) {
        if(price < 0)
            price = 0
        updates.price = Number(price.replace(".", "").replace(",", ".").replace("R$", "").replace("R$ ", ""))
    }
    if(priceNegotiable)
        updates.priceNegotiable = Boolean(priceNegotiable)

    if(category) {
        const categoryFromDb = await getCategoryBySlug(category)
        if(!categoryFromDb)
            return res.status(400).send(errorMenssage("Categoria inexistente"))
        updates.category = category
    }

    try {
        await db.ads.update({
            where: { id },
            data: { ...updates }
        })

        res.sendStatus(204)
    }catch {
        res.status(400).send(errorMenssage("Não foi possível salvar"))
    }

}


export const getItem: RequestHandler = async (req, res) => {
    //other == relacionados também/ o mesmo autor
    const { id, other=false } = req.query

    if(!id) 
        return res.status(400).send(errorMenssage("Anúncio sem ID"))

    const ad = await getAddByIdAndIncreaseViews(String(id))
    
    if(!ad)
        return res.status(400).send(errorMenssage("Produto inexistente"))

    ad.image = ad.image = path.resolve(__dirname, `../../public/assets/userImages/${ad.image}`)

    const category = await getCategoryBySlug(ad.category, true)

    
    //adicionar o other
    let others: any = []
    if(other) {
        const othersData = await db.ads.findMany({
            where: {
                idUser: ad.idUser
            }
        })

        othersData.forEach(other => {
            if(other.id != ad.id) {
                others.push({
                    id: other.id,
                    title: other.title,
                    price: other.price,
                    priceNegotiable : other.priceNegotiable,
                    image: path.resolve(__dirname, `../../public/assets/userImages/${other.image}`)
                })
            }

        })
    }
        

    let finalAd:any = ad
    finalAd.category = category
    finalAd.state = ad.user.state
    finalAd.others = others
    delete finalAd.user.state


    res.send(others)
    // res.send(finalAd)
}