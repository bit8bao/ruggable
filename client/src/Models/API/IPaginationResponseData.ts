export default interface IPaginationResponseData<T> {
  readonly totalResults: number;
  readonly results: T[];
  readonly request?: any;
}
