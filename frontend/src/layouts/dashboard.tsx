import { Outlet } from "react-router-dom";

import { SidebarShared } from "@/components";

export const DashboardLayout = () => (
    <div className="flex min-h-screen bg-background">
        <SidebarShared />
        <main
            className="
                ml-sidebar
                flex-1
                overflow-y-auto
                p-6
            "
        >
            <Outlet />
        </main>
    </div>
);
