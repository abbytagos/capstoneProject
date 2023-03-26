import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1; //cart quantity
            state.products.push(action.payload);
            state.total += action.payload.price *action.payload.quantity; //product quantity NOT cart
        },
        resetCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
});

export const { addProduct, resetCart } = cartSlice.actions;
export default cartSlice.reducer;