import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState, ToggleAuthorizeErrorPayload } from "./types";

const initialState: InitialState = {
    authorizeError: {
        isError: false,
    },
};

export const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        toggleAuthorizeError: (
            state: InitialState,
            action: PayloadAction<ToggleAuthorizeErrorPayload>
        ) => {
            const { toggle, message } = action.payload;
            if (toggle) {
                state.authorizeError.errorMessage = message;
            }
            state.authorizeError.isError = toggle;
        },
    },
});

export const { toggleAuthorizeError } = errorSlice.actions;
export default errorSlice.reducer;
