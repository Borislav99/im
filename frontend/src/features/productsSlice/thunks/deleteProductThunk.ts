import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../axios/axiosInstance";
import { DeleteCategoryArgs } from "../../categorySlice/types";
import { PRODUCTS_ROUTE, REMOVE_PRODUCTS_ACTION } from "../actions";
import { getProductsData } from "./getProductsDataThunk";
import { getDashboardData } from "../../statsSlice/thunks";

export const deleteProduct = createAsyncThunk(
    REMOVE_PRODUCTS_ACTION,
    async ({ accessToken, id }: DeleteCategoryArgs, { dispatch }) => {
        try {
            const response = await axiosInstance.delete(
                `${PRODUCTS_ROUTE}/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            dispatch(getProductsData(accessToken));
            dispatch(getDashboardData(accessToken));
            return response.data;
        } catch (error: any) {
            throw new Error(error.response.data.message || error.message);
        }
    }
);
