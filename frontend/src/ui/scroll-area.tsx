import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React from "react";

import { OrientationEnum } from "@/enums";
import { generateClassNameHandler } from "@/utils";

export const ScrollArea = React.forwardRef<
    React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>((
    {
        children,
        className,
        ...props
    },
    ref,
) => (
    <ScrollAreaPrimitive.Root
        ref={ref}
        className={generateClassNameHandler(
            "relative overflow-hidden",
            className,
        )}
        {...props}
    >
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">{children}</ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
));

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export const ScrollBar = React.forwardRef<
    React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>((
    {
        className,
        orientation = OrientationEnum.VERTICAL,
        ...props
    },
    ref,
) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
        orientation={orientation}
        ref={ref}
        className={generateClassNameHandler(
            `
            flex
            touch-none
            select-none
            transition-colors
        `,
            orientation === OrientationEnum.VERTICAL && "h-full w-2.5 border-l border-l-transparent p-px",
            orientation === OrientationEnum.HORIZONTAL && "h-2.5 flex-col border-t border-t-transparent p-px",
            className,
        )}
        {...props}
    >
        <ScrollAreaPrimitive.ScrollAreaThumb
            className="
                relative
                flex-1
                rounded-full
                bg-border
            "
        />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
));

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
