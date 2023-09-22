import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

interface ClearErrorArgs {
    dispatch: AppDispatch;
    errorType: ActionCreatorWithPayload<any, string>;
}

export const saveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => localStorage.getItem(key);

export const removeFromLocalStorage = (key: string) =>
    localStorage.removeItem(key);

export const clearError = ({ dispatch, errorType }: ClearErrorArgs) => {
    setTimeout(() => {
        dispatch(
            errorType({
                toggle: false,
            })
        );
    }, 2000);
};
