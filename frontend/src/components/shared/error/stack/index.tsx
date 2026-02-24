import { useNavigate } from "react-router-dom";

import { Button, Logo } from "@/atoms";
import { buttonsConstants, msgsConstants } from "@/constants";
import { routesData } from "@/data";
import { ButtonVariantEnum, LogoSizeEnum } from "@/enums";

export const StackError = ({ errorMessage }: { errorMessage: string }) => {
    const navigate = useNavigate();

    const navigateHomeHandler = () => navigate(routesData.home);

    const reloadHandler = () => window.location.reload();

    return (
        <div
            className="
                flex
                min-h-screen
                flex-col
                items-center
                justify-center
                gap-6
                bg-background
                p-4
            "
        >
            <Logo size={LogoSizeEnum.LG} />
            <div
                className="
                    flex
                    flex-col
                    items-center
                    gap-3
                "
            >
                <h1 className="text-gradient text-4xl font-bold">{msgsConstants.errorTitle}</h1>
                <p
                    className="
                        max-w-md
                        text-center
                        text-sm
                        text-text-secondary
                    "
                >
                    {msgsConstants.errorDescription}
                </p>
                {errorMessage && (
                    <div
                        className="
                            mt-2
                            flex
                            max-w-md
                            flex-col
                            gap-1
                        "
                    >
                        <span className="text-xs font-medium text-text-muted">{msgsConstants.errorDetails}</span>
                        <code
                            className="
                                rounded-default
                                border
                                border-border
                                bg-accent
                                px-4
                                py-3
                                font-mono
                                text-xs
                                text-error
                            "
                        >
                            {errorMessage}
                        </code>
                    </div>
                )}
            </div>
            <div className="flex gap-3">
                <Button
                    variant={ButtonVariantEnum.OUTLINE}
                    onClick={navigateHomeHandler}
                >
                    {buttonsConstants.backToHome}
                </Button>
                <Button
                    variant={ButtonVariantEnum.PRIMARY}
                    onClick={reloadHandler}
                >
                    {buttonsConstants.tryAgain}
                </Button>
            </div>
        </div>
    );
};
