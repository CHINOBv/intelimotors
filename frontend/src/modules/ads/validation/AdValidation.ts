import z from 'zod';

export const CreateAdSchema = z.object({
    price: z.number().min(1, "Price must be greater than 0"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
});
