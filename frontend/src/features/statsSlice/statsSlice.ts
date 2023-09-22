import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetDashboardDataPayload, InitialState } from "./types";
import { getDashboardData } from "./thunks";

const initialState: InitialState = {
    products: undefined,
    categories: undefined,
    productsPerCategory: undefined,
    isLoading: false,
    isError: false,
};

export const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                getDashboardData.fulfilled,
                (state, action: PayloadAction<GetDashboardDataPayload>) => {
                    const {
                        data: {
                            itemsCount,
                            categoriesCount,
                            itemsInEachCategory,
                        },
                    } = action.payload;
                    state.isLoading = false;
                    state.isError = false;
                    state.categories = categoriesCount;
                    state.products = itemsCount;
                    state.productsPerCategory = itemsInEachCategory;
                }
            )
            .addCase(getDashboardData.rejected, (state) => {
                state.isLoading = false;
                state.isError = false;
            });
    },
});

export const {} = statsSlice.actions;

export default statsSlice.reducer;
