import type { ReactNode } from "react";

import { Label as UiLabel } from "@/ui";
import { cn } from "@/utils";

export const Label = ({
    children,
    className,
    htmlFor,
    isRequired = false,
}: {
    children: ReactNode,
    className?: string,
    htmlFor?: string,
    isRequired?: boolean,
}) => (
    <UiLabel
        htmlFor={htmlFor}
        className={cn(
            "text-sm font-medium text-text-primary",
            className,
        )}
    >
        {children}
        {isRequired && <span className="ml-0.5 text-error">*</span>}
    </UiLabel>
);
