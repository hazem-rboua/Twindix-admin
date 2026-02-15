import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";

import { Sidebar } from "@/components";
import { SidebarContext } from "@/contexts";

export const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const closeSidebarHandler = useCallback(
        () => setIsSidebarOpen(false),
        [],
    );

    const toggleSidebarHandler = useCallback(
        () => setIsSidebarOpen((prev) => !prev),
        [],
    );

    return (
        <SidebarContext
            value={{
                isSidebarOpen,
                onCloseSidebar: closeSidebarHandler,
                onToggleSidebar: toggleSidebarHandler,
            }}
        >
            <div className="flex min-h-screen bg-background">
                <Sidebar />
                {isSidebarOpen && (
                    <div
                        className="
                            fixed
                            inset-0
                            z-40
                            bg-black/50
                            md:hidden
                        "
                        onClick={closeSidebarHandler}
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
        </SidebarContext>
    );
};
