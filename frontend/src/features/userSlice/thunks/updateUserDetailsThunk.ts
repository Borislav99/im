import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../axios/axiosInstance";
import { UPDATE_DETAILS_ACTION, UPDATE_DETAILS_ROUTE } from "../actions";
import { UpdateUserDetailsArgs } from "../types";

export const updateUserDetails = createAsyncThunk(
    UPDATE_DETAILS_ACTION,
    async ({ name, email, accessToken }: UpdateUserDetailsArgs) => {
        try {
            const response = await axiosInstance.put(
                UPDATE_DETAILS_ROUTE,
                {
                    name,
                    email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            throw new Error(error.response.data.message || error.message);
        }
    }
);
