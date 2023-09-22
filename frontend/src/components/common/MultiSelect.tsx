import Select from "react-select";
import "../../css/react-select.css";
import { MultiSelectProps } from "./types";

export const MultiSelect = ({
    options,
    placeholderText,
    error,
    value,
    onChange,
}: MultiSelectProps) => {
    return (
        <div className="mb-5 multi-select__container">
            <Select
                options={options}
                isMulti
                isSearchable
                placeholder={placeholderText}
                value={value}
                onChange={onChange}
            />
            {error && <span className="text-red-500">{error}</span>}
        </div>
    );
};
