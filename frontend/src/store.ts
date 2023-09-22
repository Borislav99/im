import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./features/errorSlice/errorSlice";
import userReducer from "./features/userSlice/userSlice";
import dashboardReducer from "./features/dashboardSlice/dashboardSlice";
import categoriesReducer from "./features/categorySlice/categorySlice";
import productsReducer from "./features/productsSlice/productsSlice";
import statsReducer from "./features/statsSlice/statsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        error: errorReducer,
        user: userReducer,
        dashboard: dashboardReducer,
        categories: categoriesReducer,
        products: productsReducer,
        stats: statsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
