import { apisData } from "@/data";
import type { CountryInterface, CountryListResponseInterface } from "@/interfaces";
import { axiosClient } from "@/utils";

export const countriesService = {
    listHandler: async (): Promise<CountryInterface[]> => {
        const { data } = await axiosClient.get<CountryListResponseInterface>(apisData.countries.list);

        return data.data;
    },
};
