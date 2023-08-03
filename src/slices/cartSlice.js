import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
//import { toast } from "react-hot-toast";

const initialState = {
    totlaItems: localStorage.getItem("totlaItems") ? 
                JSON.parse(localStorage.getItem("totlaItems")) : 0,

    total: localStorage.getItem("total") ?
           JSON.parse(localStorage.getItem("total")) : 0,

    cart: localStorage.getItem("cart") ? 
          JSON.parse(localStorage.getItem("cart")) : []
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        //add to cart
        addToCart (state, action) {
            const course = action.payload;
            const index = state.cart.findIndex((item) => item._id === course._id);
            if(index >= 0) {
                toast.error("Course is already in cart")
                return;
            }

            state.cart.push(course);
            state.totlaItems += 1;
            state.total += course.price;

            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totlaItems));

            toast.success("course added successfully in cart");
        },

        //remove from cart
        removeFromCart (state, action) {
            const courseId = action.payload;
            const index = state.cart.findIndex((item) => item._id === courseId);
            if(index >= 0 ) {
                state.totlaItems -= 1;
                state.total -= state.cart[index].price;
                state.cart.splice(index, 1);

                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totlaItems));

                toast.success("course deleted successfully");
            }
        },

        //reset cart
        resetCart (state) {
            state.totlaItems = 0;
            state.total = 0;
            state.cart = [];

            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        },
    },
});

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;