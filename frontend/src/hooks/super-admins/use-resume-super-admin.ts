import { useState } from "react";
import { toast } from "sonner";

import { msgsConstants } from "@/constants";
import { superAdminsService } from "@/services";

export const useResumeSuperAdmin = () => {
    const [isLoading, setIsLoading] = useState(false);

    const resumeHandler = async (id: number): Promise<boolean> => {
        try {
            setIsLoading(true);

            await superAdminsService.resumeHandler(id);

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
        isLoading,
        resumeHandler,
    };
};
