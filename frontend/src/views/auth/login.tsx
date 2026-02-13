import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "yup";

import { Alert, Button, Input } from "@/atoms";
import { buttonsConstants, labelsConstants } from "@/constants";
import { routesData } from "@/data";
import {
    AlertVariantEnum,
    ButtonSizeEnum,
    ButtonTypeEnum,
    ButtonVariantEnum,
    InputTypeEnum,
} from "@/enums";
import { useAuth } from "@/hooks";
import { loginAuthSchema } from "@/schemas";

export const LoginAuthView = () => {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [validationError, setValidationError] = useState("");

    const navigate = useNavigate();

    const {
        error,
        isLoading,
        onClearError,
        onLogin,
    } = useAuth();

    const displayError = validationError || error;

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();

        setValidationError("");

        onClearError();

        try {
            await loginAuthSchema.validate({
                email,
                password,
            });
        } catch (err) {
            if (err instanceof ValidationError) setValidationError(err.message);

            return;
        }

        try {
            await onLogin(
                email,
                password,
            );
        } catch {
            // Error is handled by the auth provider
        }
    };

    const dismissErrorHandler = () => {
        setValidationError("");

        onClearError();
    };

    return (
        <div>
            {displayError && (
                <Alert
                    className="mb-6"
                    variant={AlertVariantEnum.ERROR}
                    onClose={dismissErrorHandler}
                >
                    {displayError}
                </Alert>
            )}
            <form
                className="space-y-5"
                onSubmit={submitHandler}
            >
                <Input
                    hasError={!!displayError}
                    label={labelsConstants.email}
                    placeholder={labelsConstants.emailPlaceholder}
                    type={InputTypeEnum.EMAIL}
                    value={email}
                    onChange={(value) => {
                        setEmail(value);

                        setValidationError("");
                    }}
                />
                <Input
                    hasError={!!displayError}
                    label={labelsConstants.password}
                    placeholder={labelsConstants.passwordPlaceholder}
                    type={InputTypeEnum.PASSWORD}
                    value={password}
                    isShowPasswordToggle
                    onChange={(value) => {
                        setPassword(value);

                        setValidationError("");
                    }}
                />
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        text-sm
                    "
                >
                    <span className="text-text-secondary">{labelsConstants.forgotPassword}</span>
                    <Button
                        size={ButtonSizeEnum.SM}
                        type={ButtonTypeEnum.BUTTON}
                        variant={ButtonVariantEnum.LINK}
                        onClick={() => navigate(routesData.forgotPassword)}
                    >
                        {buttonsConstants.forgotPasswordLink}
                    </Button>
                </div>
                <Button
                    isLoading={isLoading}
                    type={ButtonTypeEnum.SUBMIT}
                    isFullWidth
                >
                    {buttonsConstants.signIn}
                </Button>
            </form>
        </div>
    );
};
