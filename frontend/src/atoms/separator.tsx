import { OrientationEnum } from "@/enums";
import { Separator as SeparatorUI } from "@/ui";
import { generateClassNameHandler } from "@/utils";

export const Separator = ({
    className,
    orientation = OrientationEnum.HORIZONTAL,
}: {
    className?: string,
    orientation?: OrientationEnum,
}) => (
    <SeparatorUI
        orientation={orientation}
        className={generateClassNameHandler(
            "bg-muted",
            className,
        )}
    />
);
