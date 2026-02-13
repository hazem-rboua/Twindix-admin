import { apisData } from "@/data";
import type { LoginResponseType } from "@/types";
import { axiosClient } from "@/utils";

export const authService = {
    forgotPasswordHandler: async (email: string): Promise<void> => {
        await axiosClient.post(
            apisData.forgotPassword,
            { email },
        );
    },
    loginHandler: async (email: string, password: string): Promise<LoginResponseType> => {
        const { data } = await axiosClient.post<LoginResponseType>(
            apisData.login,
            {
                email,
                password,
            },
        );

        return data;
    },
    resetPasswordHandler: async (
        token: string,
        email: string,
        password: string,
        passwordConfirmation: string,
    ): Promise<void> => {
        await axiosClient.post(
            apisData.resetPassword,
            {
                email,
                password,
                passwordConfirmation,
                token,
            },
        );
    },
};
