'use client';

import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import AdListItem from "@/modules/ads/ui/components/AdList/atoms/AdListItem";
import {useAdsStore} from "@/modules/ads/infrastructure/adsStore";

const AdList = () => {
    const {ads, fetchAds} = useAdsStore();

    useEffect(() => {
        fetchAds();
    }, []);

    return (
        <Grid container spacing={4} flexWrap={'wrap'}>
            {ads.map(ad => (
                <AdListItem ad={ad} key={ad.id}/>
            ))}
        </Grid>
    );
};

export default AdList;
