import { useContext } from "react";

import { msgsConstants } from "@/constants";
import { AuthContext } from "@/contexts";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error(msgsConstants.authProviderRequired);

    return context;
};
