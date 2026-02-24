import { useContext } from "react";

import { msgsConstants } from "@/constants";
import { ThemeContext } from "@/contexts";

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) throw new Error(msgsConstants.themeProviderRequired);

    return context;
};
