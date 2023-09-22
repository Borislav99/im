import { useEffect, useState } from "react";
import { Modal } from "../../common/Modal";
import { Button, FormInput, Error } from "../../common";
import { BsDatabaseAdd } from "react-icons/bs";
import { EditCategoriesModalProps } from "./types";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getAuthorizeError } from "../../../features/errorSlice/selectors";
import { ErrorState } from "../../login/types";
import { handleError, handleInputChange } from "../../login/helpers";
import { toggleAuthorizeError } from "../../../features/errorSlice/errorSlice";
import { errorMessages } from "../../../features/errorSlice/constants";
import { clearError, getFromLocalStorage } from "../../../utils";
import { updateCategory } from "../../../features/categorySlice/thunks/updateCategoryThunk";
import {
    getCategories,
    getCategoriesError,
} from "../../../features/categorySlice/selectors";
import { toggleCategoriesError } from "../../../features/categorySlice/categorySlice";

export const EditCategoriesModal = ({
    handleCloseModal,
    isModalOpen,
    selectedCategory,
    editCategoryId,
}: EditCategoriesModalProps) => {
    const dispatch = useAppDispatch();

    const { isError: authorizeError, errorMessage: authorizedErrorMessage } =
        useAppSelector(getAuthorizeError);

    const { isLoading } = useAppSelector(getCategories);

    const { isError: categoriesError, errorMessage: categoriesErrorMessage } =
        useAppSelector(getCategoriesError);

    const [categoryName, setCategoryName] = useState("");

    const [categoryError, setCategoryError] = useState<ErrorState>({
        isError: false,
        errorMessage: "",
    });

    const isDisabled = authorizeError || isLoading || categoriesError;
    const accessToken = getFromLocalStorage("im_accessToken")!;

    const errorMessage = authorizeError
        ? authorizedErrorMessage
        : categoriesErrorMessage;

    const isError = authorizeError || categoriesError;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleError({
            value: categoryName,
            errorMessage: "Please enter your category",
            setError: setCategoryError,
        });

        if (categoryName.length === 0) {
            return dispatch(
                toggleAuthorizeError({
                    toggle: true,
                    message: errorMessages.resolveAllErrors,
                })
            );
        }

        dispatch(
            updateCategory({
                name: categoryName,
                accessToken,
                id: editCategoryId!,
            })
        );
    };

    useEffect(() => {
        authorizeError &&
            clearError({ dispatch, errorType: toggleAuthorizeError });
        categoriesError &&
            clearError({
                dispatch,
                errorType: toggleCategoriesError,
            });
    }, [authorizeError]);

    useEffect(() => {
        if (selectedCategory) {
            setCategoryName(selectedCategory.name);
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (!isLoading && !categoriesError) {
            handleCloseModal();
        }
    }, [isLoading]);

    return (
        <Modal
            text="Edit category"
            isModalOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
        >
            <form onSubmit={handleSubmit}>
                {isError && <Error errorMessage={errorMessage!} />}
                <FormInput
                    type="text"
                    inputPlaceholder="Category name"
                    value={categoryName}
                    onChange={(event) => {
                        const inputValue = event.target.value;
                        handleInputChange({
                            inputValue,
                            setValue: setCategoryName,
                        });
                    }}
                    icon={<BsDatabaseAdd />}
                    labelValue="Please type category name"
                    error={categoryError && categoryError.errorMessage}
                />
                <Button
                    backgroundColor="bg-green-500"
                    hoverColor="hover:bg-green-600"
                    text="edit category"
                    disabled={isDisabled}
                />
            </form>
        </Modal>
    );
};
