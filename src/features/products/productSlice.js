import { deleteProduct, fetchProductById, fetchProducts, postProduct, updateProduct } from "./productsApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    products: [],
    singleProduct: {},
    isLoading: false,
    isError: false,
    postProduct: false,
    isDeleteProduct: false,
    isUpdated: false,
    error: "",
};

export const getProducts = createAsyncThunk("products/getProduct", async () => {
    const products = fetchProducts();
    return products;
});
export const getProductById = createAsyncThunk("products/getProductById", async (id) => {
    const products = fetchProductById(id);
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

export const updateProductById = createAsyncThunk(
    'products/updateProductById',
    async (id, data) => {
        const product = updateProduct(id, data)
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
        toggleUpdateProduct: (state) => {
            state.isUpdated = false
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
            .addCase(getProductById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.singleProduct = action.payload;
                state.isLoading = false;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.singleProduct = {};
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
            })
            .addCase(updateProductById.pending, (state) => {
                state.isLoading = true;
                state.isUpdated = false;
            })
            .addCase(updateProductById.fulfilled, (state) => {
                state.isUpdated = true;
                state.isLoading = false;
            })
            .addCase(updateProductById.rejected, (state, action) => {
                state.isUpdated = false
                state.error = action.error.message;
            });
    },
});
// export const { builder } = productSlice.actions;
export default productSlice.reducer;
export const { togglePostProduct, removeFromList, toggleDeleteProduct, toggleUpdateProduct } = productSlice.actions;