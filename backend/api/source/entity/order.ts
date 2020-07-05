import {BasicEntity} from "@entity/basic-entity";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("Order")
export class Order extends BasicEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("uuid", {nullable:false})
    product_id: string;

    @Column("uuid", {nullable:false})
    customer_id: string;

    @Column("uuid", {nullable:false})
    production_id: string;

    self = Order;
}
