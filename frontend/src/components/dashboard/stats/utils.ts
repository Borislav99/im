import { ProductsPerCategory } from "../../../features/statsSlice/types";

export const renameItemsCount = (data: ProductsPerCategory[]) => {
    return data?.map((item) => {
        return {
            products: item.items_count,
            name: item.name,
        };
    });
};
