import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { renameItemsCount } from "./utils";
import { ChartProps } from "./types";

export const Chart = ({ data, categories, products }: ChartProps) => {
    const productsPerCategory = renameItemsCount(data);
    const noData = categories === 0 || products === 0;

    if (noData) {
        return <h1 className="text-center mt-5">No data to display</h1>;
    }

    return (
        <div className="w-full h-96 mt-5">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={productsPerCategory}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="products"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
