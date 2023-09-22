import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getHeader = createSelector(
    (state: RootState) => state.dashboard.header,
    (header) => header
);
