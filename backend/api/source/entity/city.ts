import {BasicEntity} from "@entity/basic-entity";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity("City")
export class City extends BasicEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text", {nullable:false})
    city_name: string;

    @Column("text", {nullable:true})
    description: string;

    self = City;
}
