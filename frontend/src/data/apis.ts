export const apisData = {
    auth: {
        forgotPassword: "/auth/forgot-password",
        login: "/auth/login",
        me: "/auth/me",
        refresh: "/auth/refresh",
        resetPassword: "/auth/reset-password",
    },
    baseUrl: import.meta.env.VITE_API_URL,
    countries: { list: "/countries" },
    regions: {
        create: "/regions",
        getById: (id: number) => `/regions/${id}`,
        list: "/regions",
        remove: (id: number) => `/regions/${id}`,
        update: (id: number) => `/regions/${id}`,
    },
    superAdmins: {
        create: "/super-admins",
        createAdmin: "/admins",
        getById: (id: number) => `/super-admins/${id}`,
        list: "/super-admins",
        pause: (id: number) => `/super-admins/${id}/pause`,
        remove: (id: number) => `/super-admins/${id}`,
        resume: (id: number) => `/super-admins/${id}/resume`,
        update: (id: number) => `/super-admins/${id}`,
    },
};
