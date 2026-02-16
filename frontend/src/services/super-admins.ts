import { apisData } from "@/data";
import type {
    AdminCreateInterface,
    SuperAdminCreateInterface,
    SuperAdminInterface,
    SuperAdminListResponseInterface,
} from "@/interfaces";
import { axiosClient } from "@/utils";

export const superAdminsService = {
    createAdminHandler: async (adminData: AdminCreateInterface): Promise<void> => {
        await axiosClient.post(
            apisData.superAdmins.createAdmin,
            adminData,
        );
    },
    createHandler: async (superAdminData: SuperAdminCreateInterface): Promise<SuperAdminInterface> => {
        const { data } = await axiosClient.post<{ data: SuperAdminInterface }>(
            apisData.superAdmins.create,
            superAdminData,
        );

        return data.data;
    },
    getByIdHandler: async (id: number): Promise<SuperAdminInterface> => {
        const { data } = await axiosClient.get<{ data: SuperAdminInterface }>(apisData.superAdmins.getById(id));

        return data.data;
    },
    listHandler: async (): Promise<SuperAdminInterface[]> => {
        const { data } = await axiosClient.get<SuperAdminListResponseInterface>(apisData.superAdmins.list);

        return data.data;
    },
    pauseHandler: async (id: number): Promise<void> => await axiosClient.post(apisData.superAdmins.pause(id)),
    removeHandler: async (id: number): Promise<void> => await axiosClient["delete"](apisData.superAdmins.remove(id)), // eslint-disable-line code-style/no-hardcoded-strings -- axios method
    resumeHandler: async (id: number): Promise<void> => await axiosClient.post(apisData.superAdmins.resume(id)),
    updateHandler: async (id: number, superAdminData: SuperAdminCreateInterface): Promise<SuperAdminInterface> => {
        const { data } = await axiosClient.put<{ data: SuperAdminInterface }>(
            apisData.superAdmins.update(id),
            superAdminData,
        );

        return data.data;
    },
};
