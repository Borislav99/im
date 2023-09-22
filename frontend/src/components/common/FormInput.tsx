import { FormInputProps } from "./types";

export const FormInput = ({
    type,
    inputPlaceholder,
    value,
    onChange,
    icon,
    labelValue,
    error,
}: FormInputProps) => {
    const inputStBorderStyles = error
        ? "border-red-500 focus:outline-none focus:border-red-500"
        : "border-gray-400 focus:outline-none focus:border-blue-400";

    return (
        <div className="flex flex-col mb-6">
            {labelValue && (
                <label
                    htmlFor={type}
                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                    {labelValue}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    id={type}
                    type={type}
                    name={type}
                    className={`text-sm sm:text-base placeholder-gray-500 rounded-lg border w-full py-2 ${
                        icon ? "pl-10" : "pl-3"
                    } ${inputStBorderStyles}`}
                    placeholder={inputPlaceholder}
                    onChange={onChange}
                    value={value}
                />
            </div>
            {error && <span className="text-red-500">{error}</span>}
        </div>
    );
};
