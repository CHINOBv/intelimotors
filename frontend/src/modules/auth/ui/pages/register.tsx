'use client';

import Link from "next/link";
import RegisterForm from "@/modules/auth/ui/components/RegisterForm";

const RegisterPage = () => {
    return (
        <div className='flex flex-1 flex-col w-full h-screen items-center justify-center'>
            <div>
                <h1 className='text-xl font-bold mb-5 '>
                    We are excited to have you here 🎉
                </h1>
                <RegisterForm />

                <Link className='text-blue-500' href='/auth/register'>
                    Don't have an account? Register here
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;
