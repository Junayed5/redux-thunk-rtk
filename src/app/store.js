import logger from "redux-logger";
import cartSlice from "../features/cart/cartSlice";
import filterSlice from "../features/filter/filterSlice";
import productSlice from "../features/products/productSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer:{
        cart: cartSlice,
        filter: filterSlice,
        products: productSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;