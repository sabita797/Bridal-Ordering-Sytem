import {createSlice,current } from "@reduxjs/toolkit";

// The cart reducer is a function that takes the current state and an action, and returns a new state. Load the initial state from the localStorage.
const cartSlice = createSlice({
    name: "cart",
    //initialState: JSON.parse(localStorage.getItem("cart")) || [],
    initialState: JSON.parse(localStorage.getItem("cart")) || {
                products: [],
                quantity:0,
                total:0
            },
    reducers: {
        addProduct: (state, action) => {
            const product = action.payload;
            const currentProd = JSON.parse(JSON.stringify(state.products));
            debugger;
            const productIndex = currentProd.findIndex(p => p.product.id === product.product.id);
            debugger;
            if (productIndex === -1) {
                debugger;
                state.products.push(product);
                state.quantity += 1;
            } else {
                debugger;
                state.products[productIndex].quantity += product.quantity;
            }
            state.total += product.product.price * product.quantity;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        removeProduct: (state, action) => {
            const product = action.payload;
            const productInCart = state.find(item => item.id === product.id);
            if (productInCart) {
                productInCart.quantity -= 1;
                if (productInCart.quantity === 0) {
                    state.splice(state.indexOf(productInCart), 1);
                }
            }
            localStorage.setItem("cart", JSON.stringify(state));
        },
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
            localStorage.setItem("cart", JSON.stringify(state));
            
        },
    },
});


// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         products: [],
//         quantity:0,
//         total:0
//     },
//     reducers:{
//         addProduct: (state, action) => {
//             const product = action.payload;
//             const currentProd = JSON.parse(JSON.stringify(state.products));
//             debugger;
//             const productIndex = currentProd.findIndex(p => p.product.id == product.product.id);
//             debugger;
//             if (productIndex == -1) {
//                 debugger;
//                 state.products.push(product);
//                 state.quantity += 1;
//             } else {
//                 debugger;
//                 state.products[productIndex].quantity += product.quantity;
//             }
//             debugger
//             state.total += product.product.price * product.quantity;
//             debugger;
//         }
//     }
// });

export const {addProduct,clearCart,removeProduct} = cartSlice.actions;
export default cartSlice.reducer;