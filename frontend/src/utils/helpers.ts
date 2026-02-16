import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const generateClassNameHandler = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const cn = generateClassNameHandler;
