import { createSelector } from "reselect";
import { RootState } from "../../store";

export const getCategories = createSelector(
    (state: RootState) => state.categories,
    (categories) => categories
);

export const getFilteredCategories = createSelector(
    (state: RootState) => state.categories.filteredCategories,
    (filteredCategories) => filteredCategories
);

export const getAllCategories = createSelector(
    (state: RootState) => state.categories.categories,
    (allCategories) => allCategories
);

export const getCategoriesError = createSelector(
    (state: RootState) => state.categories.error,
    (categoriesError) => categoriesError
);

export const getCurrentPage = createSelector(
    (state: RootState) => state.categories.currentPage,
    (currentPage) => currentPage
);
