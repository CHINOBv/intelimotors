import {Ad} from "@/modules/ads/domain/Ad";
import {Dispatch, useState} from "react";
import {Dialog, Grid} from "@mui/material";
import Image from "next/image";

const DetailsItem = ({ ad, setShowDetails }: {
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
            <Grid container spacing={2} sx={{ padding: 2 }}>
                {ad.images.map((image, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${image.path}`}
                            alt={ad.id}
                            width={300}
                            height={300}
                            style={{ objectFit: 'contain', cursor: 'pointer' }}
                            onClick={() => handleImageClick(image.path)}
                        />
                    </Grid>
                ))}
            </Grid>

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

export default DetailsItem;
