import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface AuthorizeError {
    isError: boolean;
    errorMessage?: string;
}

export interface InitialState {
    authorizeError: AuthorizeError;
}

export interface ToggleAuthorizeErrorPayload {
    toggle: boolean;
    message?: string;
}

export type ErrorAction = ActionCreatorWithPayload<
    ToggleAuthorizeErrorPayload,
    "error/toggleAuthorizeError" | "user/toggleFetchingError"
>;
