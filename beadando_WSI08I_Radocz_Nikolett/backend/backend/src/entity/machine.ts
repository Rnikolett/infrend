import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Machines{
    @Column()
    machineName:string;
    @Column()
    acquisition:string;
    @Column()
    manufacturer:string;
    @Column()
    state:string;
    @Column()
    chassisNumber:string;
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    partner_id:number;

}