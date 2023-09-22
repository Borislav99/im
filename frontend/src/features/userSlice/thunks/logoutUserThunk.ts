import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../axios/axiosInstance";
import { removeFromLocalStorage } from "../../../utils";
import { LOGOUT_ACTION, LOGOUT_ROUTE } from "../actions";

export const logoutUser = createAsyncThunk(
    LOGOUT_ACTION,
    async (accessToken: string) => {
        try {
            const response = await axiosInstance.post(
                LOGOUT_ROUTE,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            removeFromLocalStorage("im_accessToken");
            return response.data;
        } catch (error: any) {
            throw new Error(error.response.data.message || error.message);
        }
    }
);
