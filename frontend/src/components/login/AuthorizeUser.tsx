import { Card, Error } from "../common";

import { BiUserCheck } from "react-icons/bi";

import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AuthorizeUserProps } from "./types";
import { REGISTER } from "./constants";
import { useAppDispatch, useAppSelector } from "../../store";
import { getAuthorizeError } from "../../features/errorSlice/selectors";
import { useEffect } from "react";
import { toggleAuthorizeError } from "../../features/errorSlice/errorSlice";
import { getUserFetchingStatus } from "../../features/userSlice/selectors";
import { toggleFetchingError } from "../../features/userSlice/userSlice";
import { clearError } from "../../utils";

export const AuthorizeUser = ({ text, children }: AuthorizeUserProps) => {
    const dispatch = useAppDispatch();
    const { isError: authorizeError, errorMessage: authorizedErrorMessage } =
        useAppSelector(getAuthorizeError);

    const { isError: fetchingError, errorMessage: fetchingErrorMessage } =
        useAppSelector(getUserFetchingStatus);

    const isError = authorizeError || fetchingError;

    const errorMessage = authorizeError
        ? authorizedErrorMessage
        : fetchingErrorMessage;

    const location = useLocation();
    const currentUrl = location.pathname.substring(1);

    useEffect(() => {
        authorizeError &&
            clearError({ dispatch, errorType: toggleAuthorizeError });
        fetchingError &&
            clearError({ dispatch, errorType: toggleFetchingError });
    }, [authorizeError, fetchingError]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            <Card>
                <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
                    {text}
                </div>
                <div className="mt-10">
                    {isError && <Error errorMessage={errorMessage!} />}
                    {children}
                </div>
                <div className="flex justify-center items-center mt-6">
                    <NavLink
                        to={currentUrl === REGISTER ? "/login" : "/register"}
                        className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
                    >
                        {currentUrl === REGISTER ? (
                            <BiUserCheck />
                        ) : (
                            <AiOutlineUserAdd />
                        )}
                        <span className="ml-2">
                            {currentUrl === REGISTER
                                ? "Already have an account?"
                                : "You don't have an account?"}
                        </span>
                    </NavLink>
                </div>
            </Card>
        </div>
    );
};
