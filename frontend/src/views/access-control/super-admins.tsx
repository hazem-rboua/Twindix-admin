import { User } from "lucide-react";

import { Button, Table } from "@/atoms";
import { Header, TableActions, TableExpandedContent } from "@/components";
import { buttonsConstants, labelsConstants, titlesConstants } from "@/constants";
import { ButtonVariantEnum, UserStatusEnum } from "@/enums";
import { useDeleteSuperAdmin, useSuperAdminsList } from "@/hooks";
import type { SuperAdminInterface } from "@/interfaces";
import type { TableColumnType } from "@/types";
import { generateClassNameHandler } from "@/utils";

const superAdminColumns: TableColumnType<SuperAdminInterface>[] = [
    {
        header: labelsConstants.name,
        onRender: ({
            name,
            status,
        }) => (
            <div className="flex items-center gap-3">
                <User
                    className={generateClassNameHandler(
                        "size-6 shrink-0",
                        status === UserStatusEnum.ACTIVE ? "text-success" : "text-text-secondary",
                    )}
                />
                <span className="text-sm text-text-dark">{name}</span>
            </div>
        ),
    },
    {
        header: labelsConstants.email,
        onRender: ({ email }) => <span className="text-sm text-text-dark">{email}</span>,
    },
    {
        header: labelsConstants.region,
        onRender: ({ region }) => <span className="text-sm text-text-dark">{region.name}</span>,
    },
    {
        header: labelsConstants.type,
        onRender: ({ user_type: userType }) => userType ? <span className="text-sm text-text-dark">{userType}</span> : null, // eslint-disable-line code-style/variable-naming-convention -- Backend response field
    },
];

export const SuperAdminsAccessControlView = () => {
    const {
        data: superAdmins,
        isLoading,
        refetchHandler,
    } = useSuperAdminsList();

    const { deleteHandler } = useDeleteSuperAdmin();

    const columns: TableColumnType<SuperAdminInterface>[] = [
        ...superAdminColumns,
        {
            onRender: (
                { id },
                {
                    isExpanded,
                    onToggleExpand,
                },
            ) => (
                <TableActions
                    isExpanded={isExpanded}
                    onEdit={() => {}}
                    onPermissions={() => {}}
                    onSuspend={() => {}}
                    onToggleExpand={onToggleExpand}
                    onRemove={async () => {
                        const isSuccess = await deleteHandler(id);

                        if (isSuccess) await refetchHandler();
                    }}
                />
            ),
        },
    ];

    return (
        <div
            className="
                flex
                flex-col
                gap-4
                md:gap-6
            "
        >
            <Header title={titlesConstants.superAdmins} />
            <div className="flex flex-col gap-3">
                <div className="flex justify-end">
                    <Button variant={ButtonVariantEnum.PRIMARY}>{buttonsConstants.add}</Button>
                </div>
                <Table
                    columns={columns}
                    data={superAdmins}
                    emptyMessage={labelsConstants.noSuperAdmins}
                    isLoading={isLoading}
                    onKeyExtractor={({ id }) => id}
                    onExpandedContent={({ subordinates }) => (
                        <TableExpandedContent
                            emptyMessage={labelsConstants.noAdmins}
                            items={subordinates}
                            title={labelsConstants.admins}
                            onKeyExtractor={({ id }) => id}
                            onRenderItem={({
                                email,
                                name,
                            }) => (
                                <>
                                    <span className="text-sm text-text-dark">{name}</span>
                                    <span className="text-xs text-text-muted">{email}</span>
                                </>
                            )}
                        />
                    )}
                />
            </div>
        </div>
    );
};
