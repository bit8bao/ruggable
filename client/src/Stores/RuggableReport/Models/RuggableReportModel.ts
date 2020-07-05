import { BaseModel } from 'sjs-base-model';
import RuggableModel from './RuggableModel';

export default class RuggableReportModel extends BaseModel {
  public readonly productionByCity: RuggableModel[] = [RuggableModel as any];

  constructor(data: Partial<RuggableReportModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<RuggableReportModel>): void {
    super.update(data);
  }
}
