import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./types";

const initialState: InitialState = {
    header: {
        activeLink: "dashboard",
        isDropdownVisible: false,
    },
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        toggleDropdown: (state) => {
            state.header.isDropdownVisible = !state.header.isDropdownVisible;
        },
        changeActiveLink: (state, action: PayloadAction<string>) => {
            state.header.activeLink = action.payload;
        },
    },
});

export const { toggleDropdown, changeActiveLink } = dashboardSlice.actions;

export default dashboardSlice.reducer;
