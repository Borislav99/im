import { Category } from "../../../features/categorySlice/types";

export interface AddCategoriesModalProps {
    isModalOpen: boolean;
    handleCloseModal: () => void;
}

export interface AddCategoriesModalProps {
    handleCloseModal: () => void;
    isModalOpen: boolean;
}

export interface EditCategoriesModalProps {
    handleCloseModal: () => void;
    isModalOpen: boolean;
    selectedCategory?: Category;
    editCategoryId?: number;
}

export interface CategoriesTableProps {
    handleAddCategoryModalToggle: (value: boolean) => void;
    handleEditCategoryModalToggle: (value: boolean) => void;
}

export interface CategoriesTableRowProps {
    index: number;
    id: number;
    name: string;
    createdAt: string;
    handleDelete: (id: number) => void;
    handleEdit: (toggle: boolean, id?: number) => void;
}
export interface CategoriesTableChildrenProps {
    items: Category[];
    handleDelete: (id: number) => void;
    handleEdit: (toogle: boolean, id: number | undefined) => void;
}
