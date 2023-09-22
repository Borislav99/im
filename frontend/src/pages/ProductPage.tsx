import { useState } from "react";
import {
    AddProductModal,
    EditProductModal,
    ProductsTable,
} from "../components/dashboard/products";
import { useAppSelector } from "../store";
import { getAllCategories } from "../features/categorySlice/selectors";
import { Options } from "../components/common/types";
import { transformCategories } from "../components/dashboard/products/utils";
import { allCategories } from "../components/dashboard/products/constants";
import { getAllProducts } from "../features/productsSlice/selectors";

export const ProductPage = () => {
    const allProducts = useAppSelector(getAllProducts);

    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

    const [editProductId, setEditProductId] = useState<undefined | number>(
        undefined
    );

    const selectedProduct = allProducts.find(
        (category) => category.id === editProductId
    );

    // get categories
    const categories = useAppSelector(getAllCategories);
    const transformedCategories = transformCategories(categories);
    const allAvailableCategories = [
        allCategories,
        ...transformedCategories,
    ] as Options[];

    const handleAddProductModalToggle = (toggle: boolean) => {
        setIsAddProductModalOpen(toggle);
    };

    const handleEditProductModalToggle = (toggle: boolean, id?: number) => {
        setIsEditProductModalOpen(toggle);
        setEditProductId(id!);
    };

    return (
        <>
            <ProductsTable
                handleAddProductModalToggle={handleAddProductModalToggle}
                handleEditProductModalToggle={handleEditProductModalToggle}
                allAvailableCategories={allAvailableCategories}
            />
            <AddProductModal
                handleCloseModal={() => handleAddProductModalToggle(false)}
                isModalOpen={isAddProductModalOpen}
                allAvailableCategories={allAvailableCategories}
            />
            <EditProductModal
                handleCloseModal={() => handleEditProductModalToggle(false)}
                isModalOpen={isEditProductModalOpen}
                selectedProduct={selectedProduct}
                editProductId={editProductId}
                allAvailableCategories={allAvailableCategories}
            />
        </>
    );
};
