import { apisData } from "@/data";
import type { LoginResponseInterface, MeResponseInterface, UserInterface } from "@/interfaces";
import { axiosClient } from "@/utils";

export const authService = {
    forgotPasswordHandler: async (email: string): Promise<void> => {
        await axiosClient.post(
            apisData.auth.forgotPassword,
            { email },
        );
    },
    loginHandler: async (email: string, password: string): Promise<LoginResponseInterface> => {
        const { data } = await axiosClient.post<LoginResponseInterface>(
            apisData.auth.login,
            {
                email,
                password,
            },
        );

        return data;
    },
    meHandler: async (): Promise<UserInterface> => {
        const { data } = await axiosClient.get<MeResponseInterface>(apisData.auth.me);

        return data.data;
    },
    resetPasswordHandler: async (
        token: string,
        email: string,
        password: string,
        passwordConfirmation: string,
    ): Promise<void> => {
        await axiosClient.post(
            apisData.auth.resetPassword,
            {
                email,
                password,
                passwordConfirmation,
                token,
            },
        );
    },
};
