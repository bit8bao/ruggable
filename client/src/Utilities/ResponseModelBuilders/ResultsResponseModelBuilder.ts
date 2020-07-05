import IResponseModelBuilder from './IResponseModelBuilder';
import IResponseData from '../../Models/API/IResponseData';
import IConstructor from '../../Models/IConstructor';
import IPaginationResponseData from '../../Models/API/IPaginationResponseData';

export default class ResultsResponseModelBuilder<T> implements IResponseModelBuilder<T> {
  private readonly _ModelClass: IConstructor<IResponseData<IPaginationResponseData<T>>>;

  constructor(ModelClass: IConstructor<IResponseData<IPaginationResponseData<T>>>) {
    this._ModelClass = ModelClass;
  }

  public createModels(responseData: IResponseData<IPaginationResponseData<T>>): T[] {
    const responseModel: IResponseData<IPaginationResponseData<T>> = new this._ModelClass(responseData);

    return responseModel.data.results;
  }
}
