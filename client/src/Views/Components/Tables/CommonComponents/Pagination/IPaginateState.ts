import PaginationEnum from './PaginationEnum';

export default interface IPaginateState<T = unknown> {
  readonly indexEnd: number;
  readonly indexesOfItems: T[];
  readonly indexStart: number;
  readonly itemsEnd: number;
  readonly itemsPerPage: number;
  readonly itemsStart: number;
  readonly itemsTotal: number;
  readonly pageCurrent: number;
  readonly pageEnd: number;
  readonly pages: number[];
  readonly pageStart: number;
  readonly pageTotal: number;
  readonly type: PaginationEnum;
}
