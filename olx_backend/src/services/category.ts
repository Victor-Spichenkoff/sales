import { db } from "../lib/db"

export const getCategoryBySlug = async (slug: string, includeName=false, includeId=false) => {
    return await db.category.findFirst({
        where: { slug: String(slug) },
        select: { 
            id: includeId,
            name : includeName,
            slug: true,
        
        }
    })
}