import { createSelector, ParametricSelector } from 'reselect';
import IStore from '../../Models/IStore';
import IErrorState from '../../Stores/Error/Models/IErrorState';

export class ErrorSelector {
  public static getRawErrors(errorState: IErrorState, actionTypes: string[]): IErrorState {
    return actionTypes.reduce((partialState: object, actionType: string) => {
      if (errorState[actionType]) {
        partialState[actionType] = errorState[actionType];
      }

      return partialState;
    }, {});
  }

  public static getErrorText(errorState: IErrorState, actionTypes: string[]): string {
    const partialErrorState = ErrorSelector.getRawErrors(errorState, actionTypes) as IErrorState;

    const errorList: string[] = actionTypes.reduce((errorMessages: string[], actionType: string) => {
      if (partialErrorState[actionType]) {
        const { message, errors } = partialErrorState[actionType];
        const arrayOfErrors: string[] = errors.length ? errors : [message];

        return errorMessages.concat(arrayOfErrors);
      }

      return errorMessages;
    }, []);

    return errorList.join(', ');
  }

  public static hasErrors(errorState: IErrorState, actionTypes: string[]): boolean {
    return actionTypes.map((actionType: string) => errorState[actionType]).filter(Boolean).length > 0;
  }
}

export const getRawErrors: ParametricSelector<IStore, string[], IErrorState> = createSelector(
  (state: IStore) => state.error,
  (state: IStore, actionTypes: string[]) => actionTypes,
  ErrorSelector.getRawErrors
);

export const getErrorText: ParametricSelector<IStore, string[], string> = createSelector(
  (state: IStore) => state.error,
  (state: IStore, actionTypes: string[]) => actionTypes,
  ErrorSelector.getErrorText
);

export const hasErrors: ParametricSelector<IStore, string[], boolean> = createSelector(
  (state: IStore) => state.error,
  (state: IStore, actionTypes: string[]) => actionTypes,
  ErrorSelector.hasErrors
);
