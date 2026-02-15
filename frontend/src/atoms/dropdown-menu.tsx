import type { ReactNode } from "react";

import type { DropdownMenuItemInterface } from "@/interfaces";
import {
    DropdownMenu as UiDropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/ui";

export const DropdownMenu = ({
    header,
    items,
    trigger,
}: {
    header?: ReactNode,
    items: DropdownMenuItemInterface[],
    trigger: ReactNode,
}) => (
    <UiDropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            {header && (
                <>
                    <DropdownMenuLabel>{header}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                </>
            )}
            <DropdownMenuGroup>
                {items.map(({
                    className,
                    hasSeparatorBefore,
                    icon,
                    label,
                    onClick,
                }) => (
                    <div key={label}>
                        {hasSeparatorBefore && <DropdownMenuSeparator />}
                        <DropdownMenuItem
                            className={className}
                            onClick={onClick}
                        >
                            {icon}
                            {label}
                        </DropdownMenuItem>
                    </div>
                ))}
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </UiDropdownMenu>
);
