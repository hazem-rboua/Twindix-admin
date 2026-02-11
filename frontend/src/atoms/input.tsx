import { Search } from "lucide-react";

import { InputTypeEnum, InputVariantEnum } from "@/enums";
import { Input as UiInput } from "@/ui";
import { cn } from "@/utils";

import { Label } from "./label";

export const Input = ({
    className,
    errorMessage,
    hasError = false,
    id,
    isDisabled = false,
    label,
    onChange,
    placeholder,
    suffix,
    type = InputTypeEnum.TEXT,
    value,
    variant = InputVariantEnum.DEFAULT,
}: {
    className?: string,
    errorMessage?: string,
    hasError?: boolean,
    id?: string,
    isDisabled?: boolean,
    label?: string,
    onChange?: (value: string) => void,
    placeholder?: string,
    suffix?: string,
    type?: InputTypeEnum,
    value?: string,
    variant?: InputVariantEnum,
}) => (
    <div
        className={cn(
            "flex flex-col gap-1.5",
            className,
        )}
    >
        {label && (<Label htmlFor={id}>{label}</Label>)}
        <div className="relative">
            {variant === InputVariantEnum.SEARCH && (
                <Search
                    className="
                        absolute
                        top-1/2
                        left-3
                        size-4
                        -translate-y-1/2
                        text-text-muted
                    "
                />
            )}
            <UiInput
                disabled={isDisabled}
                id={id}
                placeholder={placeholder}
                type={type}
                value={value}
                className={cn(
                    `
                    rounded-default
                    border-muted
                    bg-surface
                    text-text-primary
                    placeholder:text-text-muted
                    focus-visible:ring-primary
                `,
                    variant === InputVariantEnum.SEARCH && "pl-10",
                    suffix && "pr-16",
                    hasError && "border-error focus-visible:ring-error",
                )}
                onChange={({ target }) => onChange?.(target.value)}
            />
            {suffix && (
                <span
                    className="
                        absolute
                        top-1/2
                        right-3
                        -translate-y-1/2
                        text-sm
                        font-medium
                        text-text-muted
                    "
                >
                    {suffix}
                </span>
            )}
        </div>
        {hasError && errorMessage && <p className="text-xs text-error">{errorMessage}</p>}
    </div>
);
