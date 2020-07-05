import { BaseModel } from 'sjs-base-model';
import IResponseData from '../../../Models/API/IResponseData';
import OrderByProductionReportModel from "./OrderByProductionReportModel";

export default class OrdersByProductionResponseModel extends BaseModel implements IResponseData<OrderByProductionReportModel> {
    public readonly data: OrderByProductionReportModel = OrderByProductionReportModel as any;
    public readonly success: boolean = true;
    public readonly errors: string[] = [];

    constructor(data: Partial<OrdersByProductionResponseModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<OrdersByProductionResponseModel>): void {
        super.update(data);
    }
}
