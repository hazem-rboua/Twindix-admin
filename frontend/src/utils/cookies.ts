import { commonData } from "@/data";

export const getCookieHandler = (name: string): string | null => {
    const value = `; ${document.cookie}`;

    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;

    return null;
};

export const setCookieHandler = (
    name: string,
    value: string,
    days: number = 7,
): void => {
    const expires = new Date();

    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${value}${commonData.cookie.expiresPrefix}${expires.toUTCString()}${commonData.cookie.pathSuffix}`;
};

export const deleteCookieHandler = (name: string): void => void (document.cookie = `${name}${commonData.cookie.expiredDate}`);
