import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ValidationError } from "yup";

import { Alert, Button, Input } from "@/atoms";
import { buttonsConstants, labelsConstants, msgsConstants } from "@/constants";
import { commonData, routesData } from "@/data";
import {
    AlertVariantEnum,
    ButtonTypeEnum,
    ButtonVariantEnum,
    InputEnum,
} from "@/enums";
import { resetPasswordAuthSchema } from "@/schemas";
import { authService } from "@/services";

export const ResetPasswordAuthView = () => {
    const [token, setToken] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();

        setError("");

        if (!token || !email) {
            setError(msgsConstants.invalidResetLink);

            return;
        }

        try {
            await resetPasswordAuthSchema.validate({
                confirmPassword,
                password,
            });
        } catch (err) {
            if (err instanceof ValidationError) setError(err.message);

            return;
        }

        setIsLoading(true);

        try {
            await authService.resetPasswordHandler(
                token,
                email,
                password,
                confirmPassword,
            );

            setIsSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : msgsConstants.genericError);
        } finally {
            setIsLoading(false);
        }
    };

    const backToLoginHandler = () => navigate(routesData.login);

    useEffect(
        () => {
            const tokenParam = searchParams.get(commonData.queryParams.token);

            const emailParam = searchParams.get(commonData.queryParams.email);

            if (tokenParam) setToken(tokenParam);

            if (emailParam) setEmail(emailParam);
        },
        [searchParams],
    );

    if (isSuccess) {
        return (
            <div>
                <Alert
                    className="mb-6"
                    variant={AlertVariantEnum.SUCCESS}
                >
                    {msgsConstants.resetPasswordSuccess}
                </Alert>
                <Button
                    isFullWidth
                    onClick={backToLoginHandler}
                >
                    {buttonsConstants.goToLogin}
                </Button>
            </div>
        );
    }

    if (!token || !email) {
        return (
            <div>
                <Alert
                    className="mb-6"
                    variant={AlertVariantEnum.ERROR}
                >
                    {msgsConstants.invalidResetLink}
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
                    label={labelsConstants.newPassword}
                    placeholder={labelsConstants.newPasswordPlaceholder}
                    type={InputEnum.PASSWORD}
                    value={password}
                    isShowPasswordToggle
                    onChange={(value) => {
                        setPassword(value);

                        setError("");
                    }}
                />
                <Input
                    hasError={!!error}
                    label={labelsConstants.confirmPassword}
                    placeholder={labelsConstants.confirmPasswordPlaceholder}
                    type={InputEnum.PASSWORD}
                    value={confirmPassword}
                    isShowPasswordToggle
                    onChange={(value) => {
                        setConfirmPassword(value);

                        setError("");
                    }}
                />
                <Button
                    isLoading={isLoading}
                    type={ButtonTypeEnum.SUBMIT}
                    isFullWidth
                >
                    {buttonsConstants.resetPassword}
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
