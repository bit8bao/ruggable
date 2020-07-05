import IResponseModelBuilder from './IResponseModelBuilder';
import IResponseData from '../../Models/API/IResponseData';
import IConstructor from '../../Models/IConstructor';

export default class SimpleResponseModelBuilder<T> implements IResponseModelBuilder<T> {
  private readonly _ModelClass: IConstructor<T>;

  constructor(ModelClass: IConstructor<T>) {
    this._ModelClass = ModelClass;
  }

  public createModels(responseData: IResponseData<T[]>): T[] {
    return responseData.data.map((data: Partial<T>) => new this._ModelClass(data));
  }
}
