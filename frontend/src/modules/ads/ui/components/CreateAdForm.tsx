'use client';

import React from 'react';
import {useFormik} from 'formik';
import {CreateAdSchema} from '../../validation/AdValidation';
import {Button, styled, TextField} from '@mui/material';
import {CreateAdRequest} from "@/modules/ads/domain/requests/CreateAdRequest";
import {CreateAdUseCase} from "@/modules/ads/application/CreateAdUseCase";
import {AdRepositoryImpl} from "@/modules/ads/infrastructure/AdRepositoryImpl";
import toFormikValidateAdapter from "@/modules/shared/utils/to-formik-validate.adapter";
import {CloudUpload} from "@mui/icons-material";
import {useAdsStore} from "@/modules/ads/infrastructure/adsStore";

const adRepository = new AdRepositoryImpl();
const createAdUseCase = new CreateAdUseCase(adRepository);

const CreateAdForm = () => {
    const {isLoading, isCreatingAd, addAd} = useAdsStore();
    const formik = useFormik<CreateAdRequest>({
        initialValues: {
            price: 0,
            description: '',
            images: [],
        },
        validate: toFormikValidateAdapter(CreateAdSchema),
        onSubmit: async (values) => {
            if (isLoading || isCreatingAd) return;
            try {
                await addAd(values);
                formik.resetForm();
            } catch (error) {
                console.error('Failed to create ad:', error);
            }

        },
    });

    // @ts-ignore
    // @ts-ignore
    return (

        <form
            className='h-full flex flex-col gap-4'
            onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                variant='outlined'
                id="price"
                name="price"
                label="Price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
            />
            <TextField
                fullWidth
                variant='outlined'
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.errors.description}
            />
            <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUpload/>}
                color='success'
                onClick={() => {
                    formik.setFieldTouched("images", true);
                }}
            >
                Upload file
                <VisuallyHiddenInput
                    id="images"
                    name="images"
                    type="file"
                    multiple
                    onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                        const files = event.currentTarget.files;
                        if (files) {
                            await formik.setFieldTouched("images", true);
                            await formik.setFieldValue("images", Array.from(files));
                            await formik.validateForm();
                        }
                    }}
                />
            </Button>

            {(formik.errors.images && formik.touched.images) && (
                // @ts-ignore
                <p className="text-red-500 text-sm -mt-3">{formik.errors.images}</p>
            )}

            <Button color="primary" variant="contained" fullWidth type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
            >
                {formik.isSubmitting ? 'Creating ad...' : 'Create a new ad 🚀'}
            </Button>
        </form>
    );
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default CreateAdForm;
