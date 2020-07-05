import HttpErrorResponseModel from '../../../Models/API/HttpErrorResponseModel';

export default interface IErrorState {
  readonly [key: string]: HttpErrorResponseModel;
}
