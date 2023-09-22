import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../axios/axiosInstance";
import { GET_PRODUCTS_DATA_ACTION, PRODUCTS_ROUTE } from "../actions";

export const getProductsData = createAsyncThunk(
    GET_PRODUCTS_DATA_ACTION,
    async (accessToken: string) => {
        try {
            const response = await axiosInstance.get(PRODUCTS_ROUTE, {
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
