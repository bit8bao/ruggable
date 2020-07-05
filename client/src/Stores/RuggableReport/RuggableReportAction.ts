import RuggableReportResponseModel from './Models/RuggableReportResponseModel';
import RuggableReportEffects from './RuggableReportEffects';
import HttpErrorResponseModel from '../../Models/API/HttpErrorResponseModel';
import ActionUtility from '../../Utilities/ActionUtility';
import { ReduxDispatch } from '../../Models/ReduxProps';
import IStore from '../../Models/IStore';
import OrdersByProductionResponseModel from "./Models/OrdersByProductionResponseModel";
import RuggableCitiesResponseModel from "./Models/RuggableCitiesResponseModel";
import IAction from "../../Models/IAction";

type ActionUnion = undefined | HttpErrorResponseModel | RuggableReportResponseModel | OrdersByProductionResponseModel | RuggableCitiesResponseModel;

export default class RuggableReportAction {
  public static readonly CLEAR_PRODUCTION: string = 'RuggableReportAction.CLEAR_PRODUCTION';
  public static readonly VIEW: string = 'RuggableReportAction.VIEW';
  public static readonly REQUEST_CITY: string = 'RuggableReportAction.REQUEST_CITY';
  public static readonly REQUEST_REPORT: string = 'RuggableReportAction.REQUEST_REPORT';
  public static readonly REQUEST_ORDERS_BY_PRODUCTION: string = 'RuggableReportAction.REQUEST_ORDERS_BY_PRODUCTION';
  public static readonly REQUEST_PRODUCTION_LINE_ORDERS: string = 'RuggableReportAction.REQUEST_PRODUCTION_LINE_ORDERS';
  public static readonly REQUEST_REPORT_FINISHED: string = 'RuggableReportAction.REQUEST_REPORT_FINISHED';
  public static readonly REQUEST_ORDERS_BY_PRODUCTION_FINISHED: string = 'RuggableReportAction.REQUEST_ORDERS_BY_PRODUCTION_FINISHED';
  public static readonly REQUEST_PRODUCTION_LINE_ORDERS_FINISHED: string = 'RuggableReportAction.REQUEST_PRODUCTION_LINE_ORDERS_FINISHED';
  public static readonly REQUEST_CITY_FINISHED: string = 'RuggableReportAction.REQUEST_CITY_FINISHED';

  public static chart(chart: boolean): IAction<boolean> {
    return ActionUtility.createAction(RuggableReportAction.VIEW, chart);
  }

  public static clearProduction(): IAction<boolean> {
    return ActionUtility.createAction(RuggableReportAction.CLEAR_PRODUCTION);
  }

  public static getCities(): any {
    return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore) => {
      await ActionUtility.createThunkEffect<RuggableCitiesResponseModel>(
          dispatch,
          RuggableReportAction.REQUEST_CITY,
          RuggableReportEffects.getCities,
      );
    };
  }

  public static loadReport(request: string): any {
    return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore) => {
      await ActionUtility.createThunkEffect<RuggableReportResponseModel>(
        dispatch,
        RuggableReportAction.REQUEST_REPORT,
        RuggableReportEffects.loadRuggableTableReport,
          request
      );
    };
  }

  public static loadOrdersByProduction(request: String): any {
    return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore) => {
      await ActionUtility.createThunkEffect<OrdersByProductionResponseModel>(
          dispatch,
          RuggableReportAction.REQUEST_ORDERS_BY_PRODUCTION,
          RuggableReportEffects.loadOrderByProduction,
          request
      );
    };
  }

  public static loadProductionLineOrders(request: String): any {
    return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore) => {
      await ActionUtility.createThunkEffect<OrdersByProductionResponseModel>(
          dispatch,
          RuggableReportAction.REQUEST_PRODUCTION_LINE_ORDERS,
          RuggableReportEffects.loadOrderByProduction,
          request
      );
    };
  }
}
