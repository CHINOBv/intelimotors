'use client';

import React, {useState} from 'react';
import {useFormik} from 'formik';
import {LoginSchema} from '../../validation/AuthValidation';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {Button, TextField} from '@mui/material';
import toFormikValidateAdapter from "@/modules/shared/utils/to-formik-validate.adapter";

const LoginForm = () => {
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate: toFormikValidateAdapter(LoginSchema),
        onSubmit: async (values) => {
            try {
                setErrorMessage('');
                const res = await signIn('credentials', {
                    redirect: false,
                    username: values.username,
                    password: values.password
                });

                if (!res?.ok) {
                    setErrorMessage('User or password is incorrect.');
                    throw new Error('Login failed');
                }

                router.push('/');

            } catch (error) {
                console.error('Login failed:', JSON.stringify(error, null, 2));
                setErrorMessage('Error logging in. Please try again.');
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>
            <TextField
                variant='standard'
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
                variant='standard'
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />

            {errorMessage && <p className='text-red-500'>🥲{errorMessage}</p>}

            <Button
                disabled={formik.isSubmitting || !formik.isValid}
                color="primary" variant="contained" fullWidth type="submit">
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
