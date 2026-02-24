import { createBrowserRouter } from "react-router-dom";

import { routesData } from "@/data";
import { AuthLayout, DashboardLayout } from "@/layouts";
import {
    AssessmentsView,
    BenchmarksView,
    ContactView,
    DiscountsView,
    ErrorView,
    ForgotPasswordAuthView,
    HomeView,
    JobTitleQuestionsView,
    LoginAuthView,
    ManageEnrollmentsView,
    NotFoundView,
    OrdersView,
    PackagesView,
    PermissionsAccessControlView,
    ProfileView,
    RegionsAccessControlView,
    ResetPasswordAuthView,
    SuperAdminsAccessControlView,
    TemplatesView,
    TypesAccessControlView,
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
                        element: <PermissionsAccessControlView />,
                        path: routesData.accessControlPermissions,
                    },
                    {
                        element: <RegionsAccessControlView />,
                        path: routesData.accessControlRegions,
                    },
                    {
                        element: <SuperAdminsAccessControlView />,
                        path: routesData.accessControlSuperAdmins,
                    },
                    {
                        element: <TypesAccessControlView />,
                        path: routesData.accessControlTypes,
                    },
                    {
                        element: <AssessmentsView />,
                        path: routesData.assessments,
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
                        element: <JobTitleQuestionsView />,
                        path: routesData.jobTitleQuestions,
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
                errorElement: <ErrorView />,
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
                errorElement: <ErrorView />,
            },
        ],
        element: <PublicRoute />,
    },
    {
        element: <NotFoundView />,
        path: "*",
    },
]);
