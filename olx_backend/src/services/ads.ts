import { count } from "console"
import { db } from "../lib/db"
import { IFiltersAds } from "../types/ads"
import { ISort } from "../types/responses"



export const getAdById = async (id: string) => await db.ads.findUnique({
    where: { id }
})


export const getAddByIdAndIncreaseViews = async (id: string) => {
    const ad = db.ads.update({
        where: { id },
        data: { views: { increment: 1 } },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    state: true, 
                }
            }
        }
    })

    if(!ad)
        return null

    return ad
}


/**
 * 
 * @param offset 
 * @param page 
 * @param sort 
 * @param filters 
 */
export const getAdsByFilter = async (offset: any, page: any, sort: ISort = "asc", filters: IFiltersAds) => {
    const ads = await db.ads.findMany({
        where: {
            status: true,
            ...(filters.title && { title: { contains: filters.title } }),
            ...(filters.state && { state: filters.state }),
            ...(filters.slug && { slug: filters.slug }),
        },
        select: {
            id: true,
            title: true,
            price: true,
            priceNegotiable: true,
            state: true,
            image: true
        },
        skip: Number(offset) * Number(page),
        take: Number(page),
        orderBy: { title: sort }

    })

    return ads
}

export const getTotalSizeOfads = async (filters: IFiltersAds) => {
    return await db.ads.count({
        where: {
            status: true,
            ...(filters.title && { title: { contains: filters.title } }),
            ...(filters.state && { state: filters.state }),
            ...(filters.slug && { slug: filters.slug }),
        }
    })
}