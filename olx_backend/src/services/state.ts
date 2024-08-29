import { db } from "../lib/db"

export const stateExistsByName = async (name: string) => {
    const state = await db.state.findFirst({
        where: { name: String(name).toUpperCase() },
        select: { name: true }
    })

    return state != null
}

// export const getStateByAcronym = async (acronym: string) => {
//     return await db.state.findUnique({ where: {  } })
// }