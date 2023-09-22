import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
    CreateCategoryPayload,
    DeleteCategoryPayload,
    GetCategoriesDataPayload,
    InitialState,
    UpdateCategoryPayload,
} from "./types";
import { ToggleAuthorizeErrorPayload } from "../errorSlice/types";
import { getCategoriesData, deleteCategory, createCategory } from "./thunks";
import { updateCategory } from "./thunks/updateCategoryThunk";

const initialState: InitialState = {
    isLoading: undefined,
    error: {
        isError: undefined,
        errorMessage: undefined,
    },
    categories: [],
    filteredCategories: [],
    currentPage: 1,
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        searchForCategories: (state, action: PayloadAction<string>) => {
            const updatedCategories = state.categories.filter((category) =>
                category.name
                    .toLowerCase()
                    .includes(action.payload.toLowerCase())
            );
            state.filteredCategories = updatedCategories;
        },
        toggleCategoriesError: (
            state: InitialState,
            action: PayloadAction<ToggleAuthorizeErrorPayload>
        ) => {
            const { toggle, message } = action.payload;
            if (toggle) {
                state.error.errorMessage = message;
            }
            state.error.isError = toggle;
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
        // get categories data
        builder
            .addCase(getCategoriesData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                getCategoriesData.fulfilled,
                (state, action: GetCategoriesDataPayload) => {
                    const { data } = action.payload;
                    state.isLoading = false;
                    state.categories = data;
                    state.filteredCategories = data;
                }
            )
            .addCase(getCategoriesData.rejected, (state) => {
                state.isLoading = false;
                state.error.isError = false;
            });
        // create new category
        builder
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                createCategory.fulfilled,
                (state, action: CreateCategoryPayload) => {
                    const { data } = action.payload;
                    alert(`Category ${data.name} created`);
                    state.isLoading = false;
                    state.currentPage = 1;
                }
            )
            .addCase(createCategory.rejected, (state, action) => {
                const { message } = action.error;
                state.isLoading = false;
                state.error.isError = true;
                state.error.errorMessage = message;
            })
            // delete category
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                deleteCategory.fulfilled,
                (state, action: DeleteCategoryPayload) => {
                    const { name } = action.payload;
                    alert(`Category ${name} deleted`);
                    state.isLoading = false;
                    state.currentPage = 1;
                }
            )
            .addCase(deleteCategory.rejected, (state, action) => {
                const { message } = action.error;
                state.isLoading = false;
                state.error.isError = true;
                state.error.errorMessage = message;
            })
            // update category
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                updateCategory.fulfilled,
                (state, action: UpdateCategoryPayload) => {
                    const { name } = action.payload;
                    alert(`Category ${name} updated`);
                    state.isLoading = false;
                    state.currentPage = 1;
                }
            )
            .addCase(updateCategory.rejected, (state, action) => {
                const { message } = action.error;
                state.isLoading = false;
                state.error.isError = true;
                state.error.errorMessage = message;
            });
    },
});

export const {
    searchForCategories,
    toggleCategoriesError,
    changeCategoryPage,
} = categorySlice.actions;

export default categorySlice.reducer;
