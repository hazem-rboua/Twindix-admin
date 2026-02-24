import { useState } from "react";
import { toast } from "sonner";

import { msgsConstants } from "@/constants";
import { superAdminsService } from "@/services";

export const useDeleteSuperAdmin = () => {
    const [isLoading, setIsLoading] = useState(false);

    const deleteHandler = async (id: number): Promise<boolean> => {
        try {
            setIsLoading(true);

            await superAdminsService.removeHandler(id);

            return true;
        } catch (error) {
            if (!navigator.onLine) throw error;
            else toast.error(msgsConstants.genericError);

            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        deleteHandler,
        isLoading,
    };
};
