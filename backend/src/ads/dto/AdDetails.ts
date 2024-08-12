import { IsNumber, IsPositive, IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class AdDetails {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsString()
    @IsNotEmpty()
    subtype: string;

    @IsNumber()
    @IsPositive()
    year: number;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsNumber()
    @IsPositive()
    mileage: number;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsString()
    @IsNotEmpty()
    transaction: string;

    @IsString()
    @MaxLength(500)
    description: string;

    images?: string[];

    constructor(type: string, brand: string, model: string, subtype: string, year: number, state: string, city: string, mileage: number, price: number, transaction: string, description: string, images?: string[]) {
        this.type = type;
        this.brand = brand;
        this.model = model;
        this.subtype = subtype;
        this.year = year;
        this.state = state;
        this.city = city;
        this.mileage = mileage;
        this.price = price;
        this.transaction = transaction;
        this.description = description;
        this.images = images;
    }
}
