import { BaseModel } from 'sjs-base-model';

export default class RuggableModel extends BaseModel {
  public readonly id: string = '';
  public readonly prod_line: string = '';
  public readonly prod_type: string = '';
  public readonly city_id: string = '';

  constructor(data: Partial<RuggableModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<RuggableModel>): void {
    super.update(data);
  }
}
