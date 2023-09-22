import { ProductsTableRow } from ".";
import { ProductsTableChildrenProps } from "./types";

export const ProductsTableChildren = ({
    items,
    handleEdit,
    handleDelete,
}: ProductsTableChildrenProps) => {
    return (
        <>
            {items.map(
                (
                    {
                        name,
                        id,
                        created_at: createdAt,
                        quantity,
                        price,
                        categories,
                    },
                    index
                ) => {
                    return (
                        <ProductsTableRow
                            index={index}
                            id={id}
                            name={name}
                            quantity={quantity}
                            price={price}
                            categories={categories}
                            createdAt={createdAt}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            key={id}
                        />
                    );
                }
            )}
        </>
    );
};
