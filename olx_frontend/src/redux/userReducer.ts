import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'user',
    initialState: { id: "", name: "Desconhecido", email:"", token: null },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
}) 

export default slice.reducer
export const { setName, setToken } = slice.actions