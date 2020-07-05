import environment from 'environment';
import TableEffects from './TableEffects';
import TableResponseModel from './Models/Table/TableResponseModel';

describe('TableEffects', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('requestTable', () => {
    it('returns response model and called with correct data', async () => {
      await effectsSuccessWithModelTestUtility({
        effectMockResponse: null,
        effect: TableEffects.requestTable,
        effectArgs: [],
        effectCalledWith: { url: environment.api.table, method: RequestMethod.Get },
        effectResponseModel: TableResponseModel,
      });
    });

    it('returns error model', async () => {
      await effectsErrorTestUtility({
        effect: TableEffects.requestTable,
        effectArgs: [],
      });
    });
  });
});
