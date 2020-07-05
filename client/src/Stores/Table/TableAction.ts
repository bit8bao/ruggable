import TableResponseModel from './Models/Table/TableResponseModel';
import TableEffects from './TableEffects';
import HttpErrorResponseModel from '../../Models/API/HttpErrorResponseModel';
import IStore from '../../Models/IStore';
import {ReduxDispatch} from '../../Models/ReduxProps';
import ActionUtility from '../../Utilities/ActionUtility';

type ActionUnion = undefined | HttpErrorResponseModel | TableResponseModel;

export default class TableAction {
  public static readonly REQUEST_TABLE: string = 'TableAction.REQUEST_TABLE';
  public static readonly REQUEST_TABLE_FINISHED: string = 'TableAction.REQUEST_TABLE_FINISHED';
  public static readonly SORT_ACTIVATE: string = 'TableAction.SORT_ACTIVATE';
  public static readonly SORT_DEACTIVATE: string = 'TableAction.SORT_DEACTIVATE';

  public static requestTable(): any {
    return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore) => {
      await ActionUtility.createThunkEffect<TableResponseModel>(dispatch, TableAction.REQUEST_TABLE, TableEffects.requestTable);
    };
  }

  public static requestTableAlt(): any {
    return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore) => {
      dispatch({type: TableAction.REQUEST_TABLE});

      const model: TableResponseModel | HttpErrorResponseModel = await TableEffects.requestTable();

      dispatch({
        type: TableAction.REQUEST_TABLE_FINISHED,
        payload: model,
        error: model instanceof HttpErrorResponseModel,
      });
    };
  }

  public static sortColumnActivate(): any {
    return ActionUtility.createAction(TableAction.SORT_ACTIVATE);
  }

  public static sortColumnDeactivate(): any {
    return ActionUtility.createAction(TableAction.SORT_DEACTIVATE);
  }

}
