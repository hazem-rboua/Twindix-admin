import { labelsConstants } from "@/constants";

import { routesData } from "./routes";

export const sidebarData = [
    {
        icon: "Home",
        label: labelsConstants.sidebar.home,
        path: routesData.home,
    },
    {
        icon: "ClipboardCheck",
        label: labelsConstants.sidebar.assessment,
        path: routesData.assessment,
    },
    {
        icon: "BarChart3",
        label: labelsConstants.sidebar.benchmarks,
        path: routesData.benchmarks,
    },
    {
        icon: "Package",
        label: labelsConstants.sidebar.packages,
        path: routesData.packages,
    },
    {
        icon: "LayoutTemplate",
        label: labelsConstants.sidebar.templates,
        path: routesData.templates,
    },
    {
        icon: "ShoppingCart",
        label: labelsConstants.sidebar.orders,
        path: routesData.orders,
    },
    {
        icon: "Users",
        label: labelsConstants.sidebar.manageEnrollments,
        path: routesData.manageEnrollments,
    },
    {
        icon: "Percent",
        label: labelsConstants.sidebar.discounts,
        path: routesData.discounts,
    },
    {
        icon: "BriefcaseBusiness",
        label: labelsConstants.sidebar.jobTitleQuestion,
        path: routesData.jobTitleQuestion,
    },
    {
        icon: "Mail",
        label: labelsConstants.sidebar.contact,
        path: routesData.contact,
    },
    {
        children: [
            {
                icon: "ShieldCheck",
                label: labelsConstants.sidebar.superAdmin,
                path: routesData.accessControl,
            },
        ],
        icon: "Lock",
        label: labelsConstants.sidebar.accessControl,
        path: routesData.accessControl,
    },
];
