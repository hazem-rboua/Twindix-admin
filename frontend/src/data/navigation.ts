import { routesConstants, viewsConstants } from "@/constants";
import type { NavigationItemType } from "@/types";

export const navigationData: NavigationItemType[] = [
    {
        icon: "Home",
        label: viewsConstants.home,
        path: routesConstants.home,
    },
    {
        icon: "ClipboardCheck",
        label: viewsConstants.assessment,
        path: routesConstants.assessment,
    },
    {
        icon: "BarChart3",
        label: viewsConstants.benchmarks,
        path: routesConstants.benchmarks,
    },
    {
        icon: "Package",
        label: viewsConstants.packages,
        path: routesConstants.packages,
    },
    {
        icon: "LayoutTemplate",
        label: viewsConstants.templates,
        path: routesConstants.templates,
    },
    {
        icon: "ShoppingCart",
        label: viewsConstants.orders,
        path: routesConstants.orders,
    },
    {
        icon: "Users",
        label: viewsConstants.manageEnrollments,
        path: routesConstants.manageEnrollments,
    },
    {
        icon: "Percent",
        label: viewsConstants.discounts,
        path: routesConstants.discounts,
    },
    {
        icon: "BriefcaseBusiness",
        label: viewsConstants.jobTitleQuestion,
        path: routesConstants.jobTitleQuestion,
    },
    {
        icon: "Mail",
        label: viewsConstants.contact,
        path: routesConstants.contact,
    },
    {
        children: [
            {
                icon: "ShieldCheck",
                label: viewsConstants.superAdmin,
                path: routesConstants.accessControl,
            },
        ],
        icon: "Lock",
        label: viewsConstants.accessControl,
        path: routesConstants.accessControl,
    },
];
