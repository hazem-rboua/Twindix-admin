import { RadioGroup as UiRadioGroup, RadioGroupItem } from "@/ui";
import { cn } from "@/utils";

import { Label } from "./label";

export const RadioGroup = ({
    className,
    isDisabled = false,
    label,
    onChange,
    options,
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
    value?: string,
}) => (
    <div
        className={generateClassNameHandler(
            "flex flex-col gap-1.5",
            className,
        )}
    >
        {label && (<Label>{label}</Label>)}
        <UiRadioGroup
            disabled={isDisabled}
            value={value}
            onValueChange={onChange}
        >
            {options.map(({
                label,
                value,
            }) => (
                <div
                    className="flex items-center gap-2"
                    key={value}
                >
                    <RadioGroupItem
                        id={value}
                        value={value}
                    />
                    <Label htmlFor={value}>{label}</Label>
                </div>
            ))}
        </UiRadioGroup>
    </div>
);
