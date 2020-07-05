import { BaseModel } from 'sjs-base-model';
import OrderByProductionModel from "./OrderByProductionModel";

export default class OrderByProductionReportModel extends BaseModel {
    public readonly orderByProduction: OrderByProductionModel[] = [OrderByProductionModel as any];

    constructor(data: Partial<OrderByProductionReportModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<OrderByProductionReportModel>): void {
        super.update(data);
    }
}
