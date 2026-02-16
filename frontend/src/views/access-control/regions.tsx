import {
    ChevronDown,
    ChevronUp,
    Pencil,
    Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Badge, Button } from "@/atoms";
import { Header } from "@/components";
import { buttonsConstants, labelsConstants, titlesConstants } from "@/constants";
import { routesData } from "@/data";
import { BadgeVariantEnum, ButtonVariantEnum } from "@/enums";
import type { RegionInterface } from "@/interfaces";
import { regionsService } from "@/services";
import { generateClassNameHandler } from "@/utils";

export const RegionsAccessControlView = () => {
    const [expandedRegionId, setExpandedRegionId] = useState<number | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const [regions, setRegions] = useState<RegionInterface[]>([]);

    const navigate = useNavigate();

    const fetchRegionsHandler = async () => {
        try {
            setIsLoading(true);

            const data = await regionsService.listHandler();

            setRegions(data);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteRegionHandler = async (regionId: number) => {
        await regionsService.removeHandler(regionId);

        setRegions((prev) => prev.filter(({ id }) => id !== regionId));
    };

    const toggleExpandHandler = (id: number) => setExpandedRegionId((prev) => (prev === id ? null : id));

    const navigateBackHandler = () => navigate(routesData.accessControl);

    useEffect(
        () => void fetchRegionsHandler(),
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
                title={titlesConstants.regions}
                actions={(
                    <Button variant={ButtonVariantEnum.PRIMARY}>{buttonsConstants.addRegion}</Button>
                )}
                hasBackButton
                onBackClick={navigateBackHandler}
            />
            <div className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-text-dark">{labelsConstants.allRegions}</h2>
                {isLoading && <p className="text-sm text-text-muted">{labelsConstants.searchPlaceholder}</p>}
                {!isLoading && regions.length === 0 && <p className="text-sm text-text-muted">{labelsConstants.noRegions}</p>}
                {regions.map((region) => {
                    const {
                        countries,
                        id,
                        name,
                        superAdmins,
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
                                        onClick={() => deleteRegionHandler(id)}
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
                                            type,
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
                                                <Badge variant={BadgeVariantEnum.OUTLINE}>{type}</Badge>
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
