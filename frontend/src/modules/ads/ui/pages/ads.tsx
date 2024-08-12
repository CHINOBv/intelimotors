'use client';

import React from 'react';
import {Grid, Typography} from '@mui/material';
import CreateAdForm from '@/modules/ads/ui/components/CreateAdForm';
import AdList from '@/modules/ads/ui/components/AdList';
import SignOutButton from '@/modules/auth/ui/components/SignOutButton';

const HomePage = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={2} className='border-r border-gray-200'>
                <div className='flex flex-col px-4 py-4 gap-4'>
                    <Typography variant='h4'>Create ad</Typography>
                    <CreateAdForm/>
                </div>
                <SignOutButton/>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Grid container sx={{
                    height: 'calc(100vh)',
                    overflowY: 'auto',
                    paddingTop: 3,
                    paddingBottom: 3
                }}>
                    <AdList/>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default HomePage;
