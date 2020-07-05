import { createSelector } from 'reselect';
import IStore from '../../Models/IStore';
import IOrderProductionRuggableModel from "./Models/IOrderProductionRuggableModel";
import RuggableModel from "../../Stores/RuggableReport/Models/RuggableModel";
import IOrders from "../../Stores/RuggableReport/Models/IOrders";
import {Selector} from "react-redux";

export class RuggableSelector {
    public static setRuggableData(ruggable: RuggableModel[], orders: IOrders[]): IOrderProductionRuggableModel[] {
        return [...ruggable.map((prod) => {
          return {
              ruggable: prod,
              orders: orders.filter((a) => a.production_id === prod.id).length,
          }
        })]
    }
}

export const getRuggableData: Selector<IStore, IOrderProductionRuggableModel[]> = createSelector(
    (state: IStore) => state.ruggableReport.reports,
    (state: IStore) => state.ruggableReport.ordersByProduction,
    RuggableSelector.setRuggableData
);
