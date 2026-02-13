import { commonData } from "@/data";
import { LogoSizeEnum } from "@/enums";
import { generateClassNameHandler } from "@/utils";

const sizeMap: Record<LogoSizeEnum, string> = {
    [LogoSizeEnum.LG]: "text-3xl",
    [LogoSizeEnum.MD]: "text-2xl",
    [LogoSizeEnum.SM]: "text-xl",
};

export const Logo = ({
    className,
    size = LogoSizeEnum.MD,
}: {
    className?: string,
    size?: LogoSizeEnum,
}) => (
    <span
        className={generateClassNameHandler(
            "font-bold text-primary",
            sizeMap[size],
            className,
        )}
    >
        {commonData.brandName}
    </span>
);
