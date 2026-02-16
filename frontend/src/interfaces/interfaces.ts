import type { ReactNode } from "react";

export interface AdminCreateInterface {
    email: string,
    name: string,
    superAdminId: number,
}

export interface AdminInterface {
    email: string,
    id: number,
    name: string,
}

export interface AccordionItemInterface {
    content: ReactNode,
    title: string,
    value: string,
}

export interface CountryInterface {
    id: number,
    name: string,
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

export interface CountryListResponseInterface {
    data: CountryInterface[],
    isSuccess: boolean,
}

export interface MeResponseInterface {
    data: UserInterface,
    isSuccess: boolean,
}

export interface RegionInterface {
    countries: CountryInterface[],
    id: number,
    name: string,
    superAdmins: SuperAdminInterface[],
}

export interface RegionListResponseInterface {
    data: RegionInterface[],
    isSuccess: boolean,
}

export interface SidebarContextInterface {
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

export interface SuperAdminCreateInterface {
    email: string,
    name: string,
    regionId: number,
    type: string,
}

export interface SuperAdminInterface {
    admins: AdminInterface[],
    email: string,
    id: number,
    name: string,
    region: string,
    type: string,
}

export interface SuperAdminListResponseInterface {
    data: SuperAdminInterface[],
    isSuccess: boolean,
}

export interface ThemeContextInterface {
    isDarkMode: boolean,
    onToggleTheme: () => void,
}

export interface UserInterface {
    email: string,
    id: number,
    name: string,
    permissions: string[],
    roles: string[],
    status: string,
}
