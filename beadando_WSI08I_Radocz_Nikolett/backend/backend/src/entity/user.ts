import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users{
    @PrimaryColumn()
    username:string;
    @Column()
    password:string;
}