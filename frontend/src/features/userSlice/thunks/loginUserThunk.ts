import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN_ACTION, LOGIN_ROUTE } from "../actions";
import { LoginUserArgs } from "../types";
import { axiosInstance } from "../../../axios/axiosInstance";

export const loginUser = createAsyncThunk(
    LOGIN_ACTION,
    async ({ email, password }: LoginUserArgs) => {
        try {
            const response = await axiosInstance.post(LOGIN_ROUTE, {
                email,
                password,
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response.data.message || error.message);
        }
    }
);
