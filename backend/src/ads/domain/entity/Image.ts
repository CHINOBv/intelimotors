import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ad } from './Ad';
import {Exclude} from "class-transformer";

@Entity()
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    path: string;

    @ManyToOne(() => Ad, ad => ad.images)
    @Exclude({ toPlainOnly: true })
    ad: Ad;

    constructor(path: string, ad: Ad) {
        this.path = path;
        this.ad = ad;
    }
}
