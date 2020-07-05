// @ts-ignore
import environment from 'environment';
import NavigationResponseModel from './Models/Navigation/NavigationResponseModel';
import HttpErrorResponseModel from '../../Models/API/HttpErrorResponseModel';
import EffectsUtility from '../../Utilities/EffectsUtility';

export default class NavigationEffects {
  public static async requestAll(): Promise<NavigationResponseModel | HttpErrorResponseModel> {
    const endpoint: string = environment.api.navigationAll;
    return EffectsUtility.getToModel(NavigationResponseModel, endpoint);
  }
}
