import { createContext } from "react";

import type { SidebarContextInterface } from "@/interfaces";

export const SidebarContext = createContext<SidebarContextInterface | null>(null);
