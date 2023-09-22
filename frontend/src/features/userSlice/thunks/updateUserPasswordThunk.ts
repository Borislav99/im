import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../axios/axiosInstance";
import { UPDATE_PASSWORD_ACTION, UPDATE_PASSWORD_ROUTE } from "../actions";
import { UpdateUserPasswordArgs } from "../types";

export const updateUserPassword = createAsyncThunk(
    UPDATE_PASSWORD_ACTION,
    async ({
        currentPassword,
        newPassword,
        confirmPassword,
        accessToken,
    }: UpdateUserPasswordArgs) => {
        try {
            const response = await axiosInstance.put(
                UPDATE_PASSWORD_ROUTE,
                {
                    current_password: currentPassword,
                    password: newPassword,
                    password_confirmation: confirmPassword,
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
