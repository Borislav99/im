import { PaginationProps } from "./types";

export const Pagination = ({
    onPrevButtonClick,
    currentPage,
    numberOfPages,
    onNextButtonClick,
}: PaginationProps) => {
    const handlePrevClick = () => {
        if (currentPage === 1) return;
        onPrevButtonClick();
    };

    const handleNextClick = () => {
        if (currentPage === numberOfPages) return;
        onNextButtonClick();
    };

    return (
        <div className="flex items-center justify-center mt-5">
            <div className="flex justify-center items-center space-x-4">
                <div
                    className="border rounded-md bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm"
                    onClick={handlePrevClick}
                >
                    {"<"}
                </div>
                <div className="text-slate-500">
                    {currentPage} / {numberOfPages}
                </div>
                <div
                    className="border rounded-md bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm"
                    onClick={handleNextClick}
                >
                    {">"}
                </div>
            </div>
        </div>
    );
};
