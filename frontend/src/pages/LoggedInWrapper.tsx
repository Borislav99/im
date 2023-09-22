import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";
import { getIsUserAuth } from "../features/userSlice/selectors";

export const LoggedInWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const navigate = useNavigate();
    const isUserAuth = useAppSelector(getIsUserAuth);

    useEffect(() => {
        isUserAuth && navigate("/");
    }, [isUserAuth]);
    return <>{children}</>;
};
