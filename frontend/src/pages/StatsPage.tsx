import { Chart, StatsCard } from "../components/dashboard/stats";
import { getDashboard } from "../features/statsSlice/selectors";
import { useAppSelector } from "../store";

export const StatsPage = () => {
    const { isLoading, categories, products, productsPerCategory } =
        useAppSelector(getDashboard);

    if (isLoading) {
        return (
            <main>
                <h1 className="mt-5">Loading...</h1>
            </main>
        );
    }
    return (
        <main>
            <div className="flex gap-5 mt-5 max-w-md ml-auto mr-auto">
                <StatsCard
                    name="categories"
                    number={categories!}
                    navigateTo="/categories"
                />
                <StatsCard
                    name="products"
                    number={products!}
                    navigateTo="/products"
                />
            </div>
            <Chart
                data={productsPerCategory!}
                categories={categories!}
                products={products!}
            />
        </main>
    );
};
