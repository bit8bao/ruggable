import RuggableModel from "./RuggableModel";
import IOrders from "./IOrders";

export default interface IOrdersByProduction {
    readonly orders: IOrders[];
}
