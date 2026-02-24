import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { msgsConstants } from "@/constants";
import type { RegionInterface } from "@/interfaces";
import { regionsService } from "@/services";
import { useNetworkErrorStore } from "@/store";

export const useRegionsList = () => {
    const hasFetchedRef = useRef(false);

    const [data, setData] = useState<RegionInterface[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const onSetNetworkError = useNetworkErrorStore(({ onSetNetworkError }) => onSetNetworkError);

    const fetchHandler = async () => {
        try {
            setIsLoading(true);

            const result = await regionsService.listHandler();

            setData(result);
        } catch {
            if (!navigator.onLine) onSetNetworkError();
            else toast.error(msgsConstants.genericError);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(
        () => {
            if (hasFetchedRef.current) return;

            hasFetchedRef.current = true;

            void fetchHandler();
        },
        [],
    );

    return {
        data,
        isLoading,
        refetchHandler: fetchHandler,
    };
};
