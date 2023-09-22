import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../axios/axiosInstance";
import { CATEGORIES_ROUTE, REMOVE_CATEGORIES_ACTION } from "../actions";
import { DeleteCategoryArgs } from "../types";
import { getCategoriesData } from "./getCategoriesDataThunk";
import { getProductsData } from "../../productsSlice/thunks";
import { getDashboardData } from "../../statsSlice/thunks";

export const deleteCategory = createAsyncThunk(
    REMOVE_CATEGORIES_ACTION,
    async ({ accessToken, id }: DeleteCategoryArgs, { dispatch }) => {
        try {
            const response = await axiosInstance.delete(
                `${CATEGORIES_ROUTE}/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            dispatch(getCategoriesData(accessToken));
            dispatch(getProductsData(accessToken));
            dispatch(getDashboardData(accessToken));
            return response.data;
        } catch (error: any) {
            throw new Error(error.response.data.message || error.message);
        }
    }
);
