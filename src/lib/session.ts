import "server-only";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/lib/auth";
import { cache } from "react";
import { AuthenticationError } from "./errors";
import { UserId } from "@/types";

export const getCurrentUser = cache(async () => {
    const session = await validateRequest();
    if (!session.user) {
        return undefined;
    }
    return session.user;
});

export const assertAuthenticated = async () => {
    const user = await getCurrentUser();
    if (!user) {
        throw new AuthenticationError();
    }
    return user;
};

export async function setSession(userId: UserId) {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );
}

export async function clearSession() {
    const session = await validateRequest();

    if (session.session) {
        await lucia.invalidateSession(session.session.id);
    }
}