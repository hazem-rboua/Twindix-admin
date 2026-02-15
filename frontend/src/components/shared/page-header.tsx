import { ChevronLeft, Menu } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/atoms";
import { ButtonVariantEnum } from "@/enums";
import { useSidebar } from "@/hooks";
import { generateClassNameHandler } from "@/utils";

import { HeaderToolbar } from "./header-toolbar";

export const PageHeader = ({
    actions,
    className,
    hasBackButton = false,
    onBackClick,
    title,
}: {
    actions?: ReactNode,
    className?: string,
    hasBackButton?: boolean,
    onBackClick?: () => void,
    title: string,
}) => {
    const { onToggleSidebar } = useSidebar();

    return (
        <div
            className={generateClassNameHandler(
                `
                flex
                items-center
                justify-between
                gap-2
                md:gap-4
            `,
                className,
            )}
        >
            <div
                className="
                    flex
                    items-center
                    gap-2
                    md:gap-3
                "
            >
                <Button
                    className="no-underline md:hidden"
                    variant={ButtonVariantEnum.ICON}
                    onClick={onToggleSidebar}
                >
                    <Menu className="size-5" />
                </Button>
                {hasBackButton && (
                    <Button
                        variant={ButtonVariantEnum.ICON}
                        onClick={onBackClick}
                    >
                        <ChevronLeft className="size-5" />
                    </Button>
                )}
                <h1
                    className="
                        text-xl
                        font-bold
                        text-primary
                        md:text-2xl
                    "
                >
                    {title}
                </h1>
            </div>
            <div
                className="
                    flex
                    items-center
                    gap-2
                    md:gap-3
                "
            >
                {actions}
                <HeaderToolbar />
            </div>
        </div>
    );
};
