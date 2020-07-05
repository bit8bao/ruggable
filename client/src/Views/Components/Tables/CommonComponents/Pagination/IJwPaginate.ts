export default interface IJwPaginate {
  readonly totalItems: number;
  readonly currentPage: number;
  readonly pageSize: number;
  readonly totalPages: number;
  readonly startPage: number;
  readonly endPage: number;
  readonly startIndex: number;
  readonly endIndex: number;
  readonly pages: number[];
}
