import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../axios/axiosInstance";
import { CATEGORIES_ROUTE, CREATE_CATEGORY_ACTION } from "../actions";
import { CreateCategoryArgs } from "../types";
import { getCategoriesData } from "./getCategoriesDataThunk";
import { getDashboardData } from "../../statsSlice/thunks";

export const createCategory = createAsyncThunk(
    CREATE_CATEGORY_ACTION,
    async ({ accessToken, name }: CreateCategoryArgs, { dispatch }) => {
        try {
            const response = await axiosInstance.post(
                CATEGORIES_ROUTE,
                {
                    name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            dispatch(getCategoriesData(accessToken));
            dispatch(getDashboardData(accessToken));
            return response.data;
        } catch (error: any) {
            throw new Error(error.response.data.message || error.message);
        }
    }
);
