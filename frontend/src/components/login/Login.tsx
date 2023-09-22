import { Button, FormInput } from "../common";

import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineLock } from "react-icons/ai";
import { useState } from "react";
import { ErrorState } from "./types";
import { handleError, handleInputChange } from "./helpers";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleAuthorizeError } from "../../features/errorSlice/errorSlice";
import { errorMessages } from "../../features/errorSlice/constants";
import { getAuthorizeError } from "../../features/errorSlice/selectors";
import { getUserFetchingStatus } from "../../features/userSlice/selectors";
import { loginUser } from "../../features/userSlice/thunks";

export const Login = () => {
    const dispatch = useAppDispatch();
    const { isError: authorizeError } = useAppSelector(getAuthorizeError);
    const { isLoading, isError: fetchingError } = useAppSelector(
        getUserFetchingStatus
    );

    const isDisabled = isLoading || fetchingError || authorizeError;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState<ErrorState>({
        isError: false,
        errorMessage: "",
    });
    const [passwordError, setPasswordError] = useState<ErrorState>({
        isError: false,
        errorMessage: "",
    });

    const handleSubmit = () => {
        handleError({
            value: email,
            errorMessage: "Please enter your email",
            setError: setEmailError,
        });
        handleError({
            value: password,
            errorMessage: "Please enter your password",
            setError: setPasswordError,
        });
        (email.length === 0 || password.length === 0) &&
            dispatch(
                toggleAuthorizeError({
                    toggle: true,
                    message: errorMessages.resolveAllErrors,
                })
            );

        email.length > 0 &&
            password.length > 0 &&
            dispatch(loginUser({ email, password }));
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
            }}
        >
            <FormInput
                type="email"
                inputPlaceholder="Email"
                icon={<HiOutlineMail />}
                labelValue="Type your email here"
                value={email}
                onChange={(event) => {
                    const inputValue = event.target.value;
                    handleInputChange({
                        inputValue,
                        setValue: setEmail,
                    });
                }}
                error={emailError && emailError.errorMessage}
            />
            <FormInput
                type="password"
                inputPlaceholder="Password"
                icon={<AiOutlineLock />}
                labelValue="Type your password here"
                value={password}
                onChange={(event) => {
                    const inputValue = event.target.value;
                    handleInputChange({
                        inputValue,
                        setValue: setPassword,
                    });
                }}
                error={passwordError && passwordError.errorMessage}
            />

            <div className="flex w-full">
                <Button
                    backgroundColor="bg-blue-600"
                    hoverColor="hover:bg-blue-700"
                    text={isLoading ? "Loading..." : "Login"}
                    onClick={handleSubmit}
                    disabled={isDisabled}
                />
            </div>
        </form>
    );
};
