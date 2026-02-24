import { useState } from "react";
import { toast } from "sonner";

import { msgsConstants } from "@/constants";
import type { CreateSuperAdminInterface, SuperAdminInterface } from "@/interfaces";
import { superAdminsService } from "@/services";

export const useUpdateSuperAdmin = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateHandler = async (id: number, superAdminData: CreateSuperAdminInterface): Promise<SuperAdminInterface | null> => {
        try {
            setIsLoading(true);

            const result = await superAdminsService.updateHandler(
                id,
                superAdminData,
            );

            return result;
        } catch (error) {
            if (!navigator.onLine) throw error;
            else toast.error(msgsConstants.genericError);

            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        updateHandler,
    };
};
