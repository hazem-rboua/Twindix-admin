import { OrientationEnum } from "@/enums";
import { Separator as UiSeparator } from "@/ui";
import { cn } from "@/utils";

export const Separator = ({
    className,
    orientation = OrientationEnum.HORIZONTAL,
}: {
    className?: string,
    orientation?: OrientationEnum,
}) => (
    <UiSeparator
        orientation={orientation}
        className={generateClassNameHandler(
            "bg-muted",
            className,
        )}
    />
);
