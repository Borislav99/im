import { Button, FormInput } from "../common";

import { AiOutlineUser } from "react-icons/ai";
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
import { registerUser } from "../../features/userSlice/thunks";

export const Register = () => {
    const dispatch = useAppDispatch();
    const { isError: authorizeError } = useAppSelector(getAuthorizeError);
    const { isLoading, isError: fetchingError } = useAppSelector(
        getUserFetchingStatus
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameError, setNameError] = useState<ErrorState>({
        isError: false,
        errorMessage: "",
    });
    const [emailError, setEmailError] = useState<ErrorState>({
        isError: false,
        errorMessage: "",
    });
    const [passwordError, setPasswordError] = useState<ErrorState>({
        isError: false,
        errorMessage: "",
    });
    const passwordsDontMatch = password !== confirmPassword;
    const isDisabled = isLoading || fetchingError || authorizeError;

    const handleSubmit = () => {
        const passwordIsEmpty =
            password.length === 0 || confirmPassword.length === 0;

        handleError({
            value: name,
            errorMessage: "Please enter your name",
            setError: setNameError,
        });
        handleError({
            value: email,
            errorMessage: "Please enter your email",
            setError: setEmailError,
        });
        handleError({
            value: password,
            errorMessage: passwordIsEmpty
                ? "Please enter your password"
                : "Passwords must match",
            setError: setPasswordError,
            errorCondition: passwordsDontMatch,
        });

        (name.length === 0 || email.length === 0 || password.length === 0) &&
            dispatch(
                toggleAuthorizeError({
                    toggle: true,
                    message: errorMessages.resolveAllErrors,
                })
            );

        name.length > 0 &&
            email.length > 0 &&
            password.length > 0 &&
            !passwordsDontMatch &&
            dispatch(
                registerUser({
                    name,
                    email,
                    password,
                    password_confirmation: confirmPassword,
                })
            );
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <FormInput
                type="text"
                inputPlaceholder="Name"
                icon={<AiOutlineUser />}
                labelValue="Type your name here"
                value={name}
                onChange={(event) => {
                    const inputValue = event.target.value;
                    handleInputChange({
                        inputValue,
                        setValue: setName,
                    });
                }}
                error={nameError && nameError.errorMessage}
            />
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
            <FormInput
                type="password"
                inputPlaceholder="Password"
                icon={<AiOutlineLock />}
                labelValue="Confirm your password"
                value={confirmPassword}
                onChange={(event) => {
                    const inputValue = event.target.value;
                    handleInputChange({
                        inputValue,
                        setValue: setConfirmPassword,
                    });
                }}
            />
            <div className="flex w-full">
                <Button
                    backgroundColor="bg-blue-600"
                    hoverColor="hover:bg-blue-700"
                    text="Register"
                    onClick={handleSubmit}
                    disabled={isDisabled}
                />
            </div>
        </form>
    );
};
