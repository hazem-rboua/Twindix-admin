import type { VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import type {
    AccordionEnum,
    AlertVariantEnum,
    AvatarSizeEnum,
    ButtonSizeEnum,
    ButtonTypeEnum,
    ButtonVariantEnum,
    CheckboxVariantEnum,
    InputEnum,
    InputVariantEnum,
    LogoSizeEnum,
} from "@/enums";
import type { buttonVariants } from "@/ui";

export type AccordionType = `${AccordionEnum}`;

export type AlertVariantType = `${AlertVariantEnum}`;

export type AvatarSizeType = `${AvatarSizeEnum}`;

export type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { isAsChild?: boolean };

export type ButtonSizeType = `${ButtonSizeEnum}`;

export type ButtonTypeType = `${ButtonTypeEnum}`;

export type ButtonVariantType = `${ButtonVariantEnum}`;

export type CheckboxVariantType = `${CheckboxVariantEnum}`;

export type InputType = `${InputEnum}`;

export type InputVariantType = `${InputVariantEnum}`;

export type LogoSizeType = `${LogoSizeEnum}`;

export type TableExpandStateType = {
    isExpanded: boolean,
    onToggleExpand: () => void,
};

export type TableColumnType<T> = {
    header?: string,
    onRender: (item: T, expandState: TableExpandStateType) => ReactNode,
};
