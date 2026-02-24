import type { ReactNode } from "react";

import { ScrollArea as ScrollAreaUI } from "@/ui";
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
    <ScrollAreaUI
        className={generateClassNameHandler(className)}
        style={maxHeight ? { maxHeight } : undefined}
    >
        {children}
    </ScrollAreaUI>
);
