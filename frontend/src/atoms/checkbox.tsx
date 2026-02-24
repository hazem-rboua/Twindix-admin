import { ButtonTypeEnum, CheckboxVariantEnum } from "@/enums";
import { Checkbox as CheckboxUI } from "@/ui";
import { generateClassNameHandler } from "@/utils";

import { Label } from "./label";

export const Checkbox = ({
    className,
    isChecked = false,
    isDisabled = false,
    label,
    onChange,
    variant = CheckboxVariantEnum.DEFAULT,
}: {
    className?: string,
    isChecked?: boolean,
    isDisabled?: boolean,
    label: string,
    onChange: (isChecked: boolean) => void,
    variant?: CheckboxVariantEnum,
}) => {
    if (variant === CheckboxVariantEnum.CHIP) {
        return (
            <button
                disabled={isDisabled}
                type={ButtonTypeEnum.BUTTON}
                className={generateClassNameHandler(
                    `
                    rounded-default
                    border
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition-colors
                `,
                    isChecked ? "border-primary bg-primary text-white" : "border-muted bg-surface text-text-primary hover:border-primary",
                    isDisabled && "cursor-not-allowed opacity-50",
                    className,
                )}
                onClick={() => onChange(!isChecked)}
            >
                {label}
            </button>
        );
    }

    return (
        <div
            className={generateClassNameHandler(
                "flex items-center gap-2",
                className,
            )}
        >
            <CheckboxUI
                checked={isChecked}
                disabled={isDisabled}
                onCheckedChange={onChange}
            />
            <Label>{label}</Label>
        </div>
    );
};
