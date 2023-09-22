import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../axios/axiosInstance";
import { CATEGORIES_ROUTE, GET_CATEGORIES_DATA_ACTION } from "../actions";

export const getCategoriesData = createAsyncThunk(
    GET_CATEGORIES_DATA_ACTION,
    async (accessToken: string) => {
        try {
            const response = await axiosInstance.get(CATEGORIES_ROUTE, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response.data.message || error.message);
        }
    }
);
