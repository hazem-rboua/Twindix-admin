import { Textarea as UiTextarea } from "@/ui";
import { generateClassNameHandler } from "@/utils";

import { Label } from "./label";

export const Textarea = ({
    className,
    errorMessage,
    hasError = false,
    id,
    isDisabled = false,
    label,
    onChange,
    placeholder,
    rows = 4,
    value,
}: {
    className?: string,
    errorMessage?: string,
    hasError?: boolean,
    id?: string,
    isDisabled?: boolean,
    label?: string,
    onChange?: (value: string) => void,
    placeholder?: string,
    rows?: number,
    value?: string,
}) => (
    <div
        className={generateClassNameHandler(
            "flex flex-col gap-1.5",
            className,
        )}
    >
        {label && (<Label htmlFor={id}>{label}</Label>)}
        <UiTextarea
            disabled={isDisabled}
            id={id}
            placeholder={placeholder}
            rows={rows}
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
                hasError && "border-error focus-visible:ring-error",
            )}
            onChange={({ target }) => onChange?.(target.value)}
        />
        {hasError && errorMessage && <p className="text-xs text-error">{errorMessage}</p>}
    </div>
);
