import { Button } from "../components/common";
import { BiUserCircle } from "react-icons/bi";
import { AiFillLock } from "react-icons/ai";
import {
    UpdateDetailsModal,
    UpdatePasswordModal,
} from "../components/dashboard/profile";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store";
import {
    getUserDetails,
    getUserFetchingStatus,
} from "../features/userSlice/selectors";

export const ProfilePage = () => {
    const { name, email, isLoading } = useAppSelector(getUserDetails);
    const { isError: fetchingError } = useAppSelector(getUserFetchingStatus);

    const [isUpdateDetailsModalOpen, setIsUpdateDetailsModalOpen] =
        useState(false);
    const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] =
        useState(false);

    const handleModalToggle = (
        toggle: boolean,
        setModal: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setModal(toggle);
    };

    useEffect(() => {
        if (!isLoading) {
            handleModalToggle(false, setIsUpdateDetailsModalOpen);
        }
    }, [name, email]);

    useEffect(() => {
        if (!isLoading && !fetchingError) {
            handleModalToggle(false, setIsUpdatePasswordModalOpen);
        }
    }, [isLoading]);

    return (
        <main className="mt-2">
            <h1 className="text-center mb-2">Profile page for {name}</h1>
            <UpdateDetailsModal
                isModalOpen={isUpdateDetailsModalOpen}
                handleCloseModal={() =>
                    handleModalToggle(false, setIsUpdateDetailsModalOpen)
                }
                text="Update details"
            />
            <UpdatePasswordModal
                isModalOpen={isUpdatePasswordModalOpen}
                handleCloseModal={() =>
                    handleModalToggle(false, setIsUpdatePasswordModalOpen)
                }
                text="Update password"
            />
            <div className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button
                    backgroundColor="bg-blue-500"
                    hoverColor="hover:bg-blue-600"
                    text="Update details"
                    onClick={() =>
                        handleModalToggle(true, setIsUpdateDetailsModalOpen)
                    }
                    icon={<BiUserCircle />}
                />
                <Button
                    backgroundColor="bg-blue-500"
                    hoverColor="hover:bg-blue-600"
                    text="Update password"
                    onClick={() =>
                        handleModalToggle(true, setIsUpdatePasswordModalOpen)
                    }
                    icon={<AiFillLock />}
                />
            </div>
        </main>
    );
};
