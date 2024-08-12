// src/modules/auth/ui/components/RegisterForm.tsx

import React from 'react';
import {Button, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {z} from 'zod';
import {RegisterUseCase} from '../../application/RegisterUseCase';
import {AuthRepositoryImpl} from '../../infrastructure/AuthRepositoryImpl';
import {RegisterSchema} from "@/modules/auth/validation/AuthValidation";
import toFormikValidateAdapter from "@/modules/shared/utils/to-formik-validate.adapter";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";


type RegisterValues = z.infer<typeof RegisterSchema>;
const authRepository = new AuthRepositoryImpl();
const registerUseCase = new RegisterUseCase(authRepository);

const RegisterForm = () => {

    const router = useRouter();

    const formik = useFormik<RegisterValues>({
        initialValues: {
            username: '',
            password: '',
        },
        validate: toFormikValidateAdapter(RegisterSchema),
        onSubmit: async (values) => {
            try {
                await registerUseCase.execute(values.username, values.password);
                router.push('/auth/login');
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                label="Username"
                name="username"
                fullWidth
                margin="normal"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <Button type="submit" variant="contained" color="primary">
                Register
            </Button>
        </form>
    );
};

export default RegisterForm;
