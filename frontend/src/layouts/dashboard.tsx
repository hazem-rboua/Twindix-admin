import { Outlet } from "react-router-dom";

import { Button } from "@/atoms";
import { Sidebar } from "@/components";
import { labelsConstants } from "@/constants";
import { ButtonVariantEnum } from "@/enums";
import { useSidebarStore } from "@/store";

export const DashboardLayout = () => {
    const {
        isSidebarOpen,
        onCloseSidebar,
    } = useSidebarStore();

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            {isSidebarOpen && (
                <Button
                    ariaLabel={labelsConstants.closeSidebar}
                    variant={ButtonVariantEnum.ICON}
                    className="
                        fixed
                        inset-0
                        z-40
                        size-full
                        rounded-none
                        bg-black/50
                        md:hidden
                    "
                    onClick={onCloseSidebar}
                />
            )}
            <main
                className="
                    ml-0
                    flex-1
                    overflow-y-auto
                    p-3
                    md:ml-sidebar
                    md:p-6
                "
            >
                <Outlet />
            </main>
        </div>
    );
};
