import { useEffect, useState } from "react";
import { Button, FormInput, Error } from "../../common";
import { Modal } from "../../login";
import { UpdateDetailsModalProps } from "./types";
import { AiFillLock } from "react-icons/ai";
import { handleError } from "../../login/helpers";
import { ErrorState } from "../../login/types";
import { useAppDispatch, useAppSelector } from "../../../store";
import { toggleAuthorizeError } from "../../../features/errorSlice/errorSlice";
import { errorMessages } from "../../../features/errorSlice/constants";
import { getAuthorizeError } from "../../../features/errorSlice/selectors";
import { toggleFetchingError } from "../../../features/userSlice/userSlice";
import { clearError, getFromLocalStorage } from "../../../utils";
import {
    getUserDetails,
    getUserFetchingStatus,
} from "../../../features/userSlice/selectors";
import { updateUserPassword } from "../../../features/userSlice/thunks";

export const UpdatePasswordModal = ({
    isModalOpen,
    handleCloseModal,
    text,
}: UpdateDetailsModalProps) => {
    const dispatch = useAppDispatch();
    const { isError: authorizeError, errorMessage: authorizedErrorMessage } =
        useAppSelector(getAuthorizeError);
    const { isError: fetchingError, errorMessage: fetchingErrorMessage } =
        useAppSelector(getUserFetchingStatus);

    const { isLoading } = useAppSelector(getUserDetails);

    const errorMessage = authorizeError
        ? authorizedErrorMessage
        : fetchingErrorMessage;

    const accessToken = getFromLocalStorage("im_accessToken")!;

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPasswordError, setCurrentPasswordError] =
        useState<ErrorState>({
            isError: false,
            errorMessage: "",
        });
    const [newPasswordError, setNewPasswordError] = useState<ErrorState>({
        isError: false,
        errorMessage: "",
    });
    const [confirmPasswordError, setConfirmPasswordError] =
        useState<ErrorState>({
            isError: false,
            errorMessage: "",
        });

    const isError = authorizeError || fetchingError;

    const isDisabled = authorizeError || fetchingError || isLoading;
    const passwordsDontMatch = newPassword !== confirmPassword;
    const fieldsAreEmpty =
        currentPassword.length === 0 ||
        newPassword.length === 0 ||
        confirmPassword.length === 0;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleError({
            value: currentPassword,
            errorMessage: "Please enter your current password",
            setError: setCurrentPasswordError,
        });
        handleError({
            value: newPassword,
            errorMessage: "Passwords don't match",
            setError: setNewPasswordError,
            errorCondition: passwordsDontMatch,
        });
        handleError({
            value: confirmPassword,
            errorMessage: "Please confirm your new password",
            setError: setConfirmPasswordError,
        });

        if (fieldsAreEmpty) {
            return dispatch(
                toggleAuthorizeError({
                    toggle: true,
                    message: errorMessages.resolveAllErrors,
                })
            );
        }
        if (passwordsDontMatch) {
            return dispatch(
                toggleAuthorizeError({
                    toggle: true,
                    message: errorMessages.passwordsDontMatch,
                })
            );
        }
        dispatch(
            updateUserPassword({
                newPassword,
                currentPassword,
                confirmPassword,
                accessToken,
            })
        );
    };

    const handlePasswordChange = (
        inputValue: string,
        setPassword: React.Dispatch<React.SetStateAction<string>>
    ) => {
        setPassword(inputValue);
    };

    useEffect(() => {
        authorizeError &&
            clearError({ dispatch, errorType: toggleAuthorizeError });
        fetchingError &&
            clearError({ dispatch, errorType: toggleFetchingError });
    }, [authorizeError, fetchingError]);

    return (
        <Modal
            text={text}
            isModalOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
        >
            <form onSubmit={handleSubmit}>
                {isError && <Error errorMessage={errorMessage!} />}
                <FormInput
                    type="password"
                    inputPlaceholder="Password"
                    value={currentPassword}
                    onChange={(event) => {
                        const inputValue = event.target.value;
                        handlePasswordChange(inputValue, setCurrentPassword);
                    }}
                    icon={<AiFillLock />}
                    labelValue="Please type your current password"
                    error={
                        currentPasswordError &&
                        currentPasswordError.errorMessage
                    }
                />
                <FormInput
                    type="password"
                    inputPlaceholder="Password"
                    value={newPassword}
                    onChange={(event) => {
                        const inputValue = event.target.value;
                        handlePasswordChange(inputValue, setNewPassword);
                    }}
                    icon={<AiFillLock />}
                    labelValue="Please type your new password"
                    error={newPasswordError && newPasswordError.errorMessage}
                />
                <FormInput
                    type="password"
                    inputPlaceholder="Password"
                    value={confirmPassword}
                    onChange={(event) => {
                        const inputValue = event.target.value;
                        handlePasswordChange(inputValue, setConfirmPassword);
                    }}
                    icon={<AiFillLock />}
                    labelValue="Please confirm your new password"
                    error={
                        confirmPasswordError &&
                        confirmPasswordError.errorMessage
                    }
                />
                <Button
                    backgroundColor="bg-green-500"
                    hoverColor="hover:bg-green-600"
                    text={isDisabled ? "Loading" : "Update password"}
                    disabled={isDisabled}
                />
            </form>
        </Modal>
    );
};
