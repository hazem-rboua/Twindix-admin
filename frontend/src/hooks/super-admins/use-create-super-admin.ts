import { useState } from "react";
import { toast } from "sonner";

import { msgsConstants } from "@/constants";
import type { CreateSuperAdminInterface, SuperAdminInterface } from "@/interfaces";
import { superAdminsService } from "@/services";

export const useCreateSuperAdmin = () => {
    const [isLoading, setIsLoading] = useState(false);

    const createHandler = async (superAdminData: CreateSuperAdminInterface): Promise<SuperAdminInterface | null> => {
        try {
            setIsLoading(true);

            const result = await superAdminsService.createHandler(superAdminData);

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
        createHandler,
        isLoading,
    };
};
