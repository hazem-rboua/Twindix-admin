import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

import { msgsConstants } from "@/constants";
import { AuthContext } from "@/contexts";
import { commonData } from "@/data";
import type { UserInterface } from "@/interfaces";
import { authService } from "@/services";
import { deleteCookieHandler, getCookieHandler, setCookieHandler } from "@/utils";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!getCookieHandler(commonData.token.tokenKey));

    const [error, setError] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState<UserInterface | null>(null);

    const fetchUserHandler = useCallback(
        async () => {
            try {
                const userData = await authService.meHandler();

                setUser(userData);
            } catch {
                setUser(null);
            }
        },
        [],
    );

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
                response.data.token,
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

        setUser(null);

        setIsAuthenticated(false);
    };

    useEffect(
        () => {
            if (isAuthenticated) fetchUserHandler();
        },
        [isAuthenticated, fetchUserHandler],
    );

    return (
        <AuthContext
            value={{
                error,
                isAuthenticated,
                isLoading,
                onClearError: () => setError(""),
                onLogin: loginHandler,
                onLogout: logoutHandler,
                user,
            }}
        >
            {children}
        </AuthContext>
    );
};
