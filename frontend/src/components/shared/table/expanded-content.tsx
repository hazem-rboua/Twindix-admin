import type { ReactNode } from "react";

export const TableExpandedContent = <T,>({
    emptyMessage,
    items,
    onKeyExtractor,
    onRenderItem,
    title,
}: {
    emptyMessage: string,
    items: T[],
    onKeyExtractor: (item: T) => string | number,
    onRenderItem: (item: T) => ReactNode,
    title: string,
}) => (
    <div className="flex flex-col gap-2">
        <h4 className="text-sm font-semibold text-text-dark">{title}</h4>
        {items.length === 0 && <p className="text-xs text-text-muted">{emptyMessage}</p>}
        {items.map((item) => (
            <div
                key={onKeyExtractor(item)}
                className="
                    flex
                    items-center
                    justify-between
                    rounded-default
                    bg-surface
                    px-3
                    py-2
                "
            >
                {onRenderItem(item)}
            </div>
        ))}
    </div>
);
