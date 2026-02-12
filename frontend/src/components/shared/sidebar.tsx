import * as LucideIcons from "lucide-react";
import type { ComponentType } from "react";
import { Link, useLocation } from "react-router-dom";

import {
    Accordion,
    Avatar,
    Button,
    Separator,
} from "@/atoms";
import { commonConstants, layoutsConstants } from "@/constants";
import { navigationData } from "@/data";
import { AvatarSizeEnum, ButtonSizeEnum, ButtonVariantEnum } from "@/enums";
import type { LucideIconNameType } from "@/types";
import { cn } from "@/utils";

const renderIconHandler = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as LucideIconNameType] as ComponentType<{ className?: string }>;

    if (!IconComponent) return null;

    return <IconComponent className="size-5" />;
};

export const SidebarShared = () => {
    const { pathname } = useLocation();

    return (
        <aside
            className="
                fixed
                top-0
                left-0
                z-40
                flex
                h-full
                w-sidebar
                flex-col
                border-r
                border-muted
                bg-surface
            "
        >
            <div
                className="
                    flex
                    items-center
                    gap-3
                    p-4
                "
            >
                <img
                    alt={commonConstants.brandName}
                    className="size-10"
                    src="/apple-touch-icon.png"
                />
                <span className="text-lg font-bold text-primary">{commonConstants.brandName}</span>
            </div>
            <Separator />
            <div
                className="
                    flex
                    items-center
                    gap-3
                    p-4
                "
            >
                <Avatar
                    fallback={layoutsConstants.sidebar.fallback}
                    size={AvatarSizeEnum.SM}
                />
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-primary">{layoutsConstants.sidebar.name}</span>
                    <span className="text-xs text-text-muted">{layoutsConstants.sidebar.email}</span>
                </div>
            </div>
            <Separator />
            <nav className="flex-1 overflow-y-auto p-2">
                {navigationData.map((item) => {
                    const {
                        children,
                        icon,
                        label,
                        path,
                    } = item;

                    const isActive = pathname === path;

                    if (children) {
                        return (
                            <Accordion
                                key={path}
                                items={[
                                    {
                                        content: (
                                            <div
                                                className="
                                                    flex
                                                    flex-col
                                                    gap-1
                                                    pl-4
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
                                                                transition-colors
                                                            `,
                                                                isChildActive ? "bg-primary text-white" : "text-text-secondary hover:bg-background",
                                                            )}
                                                        >
                                                            {renderIconHandler(icon)}
                                                            {label}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        ),
                                        title: label,
                                        value: path,
                                    },
                                ]}
                            />
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
                                transition-colors
                            `,
                                isActive ? "bg-primary text-white" : "text-text-secondary hover:bg-background",
                            )}
                        >
                            {renderIconHandler(icon)}
                            {label}
                        </Link>
                    );
                })}
            </nav>
            <Separator />
            <div className="p-4">
                <Button
                    size={ButtonSizeEnum.FULL}
                    variant={ButtonVariantEnum.OUTLINE}
                    onClick={() => {}}
                >
                    {layoutsConstants.sidebar.logout}
                </Button>
            </div>
        </aside>
    );
};
