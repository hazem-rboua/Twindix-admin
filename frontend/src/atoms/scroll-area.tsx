import type { ReactNode } from "react";

import { ScrollArea as UiScrollArea } from "@/ui";
import { generateClassNameHandler } from "@/utils";

export const ScrollArea = ({
    children,
    className,
    maxHeight,
}: {
    children: ReactNode,
    className?: string,
    maxHeight?: string,
}) => (
    <UiScrollArea
        className={generateClassNameHandler(className)}
        style={maxHeight ? { maxHeight } : undefined}
    >
        {children}
    </UiScrollArea>
);
