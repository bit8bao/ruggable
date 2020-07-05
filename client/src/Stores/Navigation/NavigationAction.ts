import NavigationResponseModel from './Models/Navigation/NavigationResponseModel';
import NavigationEffects from './NavigationEffects';
import HttpErrorResponseModel from '../../Models/API/HttpErrorResponseModel';
import IAction from '../../Models/IAction';
import ActionUtility from '../../Utilities/ActionUtility';
import { ReduxDispatch } from '../../Models/ReduxProps';
import IStore from '../../Models/IStore';
import INavigation from "../../Models/INavigation";

type ActionUnion = undefined | boolean | HttpErrorResponseModel | NavigationResponseModel;

export default class NavigationAction {
  public static readonly REQUEST_ALL: string = 'NavigationAction.REQUEST_ALL';
  public static readonly INITIAL: string = 'NavigationAction.INITIAL';
  public static readonly REQUEST_ALL_FINISHED: string = 'NavigationAction.REQUEST_ALL_FINISHED';
  public static readonly REACT_ROUTER: string = 'NavigationAction.REACT_ROUTER';

  public static initial(navigation: INavigation[]): any {
    return ActionUtility.createAction(NavigationAction.INITIAL, navigation);
  }

  public static requestAll(): any {
    return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore) => {
      await ActionUtility.createThunkEffect<NavigationResponseModel>(dispatch, NavigationAction.REQUEST_ALL, NavigationEffects.requestAll);
    };
  }

  public static firstRendering(isFirstRendering: boolean): IAction<boolean> {
    return ActionUtility.createAction(NavigationAction.REACT_ROUTER, isFirstRendering);
  }
}
