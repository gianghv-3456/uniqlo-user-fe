import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceAxios from "../../configs/axios";

export const getCart = createAsyncThunk('carts/getAll', async (id) => {
    try {
        const result = await instanceAxios.get(`/carts/${id}`);
        return result.data.data.sort((a, b) => a.id - b.id);
    } catch (error) {
        return [];
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: null,
    },
    reducers: {
        saveCart(state, action) {
            state.data = action.payload
        },
    },
    extraReducers: (builer) => {
        builer
            .addCase(getCart.fulfilled, (state, action) => {
                state.data = action.payload;
            })
    }
});

export const { saveCart } = cartSlice.actions;
export default cartSlice.reducer;