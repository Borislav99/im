import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../axios/axiosInstance";
import { CREATE_PRODUCT_ACTION, PRODUCTS_ROUTE } from "../actions";
import { CreateProductArgs } from "../types";
import { getProductsData } from "./getProductsDataThunk";
import { getCategoryIds } from "../../../components/dashboard/products/utils";
import { getDashboardData } from "../../statsSlice/thunks";

export const createProduct = createAsyncThunk(
    CREATE_PRODUCT_ACTION,
    async (
        { accessToken, name, quantity, price, categories }: CreateProductArgs,
        { dispatch }
    ) => {
        try {
            const categoryIds = getCategoryIds(categories);
            const response = await axiosInstance.post(
                PRODUCTS_ROUTE,
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
