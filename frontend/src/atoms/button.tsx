import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

import { ButtonSizeEnum, ButtonTypeEnum, ButtonVariantEnum } from "@/enums";
import { Button as UiButton } from "@/ui";
import { generateClassNameHandler } from "@/utils";

const variantMap: Record<ButtonVariantEnum, string> = {
    [ButtonVariantEnum.DANGER]: "text-white bg-error hover:bg-error-light",
    [ButtonVariantEnum.GHOST]: `
        text-primary
        underline
        bg-transparent
        hover:text-primary-dark
    `,
    [ButtonVariantEnum.ICON]: "p-2 size-10 rounded-full",
    [ButtonVariantEnum.LINK]: `
        p-0
        h-auto
        text-primary
        bg-transparent
        underline-offset-4
        hover:underline
    `,
    [ButtonVariantEnum.OUTLINE]: `
        text-primary
        bg-transparent
        border
        border-primary
        hover:bg-primary
        hover:text-white
    `,
    [ButtonVariantEnum.PRIMARY]: "text-white bg-primary hover:bg-primary-dark",
    [ButtonVariantEnum.WARNING]: "text-white bg-warning hover:bg-warning-dark",
};

const sizeMap: Record<ButtonSizeEnum, string> = {
    [ButtonSizeEnum.FULL]: `
        px-6
        h-12
        w-full
        text-base
    `,
    [ButtonSizeEnum.LG]: "px-8 h-12 text-base",
    [ButtonSizeEnum.MD]: "px-4 h-10 text-sm",
    [ButtonSizeEnum.SM]: "px-3 h-8 text-xs",
};

export const Button = ({
    children,
    className,
    isDisabled = false,
    isFullWidth = false,
    isLoading = false,
    onClick,
    size = ButtonSizeEnum.MD,
    type = ButtonTypeEnum.BUTTON,
    variant = ButtonVariantEnum.PRIMARY,
}: {
    children: ReactNode,
    className?: string,
    isDisabled?: boolean,
    isFullWidth?: boolean,
    isLoading?: boolean,
    onClick?: () => void,
    size?: ButtonSizeEnum,
    type?: ButtonTypeEnum,
    variant?: ButtonVariantEnum,
}) => (
    <UiButton
        disabled={isDisabled || isLoading}
        type={type}
        className={generateClassNameHandler(
            "rounded-default font-medium transition-colors",
            variantMap[variant],
            sizeMap[size],
            isFullWidth && "w-full",
            className,
        )}
        onClick={onClick}
    >
        {isLoading ? <Loader2 className="size-4 animate-spin" /> : children}
    </UiButton>
);
