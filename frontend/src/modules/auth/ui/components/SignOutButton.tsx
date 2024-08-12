'use client';

import React from 'react';
import {Button} from '@mui/material';
import {signOut} from 'next-auth/react';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const SignOutButton = () => {
    return (
        <Button
            className='xs:absolute bottom-2 left-2'
            variant="outlined"
            color="error"
            onClick={() => signOut()}>
            <PowerSettingsNewIcon />
        </Button>
    );
};

export default SignOutButton;
