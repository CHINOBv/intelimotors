export interface Ad {
    id: string;
    type: string;
    brand: string;
    model: string;
    year: number;
    state: string;
    city: string;
    mileage: number;
    price: number;
    description: string;
    images: AdImage[];
    screenshot: string;
}

export interface AdImage {
    id: string;
    path: string;
}
