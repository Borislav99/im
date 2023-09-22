import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../axios/axiosInstance";
import { CATEGORIES_ROUTE, UPDATE_CATEGORY_ACTION } from "../actions";
import { UpdateCategoryArgs } from "../types";
import { getCategoriesData } from "./getCategoriesDataThunk";
import { getDashboardData } from "../../statsSlice/thunks";

export const updateCategory = createAsyncThunk(
    UPDATE_CATEGORY_ACTION,
    async ({ accessToken, name, id }: UpdateCategoryArgs, { dispatch }) => {
        try {
            const response = await axiosInstance.put(
                `${CATEGORIES_ROUTE}/${id}`,
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
