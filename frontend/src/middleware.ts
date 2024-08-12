import {withAuth} from "next-auth/middleware";
import {MiddlewareConfig} from "next/server";

export default withAuth({
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },
});

export const config: MiddlewareConfig = {
    matcher: ['/'],
};
