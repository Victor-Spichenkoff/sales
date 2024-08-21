import { User } from "@prisma/client";

export type ICreatingUser = {
    name: string
    email: string
    state: string
    password?: string
    token: string | null
    passwordHash: string | null
}