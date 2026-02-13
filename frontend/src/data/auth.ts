import { descriptionsConstants, titlesConstants } from "@/constants";

import { routesData } from "./routes";

export const layoutAuthData = {
    [routesData.forgotPassword]: {
        description: descriptionsConstants.forgotPassword,
        sidebarDescription: descriptionsConstants.forgotPasswordSidebar,
        sidebarTitle: titlesConstants.forgotPasswordSidebar,
        title: titlesConstants.forgotPassword,
    },
    [routesData.login]: {
        description: descriptionsConstants.login,
        sidebarDescription: descriptionsConstants.loginSidebar,
        sidebarTitle: titlesConstants.loginSidebar,
        title: titlesConstants.login,
    },
    [routesData.resetPassword]: {
        description: descriptionsConstants.resetPassword,
        sidebarDescription: descriptionsConstants.resetPasswordSidebar,
        sidebarTitle: titlesConstants.resetPasswordSidebar,
        title: titlesConstants.resetPassword,
    },
};
