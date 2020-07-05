import {BasicEntity} from "@entity/basic-entity";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity("Production")
export class Production extends BasicEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("numeric", {nullable:false})
    prod_line: number;

    @Column("text", {nullable:true})
    prod_type: string;

    @Column("varchar", {nullable:false})
    city_id: string;

    self = Production;
}
