import { AiOutlineClose } from "react-icons/ai";
import { ModalProps } from "./types";

export const Modal = ({
    text,
    isModalOpen,
    handleCloseModal,
    children,
}: ModalProps) => {
    if (isModalOpen) {
        return (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-50 z-50 flex items-center justify-center">
                <div className="w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 max-w-lg rounded">
                    <header className="flex items-center justify-between">
                        <h1>{text}</h1>
                        <span
                            className="cursor-pointer hover:text-red-500 duration-200"
                            onClick={handleCloseModal}
                        >
                            <AiOutlineClose />
                        </span>
                    </header>
                    <div className="mt-2">{children}</div>
                </div>
            </div>
        );
    } else {
        return null;
    }
};
