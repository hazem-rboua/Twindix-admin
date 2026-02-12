import {
    Select as UiSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/ui";
import { generateClassNameHandler } from "@/utils";

import { Label } from "./label";

export const Select = ({
    className,
    isDisabled = false,
    label,
    onChange,
    options,
    placeholder,
    value,
}: {
    className?: string,
    isDisabled?: boolean,
    label?: string,
    onChange: (value: string) => void,
    options: {
        label: string,
        value: string,
    }[],
    placeholder?: string,
    value?: string,
}) => (
    <div
        className={generateClassNameHandler(
            "flex flex-col gap-1.5",
            className,
        )}
    >
        {label && (<Label>{label}</Label>)}
        <UiSelect
            disabled={isDisabled}
            value={value}
            onValueChange={onChange}
        >
            <SelectTrigger
                className="
                    rounded-default
                    border-muted
                    bg-surface
                    text-text-primary
                    focus:ring-primary
                "
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="rounded-default">
                {options.map(({
                    label,
                    value,
                }) => (
                    <SelectItem
                        key={value}
                        value={value}
                    >
                        {label}
                    </SelectItem>
                ))}
            </SelectContent>
        </UiSelect>
    </div>
);
