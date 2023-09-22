import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getDashboard = createSelector(
    (state: RootState) => state.stats,
    (stats) => stats
);
