import React from 'react';
import LoginForm from '../components/LoginForm';
import Link from "next/link";

const LoginPage = () => {
    return (
        <div className='flex flex-1 flex-col w-full h-screen items-center justify-center'>
            <div>
                <h1 className='text-xl font-bold mb-5 '>Welcome back 😎</h1>
                <LoginForm/>
                <Link className='text-blue-500' href='/auth/register'>
                    Don't have an account? Register here
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
