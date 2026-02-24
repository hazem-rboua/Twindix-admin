import * as LucideIcons from "lucide-react";
import type { ComponentType } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button, Separator } from "@/atoms";
import { buttonsConstants } from "@/constants";
import { commonData, sidebarData } from "@/data";
import { ButtonSizeEnum, ButtonVariantEnum } from "@/enums";
import { useAuth } from "@/hooks";
import { useSidebarStore } from "@/store";
import type { LucideIconNameType } from "@/types";
import { generateClassNameHandler } from "@/utils";

const renderIconHandler = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as LucideIconNameType] as ComponentType<{ className?: string }>;

    if (!IconComponent) return null;

    return <IconComponent className="size-5" />;
};

export const Sidebar = () => {
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

    const { pathname } = useLocation();

    const { onLogout } = useAuth();

    const {
        isSidebarOpen,
        onCloseSidebar,
    } = useSidebarStore();

    const toggleGroupHandler = (path: string) => setExpandedGroups((prev) => ({
        ...prev,
        [path]: !prev[path],
    }));

    return (
        <aside
            className={generateClassNameHandler(
                `
                fixed
                top-0
                left-0
                z-50
                flex
                h-full
                w-sidebar
                flex-col
                border-r
                border-border
                bg-surface
                transition-transform
                duration-300
                md:translate-x-0
            `,
                isSidebarOpen ? "translate-x-0" : "-translate-x-full",
            )}
        >
            <div
                className="
                    flex
                    items-center
                    gap-3
                    p-3
                    md:p-4
                "
            >
                <img
                    alt={commonData.brandName}
                    className="size-10"
                    src="/apple-touch-icon.png"
                />
                <span className="text-lg font-bold text-primary">{commonData.brandName}</span>
            </div>
            <Separator />
            <nav
                className="
                    flex
                    flex-1
                    flex-col
                    gap-1
                    overflow-y-auto
                    p-2
                    md:p-3
                "
            >
                {sidebarData.map((item) => {
                    const {
                        children,
                        icon,
                        label,
                        path,
                    } = item;

                    const isActive = pathname === path;

                    if (children) {
                        const isParentActive = children.some(({ path }) => pathname.startsWith(path));

                        const isExpanded = expandedGroups[path] ?? isParentActive;

                        return (
                            <div
                                className="flex flex-col gap-1"
                                key={path}
                            >
                                <Button
                                    variant={ButtonVariantEnum.ICON}
                                    className={generateClassNameHandler(
                                        `
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-none
                                            px-3
                                            py-2
                                            text-xs
                                            font-semibold
                                            tracking-wider
                                            uppercase
                                            transition-colors
                                        `,
                                        isParentActive ? "text-primary" : "text-text-muted hover:text-text-secondary",
                                    )}
                                    onClick={() => toggleGroupHandler(path)}
                                >
                                    {renderIconHandler(icon)}
                                    <span className="flex-1 text-left">{label}</span>
                                    <LucideIcons.ChevronDown
                                        className={generateClassNameHandler(
                                            "size-4 transition-transform duration-300 ease-in-out",
                                            isExpanded ? "rotate-180" : "",
                                        )}
                                    />
                                </Button>
                                <div
                                    className={generateClassNameHandler(
                                        `
                                            grid
                                            pl-4
                                            transition-all
                                            duration-300
                                            ease-in-out
                                        `,
                                        isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                                    )}
                                >
                                    <div
                                        className="
                                            flex
                                            flex-col
                                            gap-0.5
                                            overflow-hidden
                                        "
                                    >
                                        {children.map((child) => {
                                            const {
                                                icon,
                                                label,
                                                path,
                                            } = child;

                                            const isChildActive = pathname === path;

                                            return (
                                                <Link
                                                    key={path}
                                                    to={path}
                                                    className={generateClassNameHandler(
                                                        `
                                                    flex
                                                    items-center
                                                    gap-3
                                                    rounded-default
                                                    px-3
                                                    py-2
                                                    text-sm
                                                    transition-all
                                                    duration-200
                                                `,
                                                        isChildActive ? "border-l-3 border-primary bg-primary/10 font-semibold text-primary" : "text-text-secondary hover:bg-primary/5 hover:text-primary",
                                                    )}
                                                    onClick={onCloseSidebar}
                                                >
                                                    {renderIconHandler(icon)}
                                                    {label}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={path}
                            to={path}
                            className={generateClassNameHandler(
                                `
                                flex
                                items-center
                                gap-3
                                rounded-default
                                px-3
                                py-2
                                text-sm
                                transition-all
                                duration-200
                            `,
                                isActive ? "border-l-3 border-primary bg-primary/10 font-semibold text-primary" : "text-text-secondary hover:bg-primary/5 hover:text-primary",
                            )}
                            onClick={onCloseSidebar}
                        >
                            {renderIconHandler(icon)}
                            {label}
                        </Link>
                    );
                })}
            </nav>
            <Separator />
            <div
                className="
                    flex
                    flex-col
                    gap-2
                    p-3
                    md:p-4
                "
            >
                <Button
                    className="no-underline"
                    size={ButtonSizeEnum.FULL}
                    variant={ButtonVariantEnum.GHOST}
                    onClick={onLogout}
                >
                    <LucideIcons.LogOut className="size-4 text-error" />
                    <span className="text-error">{buttonsConstants.logout}</span>
                </Button>
                <span className="text-center text-xs text-text-muted">
                    {commonData.prefix}
                    {commonData.version}
                </span>
            </div>
        </aside>
    );
};
