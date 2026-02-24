export interface CreateAdminInterface {
    email: string,
    name: string,
    superAdminId: number,
}

export interface AdminInterface {
    created_at: string, // eslint-disable-line code-style/interface-format -- Backend response field
    email: string,
    email_verified_at: string | null, // eslint-disable-line code-style/interface-format -- Backend response field
    id: number,
    managed_by: string | null, // eslint-disable-line code-style/interface-format -- Backend response field
    name: string,
    region_id: string, // eslint-disable-line code-style/interface-format -- Backend response field
    status: string,
    updated_at: string, // eslint-disable-line code-style/interface-format -- Backend response field
    user_sub_type_id: string | null, // eslint-disable-line code-style/interface-format -- Backend response field
    user_type_id: string | null, // eslint-disable-line code-style/interface-format -- Backend response field
}

export interface CreateSuperAdminInterface {
    email: string,
    name: string,
    regionId: number,
    type: string,
}

export interface SuperAdminInterface {
    created_at: string, // eslint-disable-line code-style/interface-format -- Backend response field
    email: string,
    email_verified_at: string | null, // eslint-disable-line code-style/interface-format -- Backend response field
    id: number,
    managed_by: string | null, // eslint-disable-line code-style/interface-format -- Backend response field
    name: string,
    region: SuperAdminRegionInterface,
    region_id: string, // eslint-disable-line code-style/interface-format -- Backend response field
    status: string,
    subordinates: AdminInterface[],
    updated_at: string, // eslint-disable-line code-style/interface-format -- Backend response field
    user_sub_type: string | null, // eslint-disable-line code-style/interface-format -- Backend response field
    user_sub_type_id: string | null, // eslint-disable-line code-style/interface-format -- Backend response field
    user_type: string | null, // eslint-disable-line code-style/interface-format -- Backend response field
    user_type_id: string | null, // eslint-disable-line code-style/interface-format -- Backend response field
}

export interface SuperAdminListResponseInterface {
    data: SuperAdminInterface[],
    isSuccess: boolean,
}

export interface SuperAdminRegionInterface {
    code: string,
    created_at: string, // eslint-disable-line code-style/interface-format -- Backend response field
    description: string,
    id: number,
    name: string,
    updated_at: string, // eslint-disable-line code-style/interface-format -- Backend response field
}
