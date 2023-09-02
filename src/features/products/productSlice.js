import { deleteProduct, fetchProducts, postProduct } from "./productsApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    postProduct: false,
    isDeleteProduct: false,
    error: "",
};

export const getProducts = createAsyncThunk("products/getProduct", async () => {
    const products = fetchProducts();

    return products;
});
export const addProduct = createAsyncThunk('products/addProduct', async (data) => {
    const product = postProduct(data)
    return product
})
export const deleteProductId = createAsyncThunk(
    'products/deleteProduct',
    async (id, thunkAPI) => {
        const product = await deleteProduct(id);
        thunkAPI.dispatch(removeFromList(id))
        return product;
    })

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        togglePostProduct: (state) => {
            state.postProduct = false
        },
        toggleDeleteProduct: (state) => {
            state.isDeleteProduct = false
        },
        removeFromList: (state, acton) => {
            state.products = state.products.filter(product => product._id !== acton.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.products = [];
                state.error = action.error.message;
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
                state.postProduct = false;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.postProduct = true
                state.isLoading = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.postProduct = false
                state.error = action.error.message;
            })
            .addCase(deleteProductId.pending, (state) => {
                state.isLoading = true;
                state.isDeleteProduct = false;
            })
            .addCase(deleteProductId.fulfilled, (state) => {
                state.isDeleteProduct = true;
                state.isLoading = false;
            })
            .addCase(deleteProductId.rejected, (state, action) => {
                state.isDeleteProduct = false
                state.error = action.error.message;
            });
    },
});
// export const { builder } = productSlice.actions;
export default productSlice.reducer;
export const { togglePostProduct, removeFromList, toggleDeleteProduct } = productSlice.actions;