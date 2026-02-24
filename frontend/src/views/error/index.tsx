import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import { NetworkError, StackError } from "@/components";
import { checkIsNetworkErrorHandler, getErrorMessageHandler } from "@/utils";

export const ErrorView = () => {
    const error = useRouteError();

    if (error) console.error(error);

    if (checkIsNetworkErrorHandler(error)) return <NetworkError />;

    const errorMessage = isRouteErrorResponse(error) ? error.statusText : getErrorMessageHandler(error);

    return <StackError errorMessage={errorMessage} />;
};
