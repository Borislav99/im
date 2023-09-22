import { createSelector } from "reselect";
import { RootState } from "../../store";

export const getIsUserAuth = createSelector(
    (state: RootState) => state.user.isAuth,
    (isAuth) => isAuth
);

export const getUserFetchingStatus = createSelector(
    (state: RootState) => state.user,
    (user) => user
);

export const getUserDetails = createSelector(
    (state: RootState) => state.user.userDetails,
    (userDetails) => userDetails
);
