import { createBrowserRouter } from "react-router-dom";

import { routesData } from "@/data";
import { AuthLayout, DashboardLayout } from "@/layouts";
import {
    AccessControlView,
    AssessmentsView,
    BenchmarksView,
    ContactView,
    DiscountsView,
    ForgotPasswordAuthView,
    HomeView,
    JobTitleQuestionView,
    LoginAuthView,
    ManageEnrollmentsView,
    OrdersView,
    PackagesView,
    ProfileView,
    ResetPasswordAuthView,
    TemplatesView,
} from "@/views";

import { ProtectedRoute } from "./protected";
import { PublicRoute } from "./public";

export const router = createBrowserRouter([
    {
        children: [
            {
                children: [
                    {
                        element: <HomeView />,
                        index: true,
                    },
                    {
                        element: <AccessControlView />,
                        path: routesData.accessControl,
                    },
                    {
                        element: <AssessmentsView />,
                        path: routesData.assessment,
                    },
                    {
                        element: <BenchmarksView />,
                        path: routesData.benchmarks,
                    },
                    {
                        element: <ContactView />,
                        path: routesData.contact,
                    },
                    {
                        element: <DiscountsView />,
                        path: routesData.discounts,
                    },
                    {
                        element: <JobTitleQuestionView />,
                        path: routesData.jobTitleQuestion,
                    },
                    {
                        element: <ManageEnrollmentsView />,
                        path: routesData.manageEnrollments,
                    },
                    {
                        element: <OrdersView />,
                        path: routesData.orders,
                    },
                    {
                        element: <PackagesView />,
                        path: routesData.packages,
                    },
                    {
                        element: <ProfileView />,
                        path: routesData.profile,
                    },
                    {
                        element: <TemplatesView />,
                        path: routesData.templates,
                    },
                ],
                element: <DashboardLayout />,
                path: routesData.home,
            },
        ],
        element: <ProtectedRoute />,
    },
    {
        children: [
            {
                children: [
                    {
                        element: <LoginAuthView />,
                        path: routesData.login,
                    },
                    {
                        element: <ForgotPasswordAuthView />,
                        path: routesData.forgotPassword,
                    },
                    {
                        element: <ResetPasswordAuthView />,
                        path: routesData.resetPassword,
                    },
                ],
                element: <AuthLayout />,
            },
        ],
        element: <PublicRoute />,
    },
]);
