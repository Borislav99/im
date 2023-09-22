import { useNavigate } from "react-router-dom";
import { Button, Card } from "../components/common";
import { useAppSelector } from "../store";
import { getIsUserAuth } from "../features/userSlice/selectors";

export const ErrorPage = () => {
    const navigate = useNavigate();

    const isAuth = useAppSelector(getIsUserAuth);

    const handleBackToLogin = () => {
        navigate("/login");
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            <Card>
                <p className="text-center text-6xl md:text-7x mb-2">404</p>
                <p className="text-center text-2xl md:text-3xl mb-5">
                    Page not found
                </p>
                <Button
                    backgroundColor="bg-blue-600"
                    hoverColor="hover:bg-blue-700"
                    text={isAuth ? "Back to Home" : "Login"}
                    onClick={handleBackToLogin}
                />
            </Card>
        </div>
    );
};
