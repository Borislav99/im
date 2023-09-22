import { createSelector } from "reselect";
import { RootState } from "../../store";

export const getAuthorizeError = createSelector(
    (state: RootState) => state.error.authorizeError,
    (authorizeError) => authorizeError
);
