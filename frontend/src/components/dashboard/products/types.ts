import { Category } from "../../../features/categorySlice/types";
import { Product } from "../../../features/productsSlice/types";
import { Options } from "../../common/types";
import { CategoriesTableRowProps } from "../categories/types";

export interface ProductsTableRowProps extends CategoriesTableRowProps {
    quantity: number;
    price: number;
    categories: Category[];
}

export interface Products extends Category {
    quantity: number;
    price: number;
    category: string;
}

export interface ProductsTableChildrenProps {
    items: Product[];
    handleDelete: (id: number) => void;
    handleEdit: (toogle: boolean, id: number | undefined) => void;
}

export interface AddProductModalProps {
    isModalOpen: boolean;
    handleCloseModal: () => void;
    selectedProduct?: Product;
    editProductId?: number;
    allAvailableCategories: Options[];
}

export interface ProductsTableProps {
    handleAddProductModalToggle: (toggle: boolean) => void;
    handleEditProductModalToggle: (
        toogle: boolean,
        id: number | undefined
    ) => void;
    allAvailableCategories: Options[];
}
