import { object, string } from "yup";

import { msgsConstants } from "@/constants";

const minPasswordLengthLoginAuthSchema = 8;

export const loginAuthSchema = object({
    email: string().required(msgsConstants.emailRequired).email(msgsConstants.invalidEmail),
    password: string().required(msgsConstants.passwordRequired).min(
        minPasswordLengthLoginAuthSchema,
        msgsConstants.passwordMinLength,
    ),
});
