import TableReducer from './TableReducer';
import TableAction from './TableAction';
import ITableState from './Models/ITableState';
import TableResponseModel from './Models/Table/TableResponseModel';

describe('TableReducer', () => {
  let reducer: TableReducer;

  beforeEach(() => {
    reducer = new TableReducer();
  });

  it('returns default state with invalid action type', () => {
    const action: IAction<undefined> = { type: '' };

    expect(reducer.reducer(undefined, action)).toEqual(reducer.initialState);
  });

  it('returns default state with error action', () => {
    const action: IAction<undefined> = ActionUtility.createAction(TestAction, undefined, true);

    expect(reducer.reducer(reducer.initialState, action)).toEqual(reducer.initialState);
  });

  it(TableAction.REQUEST_TABLE_FINISHED, () => {
    const payload = new TableResponseModel({});
    const action: IAction<TableResponseModel> = ActionUtility.createAction(TableAction.REQUEST_TABLE_FINISHED, payload);

    const actualResult: ITableState = reducer.reducer(reducer.initialState, action);
    const expectedResult: ITableState = {
      ...reducer.initialState,
      table: payload.data,
    };

    expect(actualResult).toEqual(expectedResult);
  });
});
