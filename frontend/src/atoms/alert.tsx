import {
    AlertCircle,
    CheckCircle2,
    Info,
    X,
    XCircle,
} from "lucide-react";
import type { ReactNode } from "react";

import { AlertVariantEnum, ButtonTypeEnum } from "@/enums";
import { generateClassNameHandler } from "@/utils";

const variantMap: Record<
    AlertVariantEnum,
    {
        className: string,
        icon: ReactNode,
    }
> = {
    [AlertVariantEnum.ERROR]: {
        className: "border-error/30 bg-error/10 text-error",
        icon: <XCircle className="size-5 shrink-0" />,
    },
    [AlertVariantEnum.INFO]: {
        className: "border-primary/30 bg-primary/10 text-primary",
        icon: <Info className="size-5 shrink-0" />,
    },
    [AlertVariantEnum.SUCCESS]: {
        className: "border-success/30 bg-success/10 text-success",
        icon: <CheckCircle2 className="size-5 shrink-0" />,
    },
    [AlertVariantEnum.WARNING]: {
        className: "border-warning/30 bg-warning/10 text-warning",
        icon: <AlertCircle className="size-5 shrink-0" />,
    },
};

export const Alert = ({
    children,
    className,
    onClose,
    variant = AlertVariantEnum.INFO,
}: {
    children: ReactNode,
    className?: string,
    onClose?: () => void,
    variant?: AlertVariantEnum,
}) => {
    const {
        className: variantClassName,
        icon,
    } = variantMap[variant];

    return (
        <div
            role="alert"
            className={generateClassNameHandler(
                "flex items-start gap-3 rounded-default border p-4 text-sm",
                variantClassName,
                className,
            )}
        >
            {icon}
            <div className="flex-1">{children}</div>
            {onClose && (
                <button
                    type={ButtonTypeEnum.BUTTON}
                    className="
                        shrink-0
                        opacity-70
                        transition-opacity
                        hover:opacity-100
                    "
                    onClick={onClose}
                >
                    <X className="size-4" />
                </button>
            )}
        </div>
    );
};
