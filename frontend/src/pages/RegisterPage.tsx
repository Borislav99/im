import { AuthorizeUser, Register } from "../components/login";
import { LoggedInWrapper } from "./LoggedInWrapper";

export const RegisterPage = () => {
    return (
        <LoggedInWrapper>
            <AuthorizeUser text="Create an account">
                <Register />
            </AuthorizeUser>
        </LoggedInWrapper>
    );
};
