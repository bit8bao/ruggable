import {BaseModel} from 'sjs-base-model';

/*
    // Returned Api Data Sample
    {
    }
 */
export default class TableModel extends BaseModel {

  //public readonly something: unknown = null;

  /*
   * Client-Side properties (Not from API)
   */
  // public noneApiProperties: unknown = null;

  constructor(data: Partial<TableModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<TableModel>): void {
    super.update(data);
  }

}
