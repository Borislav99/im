import { BiUserCircle } from "react-icons/bi";
import { Button, Error, FormInput } from "../../common";
import { Modal } from "../../login";
import { AiOutlineMail } from "react-icons/ai";
import { UpdateDetailsModalProps } from "./types";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getUserDetails } from "../../../features/userSlice/selectors";
import { useEffect, useState } from "react";
import { ErrorState } from "../../login/types";
import { handleError, handleInputChange } from "../../login/helpers";
import { toggleAuthorizeError } from "../../../features/errorSlice/errorSlice";
import { errorMessages } from "../../../features/errorSlice/constants";
import { getAuthorizeError } from "../../../features/errorSlice/selectors";
import { clearError, getFromLocalStorage } from "../../../utils";
import { updateUserDetails } from "../../../features/userSlice/thunks";

export const UpdateDetailsModal = ({
    isModalOpen,
    handleCloseModal,
    text,
}: UpdateDetailsModalProps) => {
    const dispatch = useAppDispatch();
    const { name, email, isLoading } = useAppSelector(getUserDetails);
    const { isError: authorizeError, errorMessage: authorizedErrorMessage } =
        useAppSelector(getAuthorizeError);

    const accessToken = getFromLocalStorage("im_accessToken")!;

    const [userName, setUserName] = useState(name || "");
    const [userEmail, setUserEmail] = useState(email || "");

    const [userNameError, setUserNameError] = useState<ErrorState>({
        isError: false,
        errorMessage: "",
    });
    const [passwordError, setPasswordError] = useState<ErrorState>({
        isError: false,
        errorMessage: "",
    });
    const isDisabled = authorizeError || isLoading;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleError({
            value: userName,
            errorMessage: "Please enter your name",
            setError: setUserNameError,
        });
        handleError({
            value: userEmail,
            errorMessage: "Please enter your email",
            setError: setPasswordError,
        });

        if (userName.length === 0 || userEmail.length === 0) {
            return dispatch(
                toggleAuthorizeError({
                    toggle: true,
                    message: errorMessages.resolveAllErrors,
                })
            );
        }
        dispatch(
            updateUserDetails({
                name: userName,
                email: userEmail,
                accessToken,
            })
        );
    };

    useEffect(() => {
        authorizeError &&
            clearError({ dispatch, errorType: toggleAuthorizeError });
    }, [authorizeError]);

    // fill the state on initial load
    useEffect(() => {
        setUserName(name!);
        setUserEmail(email!);
    }, [name, email]);

    return (
        <Modal
            text={text}
            isModalOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
        >
            <form onSubmit={handleSubmit}>
                {authorizeError && (
                    <Error errorMessage={authorizedErrorMessage!} />
                )}
                <FormInput
                    type="text"
                    inputPlaceholder="Name"
                    value={userName}
                    onChange={(event) => {
                        const inputValue = event.target.value;
                        handleInputChange({
                            inputValue,
                            setValue: setUserName,
                        });
                    }}
                    icon={<BiUserCircle />}
                    labelValue="Please type your name"
                    error={userNameError && userNameError.errorMessage}
                />
                <FormInput
                    type="email"
                    inputPlaceholder="Email"
                    value={userEmail}
                    onChange={(event) => {
                        const inputValue = event.target.value;
                        handleInputChange({
                            inputValue,
                            setValue: setUserEmail,
                        });
                    }}
                    icon={<AiOutlineMail />}
                    labelValue="Please type your email"
                    error={passwordError && passwordError.errorMessage}
                />
                <Button
                    backgroundColor="bg-green-500"
                    hoverColor="hover:bg-green-600"
                    text={isDisabled ? "Loading" : "Update profile"}
                    disabled={isDisabled}
                />
            </form>
        </Modal>
    );
};
