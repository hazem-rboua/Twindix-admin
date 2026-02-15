import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "yup";

import { Alert, Button, Input } from "@/atoms";
import { buttonsConstants, labelsConstants, msgsConstants } from "@/constants";
import { routesData } from "@/data";
import {
    AlertVariantEnum,
    ButtonTypeEnum,
    ButtonVariantEnum,
    InputEnum,
} from "@/enums";
import { forgotPasswordAuthSchema } from "@/schemas";
import { authService } from "@/services";

export const ForgotPasswordAuthView = () => {
    const [email, setEmail] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();

        setError("");

        try {
            await forgotPasswordAuthSchema.validate({ email });
        } catch (err) {
            if (err instanceof ValidationError) setError(err.message);

            return;
        }

        setIsLoading(true);

        try {
            await authService.forgotPasswordHandler(email);

            setIsSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : msgsConstants.genericError);
        } finally {
            setIsLoading(false);
        }
    };

    const backToLoginHandler = () => navigate(routesData.login);

    if (isSuccess) {
        return (
            <div>
                <Alert
                    className="mb-6"
                    variant={AlertVariantEnum.SUCCESS}
                >
                    {msgsConstants.forgotPasswordSuccess}
                </Alert>
                <Button
                    variant={ButtonVariantEnum.LINK}
                    onClick={backToLoginHandler}
                >
                    {buttonsConstants.backToLogin}
                </Button>
            </div>
        );
    }

    return (
        <div>
            {error && (
                <Alert
                    className="mb-6"
                    variant={AlertVariantEnum.ERROR}
                    onClose={() => setError("")}
                >
                    {error}
                </Alert>
            )}
            <form
                className="space-y-5"
                onSubmit={submitHandler}
            >
                <Input
                    hasError={!!error}
                    label={labelsConstants.email}
                    placeholder={labelsConstants.emailPlaceholder}
                    type={InputEnum.EMAIL}
                    value={email}
                    onChange={(value) => {
                        setEmail(value);

                        setError("");
                    }}
                />
                <Button
                    isLoading={isLoading}
                    type={ButtonTypeEnum.SUBMIT}
                    isFullWidth
                >
                    {buttonsConstants.sendResetLink}
                </Button>
            </form>
            <div className="mt-4 text-center">
                <Button
                    variant={ButtonVariantEnum.LINK}
                    onClick={backToLoginHandler}
                >
                    {buttonsConstants.backToLogin}
                </Button>
            </div>
        </div>
    );
};
