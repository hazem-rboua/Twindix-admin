import type { VariantProps } from "class-variance-authority";
import type * as LucideIcons from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import type { buttonVariants } from "@/ui";

export type AccordionItemType = {
    content: ReactNode,
    title: string,
    value: string,
};

export type AuthContextType = {
    error: string,
    isAuthenticated: boolean,
    isLoading: boolean,
    onClearError: () => void,
    onLogin: (email: string, password: string) => Promise<void>,
    onLogout: () => void,
};

export type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { isAsChild?: boolean };

export type LoginResponseType = { token: string };

export type LucideIconNameType = keyof typeof LucideIcons;

export type NullableErrorType = Error | null;

export type SidebarItemType = {
    children?: SidebarItemType[],
    icon: string,
    label: string,
    path: string,
};
