import RuggableModel from "../../../Stores/RuggableReport/Models/RuggableModel";

export default interface IOrderProductionRuggableModel {
    readonly ruggable: RuggableModel;
    readonly orders: number;
}
