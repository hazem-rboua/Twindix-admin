import { msgsConstants } from "@/constants";

export const checkIsNetworkErrorHandler = (error: unknown): boolean => {
    if (!navigator.onLine) return true;

    if (error instanceof Error) {
        const { message } = error;

        return message.includes(msgsConstants.networkError);
    }

    return false;
};

export const getErrorMessageHandler = (error: unknown): string => {
    if (error instanceof Error) {
        const { message } = error;

        return message;
    }

    return msgsConstants.genericError;
};
