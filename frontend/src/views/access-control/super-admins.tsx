import {
    ChevronDown,
    ChevronUp,
    Pause,
    Pencil,
    Shield,
    Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Badge, Button, Input } from "@/atoms";
import { Header } from "@/components";
import { buttonsConstants, labelsConstants, titlesConstants } from "@/constants";
import { routesData } from "@/data";
import { BadgeVariantEnum, ButtonVariantEnum, InputVariantEnum } from "@/enums";
import type { SuperAdminInterface } from "@/interfaces";
import { superAdminsService } from "@/services";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/ui";
import { generateClassNameHandler } from "@/utils";

export const SuperAdminsAccessControlView = () => {
    const [expandedAdminId, setExpandedAdminId] = useState<number | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");

    const [superAdmins, setSuperAdmins] = useState<SuperAdminInterface[]>([]);

    const navigate = useNavigate();

    const filteredSuperAdmins = superAdmins.filter((admin) => {
        const {
            email,
            name,
        } = admin;

        const query = searchQuery.toLowerCase();

        return name.toLowerCase().includes(query) || email.toLowerCase().includes(query);
    });

    const fetchSuperAdminsHandler = async () => {
        try {
            setIsLoading(true);

            const data = await superAdminsService.listHandler();

            setSuperAdmins(data);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteSuperAdminHandler = async (adminId: number) => {
        await superAdminsService.removeHandler(adminId);

        setSuperAdmins((prev) => prev.filter(({ id }) => id !== adminId));
    };

    const toggleExpandHandler = (id: number) => setExpandedAdminId((prev) => (prev === id ? null : id));

    const navigateBackHandler = () => navigate(routesData.accessControl);

    useEffect(
        () => void fetchSuperAdminsHandler(),
        [],
    );

    return (
        <div
            className="
                flex
                flex-col
                gap-4
                md:gap-6
            "
        >
            <Header
                title={titlesConstants.superAdmins}
                actions={(
                    <Button variant={ButtonVariantEnum.PRIMARY}>{buttonsConstants.addSuperAdmin}</Button>
                )}
                hasBackButton
                onBackClick={navigateBackHandler}
            />
            <Input
                placeholder={labelsConstants.searchSuperAdminsPlaceholder}
                value={searchQuery}
                variant={InputVariantEnum.SEARCH}
                onChange={setSearchQuery}
            />
            {isLoading && <p className="text-sm text-text-muted">{labelsConstants.searchPlaceholder}</p>}
            {!isLoading && filteredSuperAdmins.length === 0 && <p className="text-sm text-text-muted">{labelsConstants.noSuperAdmins}</p>}
            {!isLoading && filteredSuperAdmins.length > 0 && (
                <div
                    className="
                        overflow-hidden
                        rounded-default
                        border
                        border-border
                        bg-surface
                        shadow-sm
                    "
                >
                    <Table>
                        <TableHeader className="bg-accent">
                            <TableRow>
                                <TableHead className="text-sm font-semibold text-text-secondary">{labelsConstants.tableName}</TableHead>
                                <TableHead className="text-sm font-semibold text-text-secondary">{labelsConstants.tableEmail}</TableHead>
                                <TableHead className="text-sm font-semibold text-text-secondary">{labelsConstants.tableRegion}</TableHead>
                                <TableHead className="text-sm font-semibold text-text-secondary">{labelsConstants.tableType}</TableHead>
                                <TableHead
                                    className="
                                        text-right
                                        text-sm
                                        font-semibold
                                        text-text-secondary
                                    "
                                >
                                    {labelsConstants.tableActions}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSuperAdmins.map((admin) => {
                                const {
                                    admins,
                                    email,
                                    id,
                                    name,
                                    region,
                                    type,
                                } = admin;

                                const isExpanded = expandedAdminId === id;

                                return (
                                    <>
                                        <TableRow key={id}>
                                            <TableCell className="text-sm text-text-dark">{name}</TableCell>
                                            <TableCell className="text-sm text-text-dark">{email}</TableCell>
                                            <TableCell className="text-sm text-text-dark">{region}</TableCell>
                                            <TableCell>
                                                <Badge variant={BadgeVariantEnum.SECONDARY}>{type}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        justify-end
                                                        gap-0.5
                                                    "
                                                >
                                                    <Button
                                                        variant={ButtonVariantEnum.ICON}
                                                        onClick={() => {}}
                                                    >
                                                        <Shield className="size-4" />
                                                    </Button>
                                                    <Button
                                                        variant={ButtonVariantEnum.ICON}
                                                        onClick={() => {}}
                                                    >
                                                        <Pencil className="size-4" />
                                                    </Button>
                                                    <Button
                                                        variant={ButtonVariantEnum.ICON}
                                                        onClick={() => {}}
                                                    >
                                                        <Pause className="size-4" />
                                                    </Button>
                                                    <Button
                                                        variant={ButtonVariantEnum.ICON}
                                                        onClick={() => deleteSuperAdminHandler(id)}
                                                    >
                                                        <Trash2 className="size-4 text-error" />
                                                    </Button>
                                                    <Button
                                                        variant={ButtonVariantEnum.ICON}
                                                        onClick={() => toggleExpandHandler(id)}
                                                    >
                                                        {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            key={`${id}-admins`}
                                            className={generateClassNameHandler(
                                                "border-0",
                                                !isExpanded && "hidden",
                                            )}
                                        >
                                            <TableCell
                                                className="bg-accent/50 p-4"
                                                colSpan={5}
                                            >
                                                <div className="flex flex-col gap-2">
                                                    <h4 className="text-sm font-semibold text-text-dark">{labelsConstants.admins}</h4>
                                                    {admins.length === 0 && <p className="text-xs text-text-muted">{labelsConstants.noAdmins}</p>}
                                                    {admins.map(({
                                                        email,
                                                        id,
                                                        name,
                                                    }) => (
                                                        <div
                                                            key={id}
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
                                                            <span className="text-sm text-text-dark">{name}</span>
                                                            <span className="text-xs text-text-muted">{email}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            )
            }
        </div>
    );
};
