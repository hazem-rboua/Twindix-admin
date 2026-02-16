import { apisData } from "@/data";
import type { RegionInterface, RegionListResponseInterface } from "@/interfaces";
import { axiosClient } from "@/utils";

export const regionsService = {
    createHandler: async (name: string): Promise<RegionInterface> => {
        const { data } = await axiosClient.post<{ data: RegionInterface }>(
            apisData.regions.create,
            { name },
        );

        return data.data;
    },
    getByIdHandler: async (id: number): Promise<RegionInterface> => {
        const { data } = await axiosClient.get<{ data: RegionInterface }>(apisData.regions.getById(id));

        return data.data;
    },
    listHandler: async (): Promise<RegionInterface[]> => {
        const { data } = await axiosClient.get<RegionListResponseInterface>(apisData.regions.list);

        return data.data;
    },
    removeHandler: async (id: number): Promise<void> => await axiosClient["delete"](apisData.regions.remove(id)), // eslint-disable-line code-style/no-hardcoded-strings -- axios method
    updateHandler: async (id: number, name: string): Promise<RegionInterface> => {
        const { data } = await axiosClient.put<{ data: RegionInterface }>(
            apisData.regions.update(id),
            { name },
        );

        return data.data;
    },
};
