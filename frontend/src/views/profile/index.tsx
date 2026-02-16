import { Avatar } from "@/atoms";
import { Header } from "@/components";
import { labelsConstants, titlesConstants } from "@/constants";
import { AvatarSizeEnum } from "@/enums";
import { useAuth } from "@/hooks";

export const ProfileView = () => {
    const { user } = useAuth();

    const name = user?.name ?? labelsConstants.name;

    const email = user?.email ?? labelsConstants.emailExample;

    const role = user?.roles?.[0] ?? labelsConstants.adminRole;

    return (
        <div
            className="
                flex
                flex-col
                gap-4
                md:gap-6
            "
        >
            <Header title={titlesConstants.profile} />
            <div
                className="
                    flex
                    flex-col
                    items-center
                    gap-4
                    rounded-default
                    bg-surface
                    p-6
                    shadow-sm
                    md:p-8
                "
            >
                <Avatar
                    size={AvatarSizeEnum.LG}
                    fallback={name.slice(
                        0,
                        2,
                    ).toUpperCase()}
                />
                <div
                    className="
                        flex
                        flex-col
                        items-center
                        gap-1
                    "
                >
                    <h2 className="text-lg font-bold text-primary">{name}</h2>
                    <p className="text-sm text-text-secondary">{email}</p>
                </div>
                <span
                    className="
                        rounded-full
                        bg-accent
                        px-4
                        py-1.5
                        text-xs
                        font-semibold
                        text-primary
                    "
                >
                    {role}
                </span>
            </div>
        </div>
    );
};
