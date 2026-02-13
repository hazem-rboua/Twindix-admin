import type { ReactNode } from "react";
import { useState } from "react";

import { msgsConstants } from "@/constants";
import { AuthContext } from "@/contexts";
import { commonData } from "@/data";
import { authService } from "@/services";
import { deleteCookieHandler, getCookieHandler, setCookieHandler } from "@/utils";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => !!getCookieHandler(commonData.token.tokenKey),
    );

    const [error, setError] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const clearErrorHandler = () => setError("");

    const loginHandler = async (email: string, password: string) => {
        setIsLoading(true);

        setError("");

        try {
            const response = await authService.loginHandler(
                email,
                password,
            );

            setCookieHandler(
                commonData.token.tokenKey,
                response.token,
            );

            setIsAuthenticated(true);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : msgsConstants.genericError;

            setError(errorMessage);

            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logoutHandler = () => {
        deleteCookieHandler(commonData.token.tokenKey);

        setIsAuthenticated(false);
    };

    return (
        <AuthContext
            value={{
                error,
                isAuthenticated,
                isLoading,
                onClearError: clearErrorHandler,
                onLogin: loginHandler,
                onLogout: logoutHandler,
            }}
        >
            {children}
        </AuthContext>
    );
};
