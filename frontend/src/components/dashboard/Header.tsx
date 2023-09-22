import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { navLinks } from "./constants";
import "../../css/utils.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { getFromLocalStorage, removeFromLocalStorage } from "../../utils";
import { getHeader } from "../../features/dashboardSlice/selectors";
import {
    changeActiveLink,
    toggleDropdown,
} from "../../features/dashboardSlice/dashboardSlice";
import { logoutUser } from "../../features/userSlice/thunks";

export const Header = () => {
    const { isDropdownVisible, activeLink } = useAppSelector(getHeader);
    const dispatch = useAppDispatch();
    const accessToken = getFromLocalStorage("im_accessToken")!;

    const handleLogout = () => {
        dispatch(logoutUser(accessToken));
        removeFromLocalStorage("im_accessToken");
    };

    const handleDropdown = () => {
        dispatch(toggleDropdown());
    };

    const handleChangeActiveLink = (link: string) => {
        dispatch(changeActiveLink(link));
    };

    return (
        <header className="shadow sticky top-0 z-50">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link
                        to="/"
                        className="flex items-center hover:text-blue-500 duration-200"
                    >
                        <span className="self-center text-s md:text-xl font-semibold whitespace-nowrap dark:text-white">
                            Invertory Management
                        </span>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <button
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-expanded="false"
                            onClick={handleDropdown}
                        >
                            <GiHamburgerMenu />
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            onClick={handleLogout}
                        >
                            <FiLogOut />
                        </button>
                    </div>
                    <div
                        className={`
                        ${isDropdownVisible ? "show-dropdown" : "hide-dropdown"}
                        justify-between items-center w-full lg:flex lg:w-auto lg:h-0 lg:order-1 duration-200`}
                    >
                        <ul
                            className={`                            
                            flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 duration-200`}
                        >
                            {navLinks.map(({ path, text }, index) => {
                                return (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            handleDropdown();
                                            handleChangeActiveLink(text);
                                        }}
                                    >
                                        <Link
                                            className={`block capitalize py-2 pr-4 pl-3 text-black rounded hover:text-blue-500 duration-200 lg:p-0 dark:text-white ${
                                                activeLink === text &&
                                                "text-blue-500"
                                            }`}
                                            to={path}
                                        >
                                            {text}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};
