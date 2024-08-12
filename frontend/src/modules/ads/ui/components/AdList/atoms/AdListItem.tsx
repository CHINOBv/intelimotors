'use client';

import { Ad } from "@/modules/ads/domain/Ad";
import { Card, CardActions, Grid, Stack, Typography, Dialog } from "@mui/material";
import Image from "next/image";
import { Dispatch, useState } from "react";
import DetailsItem from "@/modules/ads/ui/components/AdList/atoms/DetailsItem";
import MainItem from "@/modules/ads/ui/components/AdList/atoms/MainItem";

const AdListItem = ({ ad }: { ad: Ad }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Grid item xs={12} sm={6} md={4} key={ad.id} >
            <Card sx={{ display: 'flex', flexDirection: 'column', position: 'relative', minHeight: '400px'}}
                  className='rounded-lg border border-gray-400 shadow-none'>

                {showDetails ? (
                    <DetailsItem ad={ad} setShowDetails={setShowDetails} />
                ) : (
                    <MainItem ad={ad} setShowDetails={setShowDetails} />
                )}

                <CardActions sx={{ marginTop: 'auto', padding: 2 }}>
                    <button onClick={() => setShowDetails(pv => !pv)} className='text-blue-500'>
                        {showDetails ? 'Show less' : 'Show more'}
                    </button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default AdListItem;
