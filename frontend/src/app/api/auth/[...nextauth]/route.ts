import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthRepositoryImpl } from '@/modules/auth/infrastructure/AuthRepositoryImpl';
import {authOptions} from "@/modules/shared/lib/authOptions";


const auth = NextAuth(authOptions);

export { auth as GET, auth as POST, };
