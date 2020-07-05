import { createSelector, ParametricSelector } from 'reselect';
import IStore from '../../Models/IStore';
import IRequestingState from '../../Stores/Requesting/Models/IRequestingState';

export class RequestingSelector {
  public static getRequesting(requestingState: IRequestingState, actionTypes: string[]): boolean {
    return actionTypes.some((actionType: string) => requestingState[actionType]);
  }
}

export const getRequesting: ParametricSelector<IStore, string[], boolean> = createSelector(
  (state: IStore) => state.requesting,
  (state: IStore, actionTypes: string[]) => actionTypes,
  RequestingSelector.getRequesting
);
