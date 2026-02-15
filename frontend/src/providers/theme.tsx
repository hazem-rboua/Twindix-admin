import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

import { ThemeContext } from "@/contexts";
import { commonData } from "@/data";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const stored = localStorage.getItem(commonData.theme.storageKey);

        if (stored !== null) return stored === commonData.theme.darkValue;

        return window.matchMedia(commonData.theme.mediaQuery).matches;
    });

    const toggleThemeHandler = useCallback(
        () => setIsDarkMode((prev) => !prev),
        [],
    );

    useEffect(
        () => void document.documentElement.classList.toggle(
            commonData.theme.darkClass,
            isDarkMode,
        ),
        [isDarkMode],
    );

    useEffect(
        () => localStorage.setItem(
            commonData.theme.storageKey,
            isDarkMode ? commonData.theme.darkValue : commonData.theme.lightValue,
        ),
        [isDarkMode],
    );

    return (
        <ThemeContext
            value={{
                isDarkMode,
                onToggleTheme: toggleThemeHandler,
            }}
        >
            {children}
        </ThemeContext>
    );
};
