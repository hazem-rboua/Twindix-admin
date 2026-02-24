import { Loader2 } from "lucide-react";

import { LoaderSizeEnum } from "@/enums";
import { generateClassNameHandler } from "@/utils";

export const Loader = ({
    className,
    size = LoaderSizeEnum.LG,
}: {
    className?: string,
    size?: LoaderSizeEnum,
}) => (
    <div
        className="
            flex
            flex-1
            items-center
            justify-center
        "
    >
        <Loader2
            className={generateClassNameHandler(
                "animate-spin text-primary",
                size,
                className,
            )}
        />
    </div>
);
