import { BaseModel } from 'sjs-base-model';

export default class OrderByProductionModel extends BaseModel {
    public readonly id: string = '';
    public readonly product_id: string = '';
    public readonly customer_id: string = '';
    public readonly production_id: string = '';

    constructor(data: Partial<OrderByProductionModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<OrderByProductionModel>): void {
        super.update(data);
    }
}
