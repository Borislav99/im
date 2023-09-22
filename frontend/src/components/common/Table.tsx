import { TableProps } from "./types";

export const Table = ({ headerItems, items, children }: TableProps) => {
    return (
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-white border-b">
                            <tr>
                                <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                >
                                    #
                                </th>
                                {headerItems.map((headerItem, index) => {
                                    return (
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            key={index}
                                        >
                                            {headerItem.toUpperCase()}
                                        </th>
                                    );
                                })}
                                <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                >
                                    ACTIONS
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr>
                                    <td>
                                        Currently there are no items that match
                                        that criteria
                                    </td>
                                </tr>
                            ) : (
                                <>{children}</>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
