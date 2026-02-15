import { RouterProvider } from "react-router-dom";

import { AuthProvider, ThemeProvider } from "@/providers";
import { router } from "@/routes";

export const App = () => (
    <ThemeProvider>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </ThemeProvider>
);
