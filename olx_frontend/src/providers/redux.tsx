"use client"

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/userReducer"
import { Provider } from "react-redux"
import { use } from "react";


export type RootState = ReturnType< typeof store.getState >



export const store = configureStore({
    reducer: {
        user: userReducer
    }
}) 


export const ReduxProvider = ({children}: {children: React.ReactNode}) => {
    return (
        <Provider store={store}>
        {children}
        </Provider>
    )
        
    

}