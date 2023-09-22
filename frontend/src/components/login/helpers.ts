import { HandleErrorArgs, HandleInputChangeArgs } from "./types";

export const handleError = ({
    value,
    errorMessage,
    setError,
    errorCondition,
}: HandleErrorArgs) => {
    const isValueEmpty = value.length === 0;
    const isError = errorCondition ? errorCondition : isValueEmpty;

    isError
        ? setError({
              isError: true,
              errorMessage,
          })
        : setError({
              isError: false,
              errorMessage: "",
          });
};

export const handleInputChange = ({
    inputValue,
    setValue,
}: HandleInputChangeArgs) => {
    setValue(inputValue);
};
