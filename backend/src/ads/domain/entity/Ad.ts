import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../../auth/domain/User';
import { Image } from './Image';

@Entity()
export class Ad {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    type: string;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    subtype: string;

    @Column()
    year: number;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    mileage: number;

    @Column()
    price: number;

    @Column()
    transaction: string;

    @Column()
    description: string;

    @Column()
    screenshot: string;

    @ManyToOne(() => User, user => user.ads)
    user: User;

    @OneToMany(() => Image, image => image.ad, { cascade: true })
    images: Image[];

    constructor(
        type: string,
        brand: string,
        model: string,
        subtype: string,
        year: number,
        state: string,
        city: string,
        mileage: number,
        price: number,
        transaction: string,
        description: string,
        screenshot: string,
        user: User,
        images: Image[]
    ) {
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
        this.screenshot = screenshot;
        this.user = user;
        this.images = images;
    }
}
