import {
    ChevronDown,
    ChevronUp,
    Pause,
    Pencil,
    Shield,
    Trash2,
} from "lucide-react";

import { Button } from "@/atoms";
import { ButtonVariantEnum } from "@/enums";

export const TableActions = ({
    isExpanded = false,
    onEdit,
    onPermissions,
    onRemove,
    onSuspend,
    onToggleExpand,
}: {
    isExpanded?: boolean,
    onEdit: () => void,
    onPermissions: () => void,
    onRemove: () => void,
    onSuspend: () => void,
    onToggleExpand?: () => void,
}) => (
    <div
        className="
            flex
            items-center
            justify-end
            gap-2
        "
    >
        <Button
            variant={ButtonVariantEnum.ICON}
            className="
                bg-slate
                text-white
                transition-all
                duration-200
                hover:bg-slate
                hover:text-white
                hover:brightness-125
            "
            onClick={onPermissions}
        >
            <Shield className="size-4" />
        </Button>
        <Button
            variant={ButtonVariantEnum.ICON}
            className="
                bg-info
                text-white
                transition-all
                duration-200
                hover:bg-info
                hover:text-white
                hover:brightness-125
            "
            onClick={onEdit}
        >
            <Pencil className="size-4" />
        </Button>
        <Button
            variant={ButtonVariantEnum.ICON}
            className="
                bg-gold
                text-white
                transition-all
                duration-200
                hover:bg-gold
                hover:text-white
                hover:brightness-125
            "
            onClick={onSuspend}
        >
            <Pause className="size-4" />
        </Button>
        <Button
            variant={ButtonVariantEnum.ICON}
            className="
                bg-error
                text-white
                transition-all
                duration-200
                hover:bg-error
                hover:text-white
                hover:brightness-125
            "
            onClick={onRemove}
        >
            <Trash2 className="size-4" />
        </Button>
        {onToggleExpand && (
            <Button
                variant={ButtonVariantEnum.ICON}
                onClick={onToggleExpand}
            >
                {isExpanded ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
            </Button>
        )}
    </div>
);
