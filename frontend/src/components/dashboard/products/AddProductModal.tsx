import { BsDatabaseAdd, BsCart3, BsCurrencyDollar } from "react-icons/bs";
import { Button, Error, FormInput } from "../../common";
import { Modal } from "../../login";
import { useEffect, useState } from "react";
import { MultiSelect } from "../../common/MultiSelect";
import { AddProductModalProps } from "./types";
import { Options } from "../../common/types";
import { handleError, handleInputChange } from "../../login/helpers";
import { ErrorState, SetNumberValue } from "../../login/types";
import { MultiValue } from "react-select";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getAuthorizeError } from "../../../features/errorSlice/selectors";
import { clearError, getFromLocalStorage } from "../../../utils";
import { toggleAuthorizeError } from "../../../features/errorSlice/errorSlice";
import { errorMessages } from "../../../features/errorSlice/constants";
import { createProduct } from "../../../features/productsSlice/thunks";
import {
    getProducts,
    getProductsError,
} from "../../../features/productsSlice/selectors";
import { toggleProductsError } from "../../../features/productsSlice/productsSlice";

export const AddProductModal = ({
    isModalOpen,
    handleCloseModal,
    allAvailableCategories,
}: AddProductModalProps) => {
    const availableCategories = [...allAvailableCategories.slice(1)];
    const accessToken = getFromLocalStorage("im_accessToken")!;
    const dispatch = useAppDispatch();
    const { isError: authorizeError, errorMessage: authorizedErrorMessage } =
        useAppSelector(getAuthorizeError);

    const { isLoading } = useAppSelector(getProducts);
    const { errorMessage: productsErrorMessage, isError: productsError } =
        useAppSelector(getProductsError);

    const isDisabled = authorizeError || productsError || isLoading;

    const errorMessage = authorizeError
        ? authorizedErrorMessage
        : productsErrorMessage;

    const isError = authorizeError || productsError;

    const [productName, setProductName] = useState("");
    const [productQuantity, setProductQuantity] = useState(1);
    const [productPrice, setProductPrice] = useState(1);
    const [categories, setCategories] = useState<Options[]>([]);

    const [productNameError, setProductNameError] = useState<ErrorState>({
        isError: false,
        errorMessage: "",
    });
    const [categoriesError, setCategoriesError] = useState<ErrorState>({
        isError: false,
        errorMessage: "",
    });

    const handleNumberChange = (inputValue: number, setValue: SetNumberValue) =>
        inputValue > 0 && setValue(inputValue);

    const handleMultiSelectChange = (newValue: MultiValue<Options>) =>
        setCategories(newValue as Options[]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleError({
            value: productName,
            errorMessage: "Please enter your product name",
            setError: setProductNameError,
        });
        handleError({
            value: categories,
            errorMessage: "Please select at least one category",
            setError: setCategoriesError,
        });
        if (productName.length === 0 || categories.length === 0) {
            return dispatch(
                toggleAuthorizeError({
                    toggle: true,
                    message: errorMessages.resolveAllErrors,
                })
            );
        }
        dispatch(
            createProduct({
                name: productName,
                price: productPrice,
                quantity: productQuantity,
                categories,
                accessToken,
            })
        );
    };

    useEffect(() => {
        authorizeError &&
            clearError({ dispatch, errorType: toggleAuthorizeError });
        productsError &&
            clearError({
                dispatch,
                errorType: toggleProductsError,
            });
    }, [authorizeError, productsError]);

    useEffect(() => {
        if (!isLoading && !productsError) {
            handleCloseModal();
        }
    }, [isLoading]);

    return (
        <Modal
            text="Add product"
            isModalOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
        >
            <form onSubmit={handleSubmit}>
                {isError && <Error errorMessage={errorMessage!} />}
                <FormInput
                    type="text"
                    inputPlaceholder="Product name"
                    value={productName}
                    onChange={(event) => {
                        const inputValue = event.target.value;
                        handleInputChange({
                            inputValue,
                            setValue: setProductName,
                        });
                    }}
                    icon={<BsDatabaseAdd />}
                    labelValue="Please type product name"
                    error={productNameError && productNameError.errorMessage}
                />
                <FormInput
                    type="number"
                    inputPlaceholder="Product quantity"
                    value={productQuantity}
                    onChange={(event) => {
                        const inputValue = +event.target.value;
                        handleNumberChange(inputValue, setProductQuantity);
                    }}
                    icon={<BsCart3 />}
                    labelValue="Please type product quantity"
                />
                <FormInput
                    type="number"
                    inputPlaceholder="Product price"
                    value={productPrice}
                    onChange={(event) => {
                        const inputValue = +event.target.value;
                        handleNumberChange(inputValue, setProductPrice);
                    }}
                    icon={<BsCurrencyDollar />}
                    labelValue="Please type product price"
                />
                <MultiSelect
                    options={availableCategories}
                    placeholderText="Please select one or more categories"
                    value={categories}
                    onChange={handleMultiSelectChange}
                    error={categoriesError && categoriesError.errorMessage}
                />
                <Button
                    backgroundColor="bg-green-500"
                    hoverColor="hover:bg-green-600"
                    text="add product"
                    disabled={isDisabled}
                />
            </form>
        </Modal>
    );
};
