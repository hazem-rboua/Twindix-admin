import { create } from "zustand";

import type { SidebarStoreInterface } from "@/interfaces";

export const useSidebarStore = create<SidebarStoreInterface>((set) => ({
    isSidebarOpen: false,
    onCloseSidebar: () => set({ isSidebarOpen: false }),
    onToggleSidebar: () => set(({ isSidebarOpen }) => ({ isSidebarOpen: !isSidebarOpen })),
}));
