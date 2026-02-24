import { RouterProvider } from "react-router-dom";

import { BoundaryErrorClass, IndicatorNetworkError, NetworkError } from "@/components";
import { AuthProvider, ThemeProvider } from "@/providers";
import { router } from "@/routes";
import { useNetworkErrorStore } from "@/store";
import { Toaster } from "@/ui";

export const App = () => {
    const hasNetworkError = useNetworkErrorStore(({ hasNetworkError }) => hasNetworkError);

    if (hasNetworkError) return <NetworkError />;

    return (
        <BoundaryErrorClass>
            <ThemeProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                    <Toaster />
                    <IndicatorNetworkError />
                </AuthProvider>
            </ThemeProvider>
        </BoundaryErrorClass>
    );
};
