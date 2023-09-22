export interface ProductsPerCategory {
    name: string;
    items_count: number;
}

export interface InitialState {
    products?: number;
    categories?: number;
    productsPerCategory?: ProductsPerCategory[];
    isLoading: boolean;
    isError: boolean;
}

export interface GetDashboardDataPayload {
    data: {
        itemsCount: number;
        categoriesCount: number;
        itemsInEachCategory: ProductsPerCategory[];
    };
}
