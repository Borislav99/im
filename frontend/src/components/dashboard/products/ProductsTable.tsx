import { useEffect, useState } from "react";
import { ProductsTableChildren } from ".";
import {
    getAllProducts,
    getCurrentPage,
    getFilteredProducts,
} from "../../../features/productsSlice/selectors";
import { deleteProduct } from "../../../features/productsSlice/thunks";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getFromLocalStorage } from "../../../utils";
import { Pagination, Table, TableHeader } from "../../common";
import { Select } from "../../common/Select";
import { headerItems } from "./constants";
import { ProductsTableProps } from "./types";
import { handleInputChange } from "../../login/helpers";
import {
    changeCategoryPage,
    searchByCategories,
} from "../../../features/productsSlice/productsSlice";
import { PAGE_SIZE } from "../categories/constants";

export const ProductsTable = ({
    handleAddProductModalToggle,
    handleEditProductModalToggle,
    allAvailableCategories,
}: ProductsTableProps) => {
    const dispatch = useAppDispatch();
    const allProducts = useAppSelector(getAllProducts);
    const filteredProducts = useAppSelector(getFilteredProducts);
    const currentPage = useAppSelector(getCurrentPage);

    const [searchProductsName, setSearchProductsName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const accessToken = getFromLocalStorage("im_accessToken")!;

    const productsToDisplay = filteredProducts.filter((product) =>
        product.name
            .toLocaleLowerCase()
            .includes(searchProductsName.toLowerCase())
    );
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentItems = productsToDisplay.slice(startIndex, endIndex);
    const numberOfPages = Math.ceil(productsToDisplay.length / 5);

    const handleDelete = (id: number) => {
        dispatch(deleteProduct({ accessToken, id }));
    };

    const handleChangeCategory = (category: string) => {
        setSelectedCategory(category);
        dispatch(searchByCategories(category));
    };

    const handleOnPrevButtonClick = () =>
        currentPage > 0 && dispatch(changeCategoryPage(false));

    const handleOnNextButtonClick = () =>
        currentPage < numberOfPages && dispatch(changeCategoryPage(true));

    useEffect(() => {
        setSearchProductsName("");
        handleChangeCategory("all");
    }, [allProducts]);

    return (
        <div className="flex flex-col mt-5 mb-5">
            <div className="flex flex-col mt-5 mb-5">
                <TableHeader
                    inputPlaceholder="Search for products"
                    inputValue={searchProductsName}
                    inputOnChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                    ) => {
                        const inputValue = event.target.value;
                        handleInputChange({
                            inputValue,
                            setValue: setSearchProductsName,
                        });
                    }}
                    buttonText="add product"
                    buttonOnClick={() => handleAddProductModalToggle(true)}
                    children={
                        <div className="mb-5">
                            <Select
                                id="category"
                                options={allAvailableCategories}
                                onChange={(event) => {
                                    const inputValue = event.target.value;
                                    handleChangeCategory(inputValue);
                                }}
                                value={selectedCategory}
                            />
                        </div>
                    }
                />
                <Table
                    headerItems={headerItems}
                    items={currentItems}
                    children={
                        <ProductsTableChildren
                            items={currentItems}
                            handleEdit={handleEditProductModalToggle}
                            handleDelete={handleDelete}
                        />
                    }
                />
                {currentItems.length > 0 && (
                    <Pagination
                        onPrevButtonClick={handleOnPrevButtonClick}
                        currentPage={currentPage}
                        numberOfPages={numberOfPages}
                        onNextButtonClick={handleOnNextButtonClick}
                    />
                )}
            </div>
        </div>
    );
};
