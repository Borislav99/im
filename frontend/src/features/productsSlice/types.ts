import { Options } from "../../components/common/types";
import { Category } from "../categorySlice/types";

export interface InitialState {
    isLoading?: boolean;
    error: {
        isError?: boolean;
        errorMessage?: string;
    };
    products: Product[];
    filteredProducts: Product[];
    currentPage: number;
}

export interface Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    categories: Category[];
    created_at: string;
}

export interface GetProductsDataPayload {
    payload: {
        data: Product[];
    };
}

export interface CreateProductPayload {
    payload: {
        data: Product;
    };
}

export interface UpdateProductPayload {
    payload: Product;
}

export interface CreateProductArgs {
    name: string;
    quantity: number;
    price: number;
    categories: Options[];
    accessToken: string;
}

export interface UpdateProductArgs extends CreateProductArgs {
    id: number;
}
