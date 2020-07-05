import RuggableModel from "./RuggableModel";
import IOrders from "./IOrders";
import CityModel from "./CityModel";

export default interface IRuggableReportState {
  readonly reports: RuggableModel[];
  readonly ordersByProduction: IOrders[];
  readonly productionLineOrders: IOrders[];
  readonly cities: CityModel[];
  readonly chart: boolean;
}
