import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToggleAuthorizeErrorPayload } from "../errorSlice/types";
import { GetUserDataPayload, InitialState, LoginPayload } from "./types";
import { getFromLocalStorage, saveToLocalStorage } from "../../utils";
import {
    getUserData,
    loginUser,
    logoutUser,
    registerUser,
    updateUserDetails,
    updateUserPassword,
} from "./thunks";

const initialState: InitialState = {
    isAuth: Boolean(getFromLocalStorage("im_accessToken")) ?? false,
    isLoading: undefined,
    isError: undefined,
    errorMessage: undefined,
    userDetails: {},
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        toggleFetchingError: (
            state: InitialState,
            action: PayloadAction<ToggleAuthorizeErrorPayload>
        ) => {
            const { toggle, message } = action.payload;
            if (toggle) {
                state.errorMessage = message;
            }
            state.isError = toggle;
        },
    },
    extraReducers: (builder) => {
        builder
            // loginUser
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action: LoginPayload) => {
                const { access_token } = action.payload;
                saveToLocalStorage("im_accessToken", access_token);
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message;
            })
            // registerUser
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action: LoginPayload) => {
                const { access_token } = action.payload;
                saveToLocalStorage("im_accessToken", access_token);
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message;
            })
            // logoutUser
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuth = false;
                state.userDetails.name = undefined;
                state.userDetails.email = undefined;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message;
            })
            // getUserData
            .addCase(getUserData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                getUserData.fulfilled,
                (state, action: GetUserDataPayload) => {
                    const { name, email } = action.payload;
                    state.userDetails.email = email;
                    state.userDetails.name = name;
                }
            )
            .addCase(getUserData.rejected, (state) => {
                state.isLoading = false;
                state.isAuth = false;
            })
            // updateUserDetails
            .addCase(updateUserDetails.pending, (state) => {
                state.userDetails.isLoading = true;
            })
            .addCase(
                updateUserDetails.fulfilled,
                (state, action: GetUserDataPayload) => {
                    const { name, email } = action.payload;
                    state.userDetails.email = email;
                    state.userDetails.name = name;
                    state.userDetails.isLoading = false;
                }
            )
            .addCase(updateUserDetails.rejected, (state) => {
                state.userDetails.isLoading = false;
            })
            // updateUserPassword
            .addCase(updateUserPassword.pending, (state) => {
                state.userDetails.isLoading = true;
            })
            .addCase(updateUserPassword.fulfilled, (state) => {
                state.userDetails.isLoading = false;
                state.isError = false;
                state.errorMessage = "";
            })
            .addCase(updateUserPassword.rejected, (state, action) => {
                state.isError = true;
                const {
                    error: { message },
                } = action;
                state.errorMessage = message;
                state.userDetails.isLoading = false;
            });
    },
});

export const { toggleFetchingError } = userSlice.actions;

export default userSlice.reducer;
