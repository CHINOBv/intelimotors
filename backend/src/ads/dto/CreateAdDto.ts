import {IsNumber, IsPositive, IsString, MaxLength} from 'class-validator';

export class CreateAdDto {

    @IsString()
    price: number;

    @IsString()
    @MaxLength(500)
    description: string;

    @IsString()
    screenshot: string;

    constructor() {

        this.price = 0;
        this.description = '';
        this.screenshot = '';
    }
}
