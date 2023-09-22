export interface LoginUserArgs {
    email: string;
    password: string;
}

export interface RegisterUserArgs extends LoginUserArgs {
    name: string;
    password_confirmation: string;
}

export interface UpdateUserDetailsArgs {
    name: string;
    email: string;
    accessToken: string;
}

export interface UpdateUserPasswordArgs {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    accessToken: string;
}

export interface LoginPayload {
    payload: {
        access_token: string;
    };
}

export interface UserDetails {
    name?: string;
    email?: string;
    isLoading?: boolean;
}

export interface InitialState {
    isAuth: boolean;
    isLoading?: boolean;
    errorMessage?: string;
    isError?: boolean;
    userDetails: UserDetails;
}

export interface GetUserDataPayload {
    payload: {
        name: string;
        email: string;
    };
}

export interface UpdateUserPasswordErrorPayload {
    error: {
        message: string;
        name: string;
    };
}
