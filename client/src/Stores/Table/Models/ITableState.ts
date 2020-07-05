import TableModel from './Table/TableModel';

export default interface ITableState {
  readonly table: TableModel | null;
  readonly sortFlag: boolean;
}
