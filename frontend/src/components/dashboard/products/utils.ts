import { Category } from "../../../features/categorySlice/types";
import { Options } from "../../common/types";

export const transformCategories = (categories: Category[]) => {
    return categories.map((category) => {
        return { id: category.id, value: category.name, label: category.name };
    });
};

export const showCategoryNames = (categories: Category[]) =>
    categories.map((category) => category.name).join(", ");

export const getCategoryIds = (categories: Options[]) =>
    categories.map((category) => category.id);
