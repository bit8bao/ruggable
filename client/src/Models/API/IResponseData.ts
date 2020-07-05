/*
  // Returned Api Data Sample
  {
    "data": {},
    "success": true,
    "errors": []
  }
 */
export default interface IResponseData<T> {
  readonly data: T;
  readonly success: boolean;
  readonly errors: string[];
}
