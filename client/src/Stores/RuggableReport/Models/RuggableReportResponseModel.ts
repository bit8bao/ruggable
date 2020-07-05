import { BaseModel } from 'sjs-base-model';
import IResponseData from '../../../Models/API/IResponseData';
import RuggableReportModel from './RuggableReportModel';

export default class RuggableReportResponseModel extends BaseModel implements IResponseData<RuggableReportModel> {
  public readonly data: RuggableReportModel = RuggableReportModel as any;
  public readonly success: boolean = true;
  public readonly errors: string[] = [];

  constructor(data: Partial<RuggableReportResponseModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<RuggableReportResponseModel>): void {
    super.update(data);
  }
}
