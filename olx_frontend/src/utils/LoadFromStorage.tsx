"use client"

import { token_key } from "@/global"
import { userData } from "@/hook/getReduxData"
import { setToken } from "@/redux/userReducer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const LoadFromStorage = () => {
    const userInfos = userData()
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem(token_key)
        if (!token) {
            dispatch(setToken(null))
            return
        }

        dispatch(setToken(token))

    })

    return (null)
}