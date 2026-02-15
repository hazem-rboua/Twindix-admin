import { useContext } from "react";

import { msgsConstants } from "@/constants";
import { SidebarContext } from "@/contexts";

export const useSidebar = () => {
    const context = useContext(SidebarContext);

    if (!context) throw new Error(msgsConstants.sidebarProviderRequired);

    return context;
};
