'use client';

import {Ad} from "@/modules/ads/domain/Ad";
import {Dispatch, useState} from "react";
import Image from "next/image";
import {Dialog, Stack, Typography} from "@mui/material";
import ItemText from "@/modules/ads/ui/components/AdList/atoms/ItemText";

const MainItem = ({ ad, setShowDetails }: {
    ad: Ad,
    setShowDetails: Dispatch<boolean>
}) => {
    const [openImage, setOpenImage] = useState<string | null>(null);

    const handleImageClick = (imagePath: string) => {
        setOpenImage(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${imagePath}`);
    }

    const handleClose = () => {
        setOpenImage(null);
    }

    return (
        <>
            <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${ad.screenshot}`}
                alt={ad.id}
                width={300}
                height={200}
                style={{ objectFit: 'cover', height: '200px', width: '100%' }}
                onClick={() => handleImageClick(ad.screenshot)}
            />
            <Stack spacing={1} sx={{ padding: 2 }} flexWrap='wrap'>
                <Typography variant="h6">{ad.model}</Typography>
                <div className='flex  flex-row gap-4 justify-start items-center flex-wrap'>
                    <ItemText color='bg-emerald-700 text-white'>Price: ${ad.price}</ItemText>
                    <ItemText color='bg-blue-400 text-white'>Year: {ad.year}</ItemText>
                    <ItemText color='bg-orange-400 text-white'>Kilometers: {ad.mileage}</ItemText>
                </div>
                <Typography variant="body2">{ad.description}</Typography>
            </Stack>

            {openImage && (
                <Dialog
                    open={Boolean(openImage)}
                    onClose={handleClose}
                    maxWidth="md"
                >
                    <Image
                        src={openImage}
                        alt="Selected Image"
                        width={800}
                        height={600}
                        style={{ objectFit: 'contain' }}
                    />
                </Dialog>
            )}
        </>
    );
}

export default MainItem;
