import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../axios/axiosInstance";
import { GET_USER_DATA_ACTION, GET_USER_DATA_ROUTE } from "../actions";

export const getUserData = createAsyncThunk(
    GET_USER_DATA_ACTION,
    async (accessToken: string) => {
        try {
            const response = await axiosInstance.get(GET_USER_DATA_ROUTE, {
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
