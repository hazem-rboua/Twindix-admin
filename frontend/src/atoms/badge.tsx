import type { ReactNode } from "react";

import { BadgeVariantEnum } from "@/enums";
import { Badge as UiBadge } from "@/ui";
import { generateClassNameHandler } from "@/utils";

const variantMap: Record<BadgeVariantEnum, string> = {
    [BadgeVariantEnum.DEFAULT]: "text-primary bg-primary/10 border-transparent",
    [BadgeVariantEnum.OUTLINE]: "text-text-secondary bg-transparent border-border",
    [BadgeVariantEnum.SECONDARY]: "text-text-dark bg-accent border-transparent",
};

export const Badge = ({
    children,
    className,
    variant = BadgeVariantEnum.DEFAULT,
}: {
    children: ReactNode,
    className?: string,
    variant?: BadgeVariantEnum,
}) => (
    <UiBadge
        className={generateClassNameHandler(
            "rounded-full px-3 py-1 text-xs font-medium",
            variantMap[variant],
            className,
        )}
    >
        {children}
    </UiBadge>
);
