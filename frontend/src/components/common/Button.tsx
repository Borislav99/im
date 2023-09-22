import { ButtonProps } from "./types";

export const Button = ({
    backgroundColor,
    hoverColor,
    text,
    icon,
    onClick,
    disabled,
}: ButtonProps) => {
    const colors = disabled
        ? "bg-gray-500 cursor-not-allowed"
        : `${backgroundColor} ${hoverColor}`;

    return (
        <button
            type="submit"
            className={`flex items-center justify-center focus:outline-none text-white text-sm sm:text-base ${colors} rounded py-2 w-full transition duration-150 ease-in`}
            onClick={onClick}
            disabled={disabled}
        >
            <span className="mr-2 uppercase">{text}</span>
            {icon && <span>{icon}</span>}
        </button>
    );
};
