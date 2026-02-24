import type { ReactNode } from "react";

export interface AccordionItemInterface {
    content: ReactNode,
    title: string,
    value: string,
}

export interface AuthContextInterface {
    error: string,
    isAuthenticated: boolean,
    isLoading: boolean,
    onClearError: () => void,
    onLogin: (email: string, password: string) => Promise<void>,
    onLogout: () => void,
    user: UserInterface | null,
}

export interface DropdownMenuItemInterface {
    className?: string,
    hasSeparatorBefore?: boolean,
    icon?: ReactNode,
    label: string,
    onClick?: () => void,
}

export interface LoginResponseInterface {
    data: {
        token: string,
        user: UserInterface,
    },
    isSuccess: boolean,
    message: string,
}

export interface MeResponseInterface {
    data: UserInterface,
    isSuccess: boolean,
}

export interface NetworkErrorStoreInterface {
    hasNetworkError: boolean,
    onClearNetworkError: () => void,
    onSetNetworkError: () => void,
}

export interface SidebarStoreInterface {
    isSidebarOpen: boolean,
    onCloseSidebar: () => void,
    onToggleSidebar: () => void,
}

export interface SidebarItemInterface {
    children?: SidebarItemInterface[],
    icon: string,
    label: string,
    path: string,
}

export interface ThemeContextInterface {
    isDarkMode: boolean,
    onToggleTheme: () => void,
}

export interface CountryInterface {
    id: number,
    name: string,
}

export interface CountryListResponseInterface {
    data: CountryInterface[],
    isSuccess: boolean,
}

export interface UserInterface {
    email: string,
    id: number,
    name: string,
    permissions: string[],
    roles: string[],
    status: string,
}
