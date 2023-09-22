import { Options } from "../common/types";

export interface AuthorizeUserProps {
    text: string;
    children: React.ReactNode;
}

export interface ErrorState {
    isError: boolean;
    errorMessage: string;
}

export interface HandleErrorArgs {
    value: string | Options[];
    errorMessage: string;
    setError: React.Dispatch<React.SetStateAction<ErrorState>>;
    errorCondition?: boolean;
}

type SetStringValue = React.Dispatch<React.SetStateAction<string>>;
export type SetNumberValue = React.Dispatch<React.SetStateAction<number>>;

export interface HandleInputChangeArgs {
    inputValue: string;
    setValue: SetStringValue;
}
