import { useNavigate } from "react-router-dom";

import { Button, Logo } from "@/atoms";
import { buttonsConstants, msgsConstants, titlesConstants } from "@/constants";
import { routesData } from "@/data";
import { ButtonVariantEnum, LogoSizeEnum } from "@/enums";

export const NotFoundView = () => {
    const navigate = useNavigate();

    const navigateHomeHandler = () => navigate(routesData.home);

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
                <h1 className="text-gradient text-8xl font-bold">{titlesConstants.code404}</h1>
                <h2 className="text-xl font-semibold text-text-dark">{msgsConstants.notFoundTitle}</h2>
                <p
                    className="
                        max-w-md
                        text-center
                        text-sm
                        text-text-secondary
                    "
                >
                    {msgsConstants.notFoundDescription}
                </p>
            </div>
            <Button
                variant={ButtonVariantEnum.PRIMARY}
                onClick={navigateHomeHandler}
            >
                {buttonsConstants.backToHome}
            </Button>
        </div>
    );
};
