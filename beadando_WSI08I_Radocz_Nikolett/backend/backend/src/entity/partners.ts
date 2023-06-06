import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Partners{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    zipCode:number;
    @Column()
    city:string;
    @Column()
    address:string;
    @Column()
    ballance:number;
}