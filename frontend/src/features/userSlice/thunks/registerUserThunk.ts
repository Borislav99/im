import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../axios/axiosInstance";
import { REGISTER_ACTION, REGISTER_ROUTE } from "../actions";
import { RegisterUserArgs } from "../types";

export const registerUser = createAsyncThunk(
    REGISTER_ACTION,
    async ({
        name,
        email,
        password,
        password_confirmation,
    }: RegisterUserArgs) => {
        try {
            const response = await axiosInstance.post(REGISTER_ROUTE, {
                name,
                email,
                password,
                password_confirmation,
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response.data.message || error.message);
        }
    }
);
