import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getProducts = createSelector(
    (state: RootState) => state.products,
    (products) => products
);

export const getFilteredProducts = createSelector(
    (state: RootState) => state.products.filteredProducts,
    (filteredProducts) => filteredProducts
);

export const getAllProducts = createSelector(
    (state: RootState) => state.products.products,
    (getAllProducts) => getAllProducts
);

export const getProductsError = createSelector(
    (state: RootState) => state.products.error,
    (productsError) => productsError
);

export const getCurrentPage = createSelector(
    (state: RootState) => state.products.currentPage,
    (currentPage) => currentPage
);
