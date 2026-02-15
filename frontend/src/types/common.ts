import type * as LucideIcons from "lucide-react";

import type { HtmlElementEnum, OrientationEnum, SelectPositionEnum } from "@/enums";

export type HtmlElementType = `${HtmlElementEnum}`;

export type LucideIconNameType = keyof typeof LucideIcons;

export type NullableErrorType = Error | null;

export type OrientationType = `${OrientationEnum}`;

export type SelectPositionType = `${SelectPositionEnum}`;
