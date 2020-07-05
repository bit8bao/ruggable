import ITableState from './Models/ITableState';
import TableAction from './TableAction';
import TableResponseModel from './Models/Table/TableResponseModel';
import IAction from '../../Models/IAction';
import BaseReducer from '../BaseReducer';

export default class TableReducer extends BaseReducer<ITableState> {
  public readonly initialState: ITableState = {
    table: null,
    sortFlag: false,
  };

  public [TableAction.REQUEST_TABLE_FINISHED](state: ITableState, action: IAction<TableResponseModel>): ITableState {
    return {
      ...state,
      table: action.payload!.data,
    };
  }

  public [TableAction.SORT_ACTIVATE](state: ITableState, action: IAction<TableResponseModel>): ITableState {
    return {
      ...state,
      sortFlag: true,
    };
  }

  public [TableAction.SORT_DEACTIVATE](state: ITableState, action: IAction<TableResponseModel>): ITableState {
    return {
      ...state,
      sortFlag: false,
    };
  }

}
