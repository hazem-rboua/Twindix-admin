import type { VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import type { buttonVariants } from "@/ui";

export type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { isAsChild?: boolean };
