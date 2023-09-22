import { BsDatabaseAdd, BsSearch } from "react-icons/bs";
import { TableHeaderProps } from "./types";
import { Button, FormInput } from ".";

export const TableHeader = ({
    inputPlaceholder,
    inputValue,
    inputOnChange,
    buttonText,
    buttonOnClick,
    children,
}: TableHeaderProps) => {
    return (
        <div className="p-2 min-w-full sm:px-6 lg:px-8 flex justify-between">
            <form
                className="flex-grow"
                onSubmit={(event) => {
                    event.preventDefault();
                }}
            >
                <FormInput
                    type="text"
                    inputPlaceholder={inputPlaceholder}
                    value={inputValue}
                    onChange={inputOnChange}
                    icon={<BsSearch />}
                />
                {children}
                <Button
                    backgroundColor={"bg-blue-500"}
                    hoverColor={"hover:bg-blue-600"}
                    text={buttonText}
                    icon={<BsDatabaseAdd />}
                    onClick={buttonOnClick}
                />
            </form>
        </div>
    );
};
