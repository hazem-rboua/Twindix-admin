import { Navigate, Outlet, useLocation } from "react-router-dom";

import { routesData } from "@/data";
import { useAuth } from "@/hooks";

export const ProtectedRoute = () => {
    const location = useLocation();

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        const returnUrl = location.pathname !== routesData.home ? `?returnUrl=${encodeURIComponent(location.pathname + location.search)}` : "";

        return (
            <Navigate
                to={`${routesData.login}${returnUrl}`}
                replace
            />
        );
    }

    return <Outlet />;
};
