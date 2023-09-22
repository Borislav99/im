import { ProductsPerCategory } from "../../../features/statsSlice/types";

export interface StatsCardProps {
    name: string;
    number: number;
    navigateTo: string;
}

export interface ChartProps {
    data: ProductsPerCategory[];
    categories: number;
    products: number;
}
