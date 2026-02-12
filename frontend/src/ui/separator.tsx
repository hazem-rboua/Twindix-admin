"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { OrientationEnum } from "@/enums";
import { cn } from "@/utils";

export const Separator = React.forwardRef<
    React.ComponentRef<typeof SeparatorPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
    (
        {
            className,
            decorative = true,
            orientation = OrientationEnum.HORIZONTAL,
            ...props
        },
        ref,
    ) => (
        <SeparatorPrimitive.Root
            decorative={decorative}
            orientation={orientation}
            ref={ref}
            className={generateClassNameHandler(
                "shrink-0 bg-border",
                orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
                className,
            )}
            {...props}
        />
    ),
);

Separator.displayName = SeparatorPrimitive.Root.displayName;
