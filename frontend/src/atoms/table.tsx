import { Fragment, type ReactNode, useState } from "react";

import { labelsConstants } from "@/constants";
import type { TableColumnType } from "@/types";
import {
    Table as TableUI,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/ui";
import { generateClassNameHandler } from "@/utils";

import { Loader } from "./loader";

export const Table = <T,>({
    columns,
    data,
    emptyMessage,
    isLoading,
    onExpandedContent,
    onKeyExtractor,
}: {
    columns: TableColumnType<T>[],
    data: T[],
    emptyMessage: string,
    isLoading: boolean,
    onExpandedContent?: (item: T) => ReactNode,
    onKeyExtractor: (item: T) => string | number,
}) => {
    const [expandedKey, setExpandedKey] = useState<string | number | null>(null);

    if (isLoading) return <Loader />;

    if (data.length === 0) return <p className="text-sm text-text-muted">{emptyMessage}</p>;

    const toggleExpandHandler = (key: string | number) => setExpandedKey((prev) => (prev === key ? null : key));

    return (
        <TableUI className="border-separate border-spacing-y-3">
            <TableHeader className="[&_tr]:border-0">
                <TableRow className="hover:bg-transparent">
                    {columns.map((
                        { header },
                        index,
                    ) => (
                        <TableHead
                            className={header ? "text-sm font-medium text-text-secondary" : undefined}
                            key={header ?? index}
                        >
                            {header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => {
                    const key = onKeyExtractor(item);

                    const isExpanded = expandedKey === key;

                    return (
                        <Fragment key={key}>
                            <TableRow
                                className="
                                    border-0
                                    hover:bg-transparent
                                    [&>td]:bg-surface
                                    [&>td:first-child]:rounded-l-default
                                    [&>td:last-child]:rounded-r-default
                                "
                            >
                                {columns.map((
                                    {
                                        header,
                                        onRender,
                                    },
                                    index,
                                ) => (
                                    <TableCell key={header ?? index}>
                                        {onRender(
                                            item,
                                            {
                                                isExpanded,
                                                onToggleExpand: () => toggleExpandHandler(key),
                                            },
                                        ) || <span className="text-base font-medium text-text-secondary">{labelsConstants.emptyCell}</span>}
                                    </TableCell>
                                ))}
                            </TableRow>
                            {onExpandedContent && (
                                <TableRow
                                    className={generateClassNameHandler(
                                        "border-0 hover:bg-transparent",
                                        !isExpanded && "hidden",
                                    )}
                                >
                                    <TableCell
                                        className="rounded-default bg-accent/50 p-4"
                                        colSpan={columns.length}
                                    >
                                        {onExpandedContent(item)}
                                    </TableCell>
                                </TableRow>
                            )}
                        </Fragment>
                    );
                })}
            </TableBody>
        </TableUI>
    );
};
