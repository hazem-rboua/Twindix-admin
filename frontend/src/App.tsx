import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "@/providers";
import { router } from "@/routes";

export const App = () => (
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);
