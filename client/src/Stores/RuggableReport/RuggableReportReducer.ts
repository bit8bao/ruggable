import IRuggableReportState from './Models/IRuggableReportState';
import RuggableReportAction from './RuggableReportAction';
import RuggableReportResponseModel from './Models/RuggableReportResponseModel';
import IAction from '../../Models/IAction';
import { orderBy } from 'lodash';
import SortDirectionEnum from '../../Constants/SortDirectionEnum';
import BaseReducer from '../BaseReducer';
import OrdersByProductionResponseModel from "./Models/OrdersByProductionResponseModel";
import RuggableCitiesResponseModel from "./Models/RuggableCitiesResponseModel";


export default class RuggableReportReducer extends BaseReducer<IRuggableReportState> {
  public readonly initialState: IRuggableReportState = {
    reports: [],
    ordersByProduction: [],
    productionLineOrders: [],
    cities: [],
    chart: false,
  };

  public [RuggableReportAction.REQUEST_CITY_FINISHED](state: IRuggableReportState, action: IAction<RuggableCitiesResponseModel>) {
    const model: RuggableCitiesResponseModel = action.payload!;
    return {
      ...state,
      cities: orderBy(model.data.cities, ['city_name'], [SortDirectionEnum.Asc]),
    };
  }

  public [RuggableReportAction.REQUEST_REPORT_FINISHED](state: IRuggableReportState, action: IAction<RuggableReportResponseModel>) {
    const model: RuggableReportResponseModel = action.payload!;
    return {
      ...state,
      reports: orderBy(model.data.productionByCity, ['prod_line'], [SortDirectionEnum.Asc]),
    };
  }

  public [RuggableReportAction.REQUEST_ORDERS_BY_PRODUCTION_FINISHED](state: IRuggableReportState, action: IAction<OrdersByProductionResponseModel>) {
    const model: OrdersByProductionResponseModel = action.payload!;
    return {
      ...state,
      ordersByProduction: (state.ordersByProduction) ? [...state.ordersByProduction, ...model.data.orderByProduction.map((a) => a)] : state.ordersByProduction,
    };
  }

  public [RuggableReportAction.REQUEST_PRODUCTION_LINE_ORDERS_FINISHED](state: IRuggableReportState, action: IAction<OrdersByProductionResponseModel>) {
    const model: OrdersByProductionResponseModel = action.payload!;
    return {
      ...state,
      productionLineOrders: (state.productionLineOrders) ? [...state.productionLineOrders, ...model.data.orderByProduction.map((a) => a)] : state.productionLineOrders,
    };
  }

  public [RuggableReportAction.CLEAR_PRODUCTION](state: IRuggableReportState) {
    return {
      ...state,
      productionLineOrders: [],
      ordersByProduction: [],
    };
  }

  public [RuggableReportAction.VIEW](state: IRuggableReportState, action: IAction<boolean>) {
    return {
      ...state,
      chart: action.payload,
    };
  }
}
