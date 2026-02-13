import { Outlet, useLocation } from "react-router-dom";

import { Logo } from "@/atoms";
import { layoutAuthData, routesData } from "@/data";
import { LogoSizeEnum } from "@/enums";

export const AuthLayout = () => {
    const { pathname } = useLocation();

    const pageConfig = layoutAuthData[pathname] ?? layoutAuthData[routesData.login];

    const {
        description,
        sidebarDescription,
        sidebarTitle,
        title,
    } = pageConfig;

    return (
        <div
            className="
                flex
                min-h-screen
                flex-col
                bg-surface
            "
        >
            <header className="p-6">
                <Logo size={LogoSizeEnum.MD} />
            </header>
            <main className="flex flex-1">
                <div
                    className="
                        relative
                        hidden
                        overflow-hidden
                        lg:flex
                        lg:w-1/2
                    "
                >
                    <div
                        className="
                            bg-gradient-auth
                            absolute
                            inset-0
                            rounded-tr-3xl
                        "
                    />
                    <div
                        className="
                            absolute
                            right-0
                            bottom-0
                            left-0
                            p-8
                            text-white
                        "
                    >
                        <h1 className="mb-3 text-3xl font-bold">{sidebarTitle}</h1>
                        <p className="text-sm leading-relaxed text-white/90">{sidebarDescription}</p>
                    </div>
                </div>
                <div
                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        p-8
                        lg:w-1/2
                    "
                >
                    <div className="w-full max-w-md">
                        <h1
                            className="
                                text-gradient
                                mb-2
                                text-3xl
                                font-bold
                            "
                        >
                            {title}
                        </h1>
                        <p className="mb-8 text-text-secondary">{description}</p>
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};
