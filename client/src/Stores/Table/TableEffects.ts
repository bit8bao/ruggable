import environment from 'environment';
import TableResponseModel from './Models/Table/TableResponseModel';
import HttpErrorResponseModel from '../../Models/API/HttpErrorResponseModel';
import EffectsUtility from '../../Utilities/EffectsUtility';

export default class TableEffects {

  public static async requestTable(): Promise<TableResponseModel | HttpErrorResponseModel> {
    const endpoint: string = environment.api.error200;

    return EffectsUtility.getToModel<TableResponseModel>(TableResponseModel, endpoint);
  }
}
