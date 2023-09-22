import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../axios/axiosInstance";
import { DASHBOARD_ROUTE, GET_DASHBOARD_DATA } from "../actions";

export const getDashboardData = createAsyncThunk(
    GET_DASHBOARD_DATA,
    async (accessToken: string) => {
        try {
            const response = await axiosInstance.get(DASHBOARD_ROUTE, {
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
