import type { ReactNode } from "react";

import {
    Dialog as UiDialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/ui";
import { generateClassNameHandler } from "@/utils";

export { DialogTrigger } from "@/ui";

export const Dialog = ({
    children,
    className,
    description,
    isOpen,
    onOpenChange,
    title,
}: {
    children: ReactNode,
    className?: string,
    description?: string,
    isOpen: boolean,
    onOpenChange: (isOpen: boolean) => void,
    title: string,
}) => (
    <UiDialog
        open={isOpen}
        onOpenChange={onOpenChange}
    >
        <DialogContent
            className={generateClassNameHandler(
                "rounded-default",
                className,
            )}
        >
            <DialogHeader>
                <DialogTitle className="text-text-primary">{title}</DialogTitle>
                {description && <DialogDescription className="text-text-secondary">{description}</DialogDescription>}
            </DialogHeader>
            {children}
        </DialogContent>
    </UiDialog>
);
