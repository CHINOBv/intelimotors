import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {AuthRepositoryImpl} from "@/modules/auth/infrastructure/AuthRepositoryImpl";

const authRepository = new AuthRepositoryImpl();
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                try {

                    const response = await authRepository.login(credentials!.username, credentials!.password);
                    if (!response) return null;

                    return {
                        id: response.user.id,
                        username: response.user.username,
                        accessToken: response.token
                    };

                } catch (error) {
                    console.error('Login error:', error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({session, token}) {
            session.user.accessToken = token.accessToken;
            session.user.id = token.id;
            session.user.username = token.username;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register'
    }
}
