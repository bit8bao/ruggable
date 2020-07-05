import INavigationState from './Models/INavigationState';
import NavigationAction from './NavigationAction';
import NavigationResponseModel from './Models/Navigation/NavigationResponseModel';
import IAction from '../../Models/IAction';
import BaseReducer from '../BaseReducer';
import NavigationModel from "./Models/Navigation/NavigationModel";

export default class NavigationReducer extends BaseReducer<INavigationState> {
  public readonly initialState: INavigationState = {
    allNavItems: [],
    isFirstRendering: true,
  };

  public [NavigationAction.INITIAL](state: INavigationState, action: IAction<NavigationModel[]>): INavigationState {
    return {
      ...state,
      allNavItems: action.payload!,
    };
  }

  public [NavigationAction.REQUEST_ALL_FINISHED](state: INavigationState, action: IAction<NavigationResponseModel>): INavigationState {
    return {
      ...state,
      allNavItems: action.payload!.data,
    };
  }

  public [NavigationAction.REACT_ROUTER](state: INavigationState, action: IAction<boolean>): INavigationState {
    return {
      ...state,
      isFirstRendering: action.payload!,
    };
  }
}
