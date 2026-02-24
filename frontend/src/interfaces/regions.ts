import type { CountryInterface } from "./common";
import type { SuperAdminInterface } from "./super-admins";

export interface RegionInterface {
    countries: CountryInterface[],
    id: number,
    name: string,
    super_admins: SuperAdminInterface[], // eslint-disable-line code-style/interface-format -- Backend response field
}

export interface RegionListResponseInterface {
    data: RegionInterface[],
    isSuccess: boolean,
}
