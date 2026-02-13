import { object, ref, string } from "yup";

import { msgsConstants } from "@/constants";

const minPasswordLengthResetPasswordAuthSchema = 8;

export const resetPasswordAuthSchema = object({
    confirmPassword: string().required(msgsConstants.passwordRequired).oneOf(
        [ref("password")],
        msgsConstants.passwordMismatch,
    ),
    password: string().required(msgsConstants.passwordRequired).min(
        minPasswordLengthResetPasswordAuthSchema,
        msgsConstants.passwordMinLength,
    ),
});
