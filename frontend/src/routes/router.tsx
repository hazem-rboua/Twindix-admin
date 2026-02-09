import { createBrowserRouter } from "react-router-dom";

import { routesConstants } from "@/constants";
import { AuthLayout, DashboardLayout } from "@/layouts";
import {
    AccessControlView,
    AssessmentsView,
    BenchmarksView,
    ContactView,
    DiscountsView,
    ForgetPasswordView,
    HomeView,
    JobTitleQuestionView,
    LoginView,
    ManageEnrollmentsView,
    OrdersView,
    PackagesView,
    TemplatesView,
} from "@/views";

export const router = createBrowserRouter([
    {
        children: [
            {
                element: <HomeView />,
                index: true,
            },
            {
                element: <AccessControlView />,
                path: routesConstants.accessControl,
            },
            {
                element: <AssessmentsView />,
                path: routesConstants.assessment,
            },
            {
                element: <BenchmarksView />,
                path: routesConstants.benchmarks,
            },
            {
                element: <ContactView />,
                path: routesConstants.contact,
            },
            {
                element: <DiscountsView />,
                path: routesConstants.discounts,
            },
            {
                element: <JobTitleQuestionView />,
                path: routesConstants.jobTitleQuestion,
            },
            {
                element: <ManageEnrollmentsView />,
                path: routesConstants.manageEnrollments,
            },
            {
                element: <OrdersView />,
                path: routesConstants.orders,
            },
            {
                element: <PackagesView />,
                path: routesConstants.packages,
            },
            {
                element: <TemplatesView />,
                path: routesConstants.templates,
            },
        ],
        element: <DashboardLayout />,
        path: routesConstants.home,
    },
    {
        children: [
            {
                element: <LoginView />,
                path: routesConstants.login,
            },
            {
                element: <ForgetPasswordView />,
                path: routesConstants.forgetPassword,
            },
        ],
        element: <AuthLayout />,
    },
]);
