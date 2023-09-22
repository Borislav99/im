export interface InitialState {
    isLoading?: boolean;
    error: {
        isError?: boolean;
        errorMessage?: string;
    };
    categories: Category[];
    filteredCategories: Category[];
    currentPage: number;
}

export interface Category {
    id: number;
    name: string;
    created_at: string;
}

export interface GetCategoriesDataPayload {
    payload: {
        data: Category[];
    };
}

export interface CreateCategoryPayload {
    payload: {
        data: Category;
    };
}

export interface DeleteCategoryPayload {
    payload: {
        name: string;
    };
}

export interface UpdateCategoryPayload {
    payload: Category;
}

export interface CreateCategoryArgs {
    accessToken: string;
    name: string;
}

export interface DeleteCategoryArgs {
    accessToken: string;
    id: number;
}

export interface UpdateCategoryArgs extends CreateCategoryArgs {
    id: number;
}
