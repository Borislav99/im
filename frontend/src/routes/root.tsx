import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { getIsUserAuth } from "../features/userSlice/selectors";
import { Header } from "../components/dashboard";
import { getFromLocalStorage } from "../utils";
import { getUserData } from "../features/userSlice/thunks";
import { getCategoriesData } from "../features/categorySlice/thunks";
import { getProductsData } from "../features/productsSlice/thunks";
import { getDashboardData } from "../features/statsSlice/thunks";

export const Root = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isUserAuth = useAppSelector(getIsUserAuth);
    const accessToken = getFromLocalStorage("im_accessToken");
    const handleGetUserData = () => {
        dispatch(getUserData(accessToken!));
        dispatch(getCategoriesData(accessToken!));
        dispatch(getProductsData(accessToken!));
        dispatch(getDashboardData(accessToken!));
    };

    useEffect(() => {
        accessToken && handleGetUserData();
        if (!isUserAuth) {
            navigate("/login");
        }
    }, [isUserAuth]);

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};
