import { Outlet } from "react-router-dom";

import { commonConstants, layoutsConstants } from "@/constants";

export const AuthLayout = () => (
    <div className="flex min-h-screen">
        <div
            className="
                hidden
                w-1/2
                flex-col
                items-center
                justify-center
                gap-6
                bg-primary-dark
                p-12
                lg:flex
            "
        >
            <img
                alt={commonConstants.brandName}
                className="size-24"
                src="/apple-touch-icon.png"
            />
            <h1 className="text-3xl font-bold text-white">{commonConstants.brandName}</h1>
            <p className="text-center text-lg text-primary-light">{layoutsConstants.auth.tagline}</p>
        </div>
        <div
            className="
                flex
                w-full
                items-center
                justify-center
                p-6
                lg:w-1/2
            "
        >
            <div className="w-full max-w-md">
                <Outlet />
            </div>
        </div>
    </div>
);
