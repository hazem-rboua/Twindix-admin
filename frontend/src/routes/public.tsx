import { Navigate, Outlet, useSearchParams } from "react-router-dom";

import { commonData, routesData } from "@/data";
import { useAuth } from "@/hooks";

export const PublicRoute = () => {
    const [searchParams] = useSearchParams();

    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        const returnUrl = searchParams.get(commonData.queryParams.returnUrl) || routesData.home;

        return (
            <Navigate
                to={returnUrl}
                replace
            />
        );
    }

    return <Outlet />;
};
