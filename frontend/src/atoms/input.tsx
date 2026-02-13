import { Eye, EyeOff, Search } from "lucide-react";
import { useState } from "react";

import { ButtonTypeEnum, InputTypeEnum, InputVariantEnum } from "@/enums";
import { Input as UiInput } from "@/ui";
import { generateClassNameHandler } from "@/utils";

import { Label } from "./label";

export const Input = ({
    className,
    errorMessage,
    hasError = false,
    id,
    isDisabled = false,
    isShowPasswordToggle = false,
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
    isShowPasswordToggle?: boolean,
    label?: string,
    onChange?: (value: string) => void,
    placeholder?: string,
    suffix?: string,
    type?: InputTypeEnum,
    value?: string,
    variant?: InputVariantEnum,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPasswordType = type === InputTypeEnum.PASSWORD;

    const resolvedType = isPasswordType && isPasswordVisible ? InputTypeEnum.TEXT : type;

    const togglePasswordVisibilityHandler = () => setIsPasswordVisible((prev) => !prev);

    return (
        <div
            className={generateClassNameHandler(
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
                    type={resolvedType}
                    value={value}
                    className={generateClassNameHandler(
                        `
                        rounded-default
                        border-muted
                        bg-surface
                        text-text-primary
                        placeholder:text-text-muted
                        focus-visible:ring-primary
                    `,
                        variant === InputVariantEnum.SEARCH && "pl-10",
                        (suffix || (isPasswordType && isShowPasswordToggle)) && "pr-16",
                        hasError && "border-error focus-visible:ring-error",
                    )}
                    onChange={({ target }) => onChange?.(target.value)}
                />
                {isPasswordType && isShowPasswordToggle && (
                    <button
                        tabIndex={-1}
                        type={ButtonTypeEnum.BUTTON}
                        className="
                            absolute
                            top-1/2
                            right-3
                            -translate-y-1/2
                            text-text-muted
                            transition-colors
                            hover:text-text-primary
                        "
                        onClick={togglePasswordVisibilityHandler}
                    >
                        {isPasswordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                )
                }
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
};
