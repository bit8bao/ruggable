import { MockStoreEnhanced } from 'redux-mock-store';
import TableResponseModel from './Models/Table/TableResponseModel';
import TableEffects from './TableEffects';
import TableAction from './TableAction';

describe('TableAction', () => {
  let store: MockStoreEnhanced<Partial<IStore>>;

  beforeEach(() => {
    store = mockStoreFixture();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('requestTable', () => {
    it('has a successful response', async () => {
      const expectedResponse = new TableResponseModel({});

      jest.spyOn(TableEffects, 'requestTable').mockImplementation(async () => expectedResponse);

      await store.dispatch(TableAction.requestTable());

      const actualResult: IAction<any>[] = store.getActions();
      const expectedResult: IAction<any>[] = [
        ActionUtility.createAction(TableAction.REQUEST_TABLE),
        ActionUtility.createAction(TableAction.REQUEST_TABLE_FINISHED, expectedResponse),
      ];

      expect(actualResult).toEqual(expectedResult);
    });

    it('has a error response', async () => {
      const expectedResponse = new HttpErrorResponseModel();

      jest.spyOn(TableEffects, 'requestTable').mockImplementation(async () => expectedResponse);

      await store.dispatch(TableAction.requestTable());

      const actualResult: IAction<any>[] = store.getActions();
      const expectedResult: IAction<any>[] = [
        ActionUtility.createAction(TableAction.REQUEST_TABLE),
        ActionUtility.createAction(TableAction.REQUEST_TABLE_FINISHED, expectedResponse, true),
      ];

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
