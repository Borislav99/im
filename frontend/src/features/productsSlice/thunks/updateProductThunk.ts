import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../axios/axiosInstance";
import { PRODUCTS_ROUTE, UPDATE_PRODUCT_ACTION } from "../actions";
import { UpdateProductArgs } from "../types";
import { getCategoryIds } from "../../../components/dashboard/products/utils";
import { getProductsData } from "./getProductsDataThunk";
import { getDashboardData } from "../../statsSlice/thunks";

export const updateProduct = createAsyncThunk(
    UPDATE_PRODUCT_ACTION,
    async (
        {
            accessToken,
            name,
            quantity,
            price,
            categories,
            id,
        }: UpdateProductArgs,
        { dispatch }
    ) => {
        try {
            const categoryIds = getCategoryIds(categories);
            const response = await axiosInstance.put(
                `${PRODUCTS_ROUTE}/${id}`,
                {
                    name,
                    quantity,
                    price: price * 100,
                    categories: categoryIds,
                },
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
