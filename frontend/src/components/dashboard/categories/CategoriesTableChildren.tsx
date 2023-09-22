import { CategoriesTableRow } from ".";
import { CategoriesTableChildrenProps } from "./types";

export const CategoriesTableChildren = ({
    items,
    handleEdit,
    handleDelete,
}: CategoriesTableChildrenProps) => {
    return (
        <>
            {items.map(({ name, id, created_at: createdAt }, index) => {
                return (
                    <CategoriesTableRow
                        index={index}
                        id={id}
                        name={name}
                        createdAt={createdAt}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        key={id}
                    />
                );
            })}
        </>
    );
};
