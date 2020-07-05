import RuggableModel from "../../../Stores/RuggableReport/Models/RuggableModel";
import IOrdersByProduction from "../../../Stores/RuggableReport/Models/IOrdersByProduction";

export default interface IOrdersProdsModel {
    readonly data: RuggableModel;
    readonly ordersByProduction: IOrdersByProduction[];
}
