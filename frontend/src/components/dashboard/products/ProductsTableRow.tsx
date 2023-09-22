import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { ProductsTableRowProps } from "./types";
import { showCategoryNames } from "./utils";

export const ProductsTableRow = ({
    index,
    id,
    name,
    quantity,
    price,
    categories,
    createdAt,
    handleDelete,
    handleEdit,
}: ProductsTableRowProps) => {
    return (
        <tr
            className={
                index % 2 === 0 ? "bg-white border-b" : "bg-gray-100 border-b"
            }
            key={id}
        >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {name}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {quantity}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {price}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {createdAt}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {showCategoryNames(categories)}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <div className="flex gap-2">
                    <span
                        className="hover:text-red-500 duration-200 cursor-pointer"
                        onClick={() => handleDelete(id)}
                    >
                        <BiTrash />
                    </span>
                    <span
                        className="hover:text-blue-500 duration-200 cursor-pointer"
                        onClick={() => handleEdit(true, id)}
                    >
                        <AiFillEdit />
                    </span>
                </div>
            </td>
        </tr>
    );
};
