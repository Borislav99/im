import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
    CreateProductPayload,
    GetProductsDataPayload,
    InitialState,
    UpdateProductPayload,
} from "./types";
import {
    createProduct,
    deleteProduct,
    getProductsData,
    updateProduct,
} from "./thunks";
import { DeleteCategoryPayload } from "../categorySlice/types";
import { ToggleAuthorizeErrorPayload } from "../errorSlice/types";

const initialState: InitialState = {
    isLoading: undefined,
    error: {
        isError: undefined,
        errorMessage: undefined,
    },
    products: [],
    filteredProducts: [],
    currentPage: 1,
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        toggleProductsError: (
            state: InitialState,
            action: PayloadAction<ToggleAuthorizeErrorPayload>
        ) => {
            const { toggle, message } = action.payload;
            if (toggle) {
                state.error.errorMessage = message;
            }
            state.error.isError = toggle;
        },
        searchByCategories: (state, action: PayloadAction<string>) => {
            const selectedCategory = action.payload;

            if (selectedCategory === "all") {
                state.filteredProducts = state.products;
                return;
            }
            const updatedProducts = state.products.filter((product) => {
                return product.categories.some((category) => {
                    return (
                        category.name.toLowerCase() ===
                        selectedCategory.toLowerCase()
                    );
                });
            });
            state.filteredProducts = updatedProducts;
        },
        changeCategoryPage: (state, action: PayloadAction<boolean>) => {
            if (action.payload) {
                state.currentPage = state.currentPage + 1;
            } else {
                state.currentPage = state.currentPage - 1;
            }
        },
    },
    extraReducers: (builder) => {
        // get products
        builder
            .addCase(getProductsData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                getProductsData.fulfilled,
                (state, action: GetProductsDataPayload) => {
                    const { data } = action.payload;
                    state.isLoading = false;
                    state.products = data;
                    state.filteredProducts = data;
                }
            )
            .addCase(getProductsData.rejected, (state) => {
                state.isLoading = false;
                state.error.isError = false;
            });
        // create new product
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                createProduct.fulfilled,
                (state, action: CreateProductPayload) => {
                    const { data } = action.payload;
                    alert(`Category ${data.name} created`);
                    state.isLoading = false;
                    state.currentPage = 1;
                }
            )
            .addCase(createProduct.rejected, (state, action) => {
                const { message } = action.error;
                state.isLoading = false;
                state.error.isError = true;
                state.error.errorMessage = message;
            })
            // delete product
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                deleteProduct.fulfilled,
                (state, action: DeleteCategoryPayload) => {
                    const { name } = action.payload;
                    alert(`Product ${name} deleted`);
                    state.isLoading = false;
                    state.currentPage = 1;
                }
            )
            .addCase(deleteProduct.rejected, (state, action) => {
                const { message } = action.error;
                state.isLoading = false;
                state.error.isError = true;
                state.error.errorMessage = message;
            })
            // update product
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                updateProduct.fulfilled,
                (state, action: UpdateProductPayload) => {
                    const { name } = action.payload;
                    alert(`Product ${name} updated`);
                    state.isLoading = false;
                    state.currentPage = 1;
                }
            )
            .addCase(updateProduct.rejected, (state, action) => {
                const { message } = action.error;
                state.isLoading = false;
                state.error.isError = true;
                state.error.errorMessage = message;
            });
    },
});

export const { toggleProductsError, searchByCategories, changeCategoryPage } =
    productsSlice.actions;

export default productsSlice.reducer;
