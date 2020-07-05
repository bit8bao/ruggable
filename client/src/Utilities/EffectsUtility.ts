import HttpUtility from './HttpUtility';
import { AxiosResponse } from 'axios';
import HttpErrorResponseModel from '../Models/API/HttpErrorResponseModel';
import IResponseData from '../Models/API/IResponseData';
import IResponseModelBuilder from './ResponseModelBuilders/IResponseModelBuilder';
import IConstructor from '../Models/IConstructor';
import IOffsetLimitRequest from '../Models/IOffsetLimitRequest';
import IPagingRequest from '../Models/IPagingRequest';

type FlattenIfArray<T> = T extends (infer R)[] ? R : T;
type SingleItemOrArray<T> = T extends [] ? T[] : T;

export default class EffectsUtility {
  /**
   * Recursive method to make multiple calls to the same endpoint will increasing the offset for each call.
   *
   * @param endpoint The api endpoint path for the request
   * @param request The query string parameters for the request
   * @param builder
   * @param models A growing list of models from each request
   */
  public static async requestUnknownAmountOfOffsetItems<T>(
    endpoint: string,
    request: IOffsetLimitRequest,
    builder: IResponseModelBuilder<T>,
    models: T[] = []
  ): Promise<T[] | HttpErrorResponseModel> {
    const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint, request);

    // If error then just return the HttpErrorResponseModel
    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    const responseData: IResponseData<any> = response.data;
    const latestData: T[] = builder.createModels(responseData);
    // Concat the previous received models with the latest ones
    const tempModels: T[] = [...models, ...latestData];

    // If the current total number of models received is less than the limit then we have requested all the models
    if (latestData.length < request.limit) {
      return tempModels;
    }

    // Increase the offset by the limit we set to continue to get more data
    const newRequest: any = {
      ...request,
      offset: request.offset + request.limit,
    };

    // Recursively request more data
    return EffectsUtility.requestUnknownAmountOfOffsetItems<T>(endpoint, newRequest, builder, tempModels);
  }

  /**
   * Recursive method to make multiple calls to the same endpoint will increasing the offset for each call.
   *
   * @param endpoint The api endpoint path for the request
   * @param request The query string parameters for the request
   * @param builder
   * @param models A growing list of models from each request
   */
  public static async requestUnknownAmountOfPageItems<T>(
    endpoint: string,
    request: IPagingRequest,
    builder: IResponseModelBuilder<T>,
    models: T[] = []
  ): Promise<T[] | HttpErrorResponseModel> {
    const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint, request);

    // If error then just return the HttpErrorResponseModel
    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    const responseData: IResponseData<any> = response.data;
    const latestData: T[] = builder.createModels(responseData);
    // Concat the previous received models with the latest ones
    const tempModels: T[] = [...models, ...latestData];

    // If the current total number of models received is less than the limit then we have requested all the models
    if (latestData.length < request.pageSize) {
      return tempModels;
    }

    // Increase the offset by the limit we set to continue to get more data
    const newRequest: any = {
      ...request,
      page: request.page + 1,
    };

    // Recursively request more data
    return EffectsUtility.requestUnknownAmountOfPageItems<T>(endpoint, newRequest, builder, tempModels);
  }

  public static async getToModel<T>(
    Model: IConstructor<FlattenIfArray<T>>,
    endpoint: string,
    params?: any
  ): Promise<SingleItemOrArray<T> | HttpErrorResponseModel> {
    const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint, params);

    return EffectsUtility._restModelCreator<T>(Model, response);
  }

  public static async postToModel<T>(
    Model: IConstructor<FlattenIfArray<T>>,
    endpoint: string,
    data?: any
  ): Promise<SingleItemOrArray<T> | HttpErrorResponseModel> {
    const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.post(endpoint, data);

    return EffectsUtility._restModelCreator<T>(Model, response);
  }

  private static _restModelCreator<T>(
    Model: IConstructor<FlattenIfArray<T>>,
    response: AxiosResponse | HttpErrorResponseModel
  ): SingleItemOrArray<T> | HttpErrorResponseModel {
    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return !Array.isArray(response.data) ? new Model(response.data) : (response.data.map((json) => new Model(json)) as any);
  }
}
