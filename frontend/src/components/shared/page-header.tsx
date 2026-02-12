import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

import { Button, Input } from "@/atoms";
import { ButtonVariantEnum, InputVariantEnum } from "@/enums";
import { cn } from "@/utils";

export const PageHeaderShared = ({
    actions,
    className,
    hasBackButton = false,
    onBackClick,
    onSearchChange,
    searchPlaceholder,
    searchValue,
    title,
}: {
    actions?: ReactNode,
    className?: string,
    hasBackButton?: boolean,
    onBackClick?: () => void,
    onSearchChange?: (value: string) => void,
    searchPlaceholder?: string,
    searchValue?: string,
    title: string,
}) => (
    <div
        className={generateClassNameHandler(
            `
            flex
            items-center
            justify-between
            gap-4
        `,
            className,
        )}
    >
        <div className="flex items-center gap-3">
            {hasBackButton && (
                <Button
                    variant={ButtonVariantEnum.ICON}
                    onClick={onBackClick}
                >
                    <ChevronLeft className="size-5" />
                </Button>
            )}
            <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
            {actions}
            {onSearchChange && (
                <Input
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    variant={InputVariantEnum.SEARCH}
                    onChange={onSearchChange}
                />
            )}
        </div>
    </div>
);
