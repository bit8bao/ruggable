import {IRuggableContext} from "../../context";
import {Inject, Service} from "typedi";
import {Repository} from "typeorm";
import {Order} from "@entity/order";
import {BaseProvider} from "../base.provider";
import {InputCreateOrder} from "@types";
import {createFrom} from "@shared/injector";

@Service()
export class OrderProvider extends BaseProvider<Order> {
    repository: Repository<Order>;

    constructor(@Inject("context") context: IRuggableContext) {
        super(context);
        this.repository = context.connection.getRepository(Order);
    }

    async create(input: InputCreateOrder) : Promise<Order> {
        const order = createFrom(Order, input);
        order.created_at = new Date();
        order.updated_at = new Date();
        return this.repository.save(order);
    }
}
