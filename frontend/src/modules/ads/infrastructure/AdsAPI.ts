import axios from 'axios';
import {getServerSession} from "next-auth";
import {authOptions} from "@/modules/shared/lib/authOptions";
import {getSession} from "next-auth/react";

const AdsAPI = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads`,
    headers: {
        'Content-Type': 'application/json',
    },
});

AdsAPI.interceptors.request.use(async (config) => {
    const newConfig = { ...config };
    const session: any =
        (await getServerSession(authOptions).catch(() => null)) ||
        (await getSession());

    if (session) {
        // console.log(JSON.stringify(session));
        const { accessToken } = session.user;
        newConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return newConfig;
});

AdsAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            (await getServerSession(authOptions)) || (await getSession());
        }
        throw error;
    }
);

export default AdsAPI;
