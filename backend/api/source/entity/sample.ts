import {BasicEntity} from "@entity/basic-entity";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity("sample")
export class Sample extends BasicEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text", {nullable:false, unique: true})
    key: string;

    @Column("text", {nullable:false})
    value: string;

    @Column("text", {nullable:false})
    rug_id: string;

    @Column("text", {nullable:false})
    line_id: string;

    @Column("text", {nullable:false})
    order_id: string;

    self = Sample;
}
