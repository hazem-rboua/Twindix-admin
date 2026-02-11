import { AvatarSizeEnum } from "@/enums";
import { Avatar as UiAvatar, AvatarFallback, AvatarImage } from "@/ui";
import { cn } from "@/utils";

const sizeMap: Record<AvatarSizeEnum, string> = {
    [AvatarSizeEnum.LG]: "size-14",
    [AvatarSizeEnum.MD]: "size-10",
    [AvatarSizeEnum.SM]: "size-8",
};

export const Avatar = ({
    alt,
    className,
    fallback,
    size = AvatarSizeEnum.MD,
    src,
}: {
    alt?: string,
    className?: string,
    fallback: string,
    size?: AvatarSizeEnum,
    src?: string,
}) => (
    <UiAvatar
        className={cn(
            sizeMap[size],
            className,
        )}
    >
        {src && (
            <AvatarImage
                alt={alt}
                src={src}
            />
        )}
        <AvatarFallback
            className="
                bg-primary-light
                text-sm
                font-medium
                text-white
            "
        >
            {fallback}
        </AvatarFallback>
    </UiAvatar>
);
