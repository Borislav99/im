import { AuthorizeUser, Login } from "../components/login";
import { LoggedInWrapper } from "./LoggedInWrapper";

export const LoginPage = () => {
    return (
        <LoggedInWrapper>
            <AuthorizeUser text="Login">
                <Login />
            </AuthorizeUser>
        </LoggedInWrapper>
    );
};
