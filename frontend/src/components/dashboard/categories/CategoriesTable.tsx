import { useEffect, useState } from "react";
import {
    getAllCategories,
    getCurrentPage,
    getFilteredCategories,
} from "../../../features/categorySlice/selectors";
import { useAppDispatch, useAppSelector } from "../../../store";
import { Pagination, Table, TableHeader } from "../../common";
import { PAGE_SIZE, headerItems } from "./constants";
import { CategoriesTableProps } from "./types";
import { handleInputChange } from "../../login/helpers";
import {
    changeCategoryPage,
    searchForCategories,
} from "../../../features/categorySlice/categorySlice";
import { deleteCategory } from "../../../features/categorySlice/thunks";
import { getFromLocalStorage } from "../../../utils";
import { CategoriesTableChildren } from ".";

export const CategoriesTable = ({
    handleAddCategoryModalToggle,
    handleEditCategoryModalToggle,
}: CategoriesTableProps) => {
    const dispatch = useAppDispatch();
    const filteredCategories = useAppSelector(getFilteredCategories);
    const allCategories = useAppSelector(getAllCategories);
    const currentPage = useAppSelector(getCurrentPage);

    const [searchCategoryName, setSearchCategoryName] = useState("");

    const accessToken = getFromLocalStorage("im_accessToken")!;
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentItems = filteredCategories.slice(startIndex, endIndex);

    const numberOfPages = Math.ceil(filteredCategories.length / 5);

    const handleDelete = (id: number) => {
        dispatch(deleteCategory({ accessToken, id }));
    };

    const handleOnPrevButtonClick = () =>
        currentPage > 0 && dispatch(changeCategoryPage(false));

    const handleOnNextButtonClick = () =>
        currentPage < numberOfPages && dispatch(changeCategoryPage(true));

    useEffect(() => {
        dispatch(searchForCategories(searchCategoryName));
    }, [searchCategoryName]);

    useEffect(() => {
        setSearchCategoryName("");
    }, [allCategories]);

    return (
        <div className="flex flex-col mt-5 mb-5">
            <div className="flex flex-col mt-5 mb-5">
                <TableHeader
                    inputPlaceholder="Search for categories"
                    inputValue={searchCategoryName}
                    inputOnChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                    ) => {
                        const inputValue = event.target.value;
                        handleInputChange({
                            inputValue,
                            setValue: setSearchCategoryName,
                        });
                    }}
                    buttonText="add category"
                    buttonOnClick={() => handleAddCategoryModalToggle(true)}
                />
                <Table
                    headerItems={headerItems}
                    items={currentItems}
                    children={
                        <CategoriesTableChildren
                            items={currentItems}
                            handleDelete={handleDelete}
                            handleEdit={handleEditCategoryModalToggle}
                        />
                    }
                />
                {filteredCategories.length > PAGE_SIZE && (
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
