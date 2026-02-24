import { Toaster as Sonner } from "sonner";

import { ThemeModeEnum } from "@/enums";
import { useTheme } from "@/hooks";

export const Toaster = () => {
    const { isDarkMode } = useTheme();

    return (
        <Sonner theme={isDarkMode ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT} />
    );
};
