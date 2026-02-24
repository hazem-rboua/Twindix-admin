import {
    ChevronDown,
    ChevronUp,
    Pencil,
    Trash2,
} from "lucide-react";
import { useState } from "react";

import { Badge, Button, Loader } from "@/atoms";
import { Header } from "@/components";
import { buttonsConstants, labelsConstants, titlesConstants } from "@/constants";
import { BadgeVariantEnum, ButtonVariantEnum } from "@/enums";
import { useDeleteRegion, useRegionsList } from "@/hooks";
import { generateClassNameHandler } from "@/utils";

export const RegionsAccessControlView = () => {
    const [expandedRegionId, setExpandedRegionId] = useState<number | null>(null);

    const {
        data: regions,
        isLoading,
        refetchHandler,
    } = useRegionsList();

    const { deleteHandler } = useDeleteRegion();

    const toggleExpandHandler = (id: number) => setExpandedRegionId((prev) => (prev === id ? null : id));

    return (
        <div
            className="
                flex
                flex-col
                gap-4
                md:gap-6
            "
        >
            <Header title={titlesConstants.regions} />
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-text-dark">{labelsConstants.allRegions}</h2>
                    <Button variant={ButtonVariantEnum.PRIMARY}>{buttonsConstants.add}</Button>
                </div>
                {isLoading && <Loader />}
                {!isLoading && regions.length === 0 && <p className="text-sm text-text-muted">{labelsConstants.noRegions}</p>}
                {regions.map((region) => {
                    const {
                        countries,
                        id,
                        name,
                        super_admins: superAdmins, // eslint-disable-line code-style/variable-naming-convention -- Backend response field
                    } = region;

                    const isExpanded = expandedRegionId === id;

                    return (
                        <div
                            key={id}
                            className="
                                overflow-hidden
                                rounded-default
                                border
                                border-border
                                bg-surface
                                shadow-sm
                            "
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    bg-primary/10
                                    px-4
                                    py-3
                                "
                            >
                                <span className="text-sm font-semibold text-primary">{name}</span>
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant={ButtonVariantEnum.ICON}
                                        onClick={() => {}}
                                    >
                                        <Pencil className="size-4" />
                                    </Button>
                                    <Button
                                        variant={ButtonVariantEnum.ICON}
                                        onClick={async () => {
                                            const isSuccess = await deleteHandler(id);

                                            if (isSuccess) await refetchHandler();
                                        }}
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
                            </div>
                            <div
                                className={generateClassNameHandler(
                                    "overflow-hidden transition-all duration-200",
                                    isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
                                )}
                            >
                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-4
                                        p-4
                                    "
                                >
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-sm font-semibold text-text-dark">
                                            {labelsConstants.countries}
                                            {" ("}
                                            {countries.length}
                                            {")"}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {countries.length === 0 && <p className="text-xs text-text-muted">{labelsConstants.noCountries}</p>}
                                            {countries.map(({
                                                id,
                                                name,
                                            }) => (
                                                <Badge
                                                    key={id}
                                                    variant={BadgeVariantEnum.SECONDARY}
                                                >
                                                    {name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-sm font-semibold text-text-dark">{labelsConstants.superAdmins}</h3>
                                        {superAdmins.length === 0 && <p className="text-xs text-text-muted">{labelsConstants.noSuperAdminsAssigned}</p>}
                                        {superAdmins.map(({
                                            email,
                                            id,
                                            name,
                                            user_type: userType, // eslint-disable-line code-style/variable-naming-convention -- Backend response field
                                        }) => (
                                            <div
                                                key={id}
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    rounded-default
                                                    bg-accent
                                                    px-3
                                                    py-2
                                                "
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-text-dark">{name}</span>
                                                    <span className="text-xs text-text-muted">{email}</span>
                                                </div>
                                                <Badge variant={BadgeVariantEnum.OUTLINE}>{userType}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
