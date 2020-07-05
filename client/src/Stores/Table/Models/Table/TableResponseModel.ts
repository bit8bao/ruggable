import {BaseModel} from 'sjs-base-model';
import TableModel from './TableModel';

/*
    // Returned Api Data Sample
    {
      "data": null,
      "success": true,
      "errors": []
    }
 */
export default class TableResponseModel extends BaseModel {

  public readonly data: TableModel = TableModel as any;
  public readonly success: boolean = true;
  public readonly errors: string[] = [];

  /*
   * Client-Side properties (Not from API)
   */
  // public noneApiProperties: unknown = null;

  constructor(data: Partial<TableResponseModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<TableResponseModel>): void {
    super.update(data);
  }

}
