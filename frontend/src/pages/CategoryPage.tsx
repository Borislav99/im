import { useState } from "react";
import {
    AddCategoriesModal,
    CategoriesTable,
    EditCategoriesModal,
} from "../components/dashboard/categories";
import { useAppSelector } from "../store";
import { getFilteredCategories } from "../features/categorySlice/selectors";

export const CategoryPage = () => {
    const allCategories = useAppSelector(getFilteredCategories);

    const [isAddCategoriresModalOpen, setIsAddCategoriresModalOpen] =
        useState(false);

    const [isEditCategoriresModalOpen, setIsEditCategoriresModalOpen] =
        useState(false);

    const [editCategoryId, setEditCategoryId] = useState<undefined | number>(
        undefined
    );

    const selectedCategory = allCategories.find(
        (category) => category.id === editCategoryId
    );

    const handleAddCategoryModalToggle = (toggle: boolean) => {
        setIsAddCategoriresModalOpen(toggle);
    };

    const handleEditCategoryModalToggle = (toggle: boolean, id?: number) => {
        setIsEditCategoriresModalOpen(toggle);
        setEditCategoryId(id!);
    };

    return (
        <>
            <AddCategoriesModal
                handleCloseModal={() => handleAddCategoryModalToggle(false)}
                isModalOpen={isAddCategoriresModalOpen}
            />
            <EditCategoriesModal
                handleCloseModal={() => handleEditCategoryModalToggle(false)}
                isModalOpen={isEditCategoriresModalOpen}
                selectedCategory={selectedCategory}
                editCategoryId={editCategoryId}
            />
            <CategoriesTable
                handleAddCategoryModalToggle={handleAddCategoryModalToggle}
                handleEditCategoryModalToggle={handleEditCategoryModalToggle}
            />
        </>
    );
};
