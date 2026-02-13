import { Outlet } from "react-router-dom";

import { Sidebar } from "@/components";

export const DashboardLayout = () => (
    <div className="flex min-h-screen bg-background">
        <Sidebar />
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
