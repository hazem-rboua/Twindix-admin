import { object, string } from "yup";

import { msgsConstants } from "@/constants";

export const forgotPasswordAuthSchema = object({ email: string().required(msgsConstants.emailRequired).email(msgsConstants.invalidEmail) });
