import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Ad } from '../../ads/domain/entity/Ad';
import { Exclude } from 'class-transformer';
import bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    username: string;

    @Exclude()
    @Column()
    password: string;

    @OneToMany(() => Ad, ad => ad.user)
    ads!: Ad[];

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
