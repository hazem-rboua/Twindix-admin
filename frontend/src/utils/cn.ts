import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line code-style/function-naming-convention -- Industry-standard shadcn utility name
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
