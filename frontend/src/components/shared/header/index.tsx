import {
    ChevronLeft,
    LogOut,
    Menu,
    Moon,
    Search,
    Sun,
    User,
    X,
} from "lucide-react";
import type { KeyboardEvent } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Button } from "@/atoms";
import { buttonsConstants, labelsConstants } from "@/constants";
import { routesData } from "@/data";
import { AvatarSizeEnum, ButtonVariantEnum } from "@/enums";
import { useAuth, useTheme } from "@/hooks";
import { useSidebarStore } from "@/store";
import {
    DropdownMenu as UiDropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/ui";
import { generateClassNameHandler } from "@/utils";

export const Header = ({
    className,
    hasBackButton = false,
    onBackClick,
    title,
}: {
    className?: string,
    hasBackButton?: boolean,
    onBackClick?: () => void,
    title: string,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate();

    const {
        onLogout,
        user,
    } = useAuth();

    const {
        isDarkMode,
        onToggleTheme,
    } = useTheme();

    const { onToggleSidebar } = useSidebarStore();

    const expandSearchHandler = () => {
        setIsSearchExpanded(true);

        setTimeout(
            () => inputRef.current?.focus(),
            100,
        );
    };

    const collapseSearchHandler = () => {
        setIsSearchExpanded(false);

        setSearchValue("");
    };

    const searchKeyDownHandler = (event: KeyboardEvent) => {
        const { key } = event;

        if (key === labelsConstants.escapeKey) collapseSearchHandler();
    };

    return (
        <div
            className={generateClassNameHandler(
                `
                    flex
                    items-center
                    justify-between
                    gap-2
                    md:gap-4
                `,
                className,
            )}
        >
            <div
                className="
                    flex
                    items-center
                    gap-2
                    md:gap-3
                "
            >
                <Button
                    className="no-underline md:hidden"
                    variant={ButtonVariantEnum.ICON}
                    onClick={onToggleSidebar}
                >
                    <Menu className="size-5" />
                </Button>
                {hasBackButton && (
                    <Button
                        variant={ButtonVariantEnum.ICON}
                        onClick={onBackClick}
                    >
                        <ChevronLeft className="size-5" />
                    </Button>
                )}
                <h1
                    className="
                        text-gradient
                        text-xl
                        font-bold
                        md:text-2xl
                    "
                >
                    {title}
                </h1>
            </div>
            <div
                className="
                    flex
                    items-center
                    gap-2
                    md:gap-3
                "
            >
                <div
                    className="
                        flex
                        items-center
                        gap-1.5
                        rounded-full
                        bg-surface
                        px-2
                        py-1
                        shadow-sm
                        md:gap-2
                        md:px-3
                        md:py-1.5
                    "
                >
                    <div className="flex items-center">
                        <Button
                            className="no-underline"
                            variant={ButtonVariantEnum.ICON}
                            onClick={isSearchExpanded ? collapseSearchHandler : expandSearchHandler}
                        >
                            {isSearchExpanded ? <X className="size-4" /> : <Search className="size-4" />}
                        </Button>
                        <input
                            placeholder={labelsConstants.searchPlaceholder}
                            ref={inputRef}
                            value={searchValue}
                            className={generateClassNameHandler(
                                `
                                    h-8
                                    rounded-full
                                    border-none
                                    bg-accent
                                    text-sm
                                    text-text-dark
                                    outline-none
                                    placeholder:text-text-muted
                                    transition-all
                                    duration-300
                                    ease-in-out
                                `,
                                isSearchExpanded ? "w-40 px-3 opacity-100 md:w-52" : "w-0 px-0 opacity-0",
                            )}
                            onBlur={collapseSearchHandler}
                            onChange={({ target }) => setSearchValue(target.value)}
                            onKeyDown={searchKeyDownHandler}
                        />
                    </div>
                    <Button
                        className="no-underline"
                        variant={ButtonVariantEnum.ICON}
                        onClick={onToggleTheme}
                    >
                        {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
                    </Button>
                    <UiDropdownMenu>
                        <DropdownMenuTrigger
                            className="
                                flex
                                size-10
                                cursor-pointer
                                items-center
                                justify-center
                                rounded-full
                                transition-opacity
                                outline-none
                                hover:opacity-80
                            "
                        >
                            <Avatar
                                fallback={(user?.name ?? labelsConstants.adminUser).charAt(0)}
                                size={AvatarSizeEnum.SM}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-56"
                        >
                            <DropdownMenuLabel>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-semibold text-text-dark">{user?.name ?? labelsConstants.adminUser}</span>
                                    <span className="text-xs font-normal text-text-muted">{user?.email ?? labelsConstants.emailExample}</span>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => navigate(routesData.profile)}>
                                    <User className="size-4" />
                                    {labelsConstants.profile}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    className="text-error"
                                    onClick={onLogout}
                                >
                                    <LogOut className="size-4" />
                                    {buttonsConstants.logout}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </UiDropdownMenu>
                </div>
            </div>
        </div>
    );
};
