export default interface IResponseModelBuilder<T> {
  readonly createModels: (responseData: any) => T[];
}
