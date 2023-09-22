import { ChangeEventHandler } from "react";
import { Category } from "../../features/categorySlice/types";
import { MultiValue } from "react-select";
import { Product } from "../../features/productsSlice/types";

export interface ButtonProps {
    backgroundColor: string;
    hoverColor: string;
    text: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    disabled?: boolean;
}

export interface FormInputProps {
    type: string;
    inputPlaceholder: string;
    value: string | number;
    onChange: ChangeEventHandler<HTMLInputElement>;
    icon?: React.ReactNode;
    labelValue?: string;
    error?: string;
}
export interface ModalProps {
    text: string;
    isModalOpen: boolean;
    handleCloseModal: () => void;
    children: React.ReactNode;
}

export interface TableHeaderProps {
    inputPlaceholder: string;
    inputValue: string;
    inputOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    buttonText: string;
    buttonOnClick: () => void;
    children?: React.ReactNode;
}

export interface PaginationProps {
    onPrevButtonClick: () => void;
    currentPage: number;
    numberOfPages: number;
    onNextButtonClick: () => void;
}

export interface TableProps {
    headerItems: string[];
    items: Category[] | Product[];
    children: React.ReactNode;
}

export interface Options {
    id?: number;
    value: string;
    label: string;
}

export interface SelectProps {
    labelText?: string;
    id: string;
    options: Options[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

export interface MultiSelectProps {
    options: Options[];
    placeholderText: string;
    error?: string;
    value: Options[];
    onChange: (newValue: MultiValue<Options>) => void;
}
