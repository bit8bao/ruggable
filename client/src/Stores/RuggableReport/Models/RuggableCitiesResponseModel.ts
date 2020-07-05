import { BaseModel } from 'sjs-base-model';
import IResponseData from '../../../Models/API/IResponseData';
import RuggableReportModel from './RuggableReportModel';
import RuggableCitiesModel from "./RuggableCitiesModel";

export default class RuggableCitiesResponseModel extends BaseModel implements IResponseData<RuggableCitiesModel> {
    public readonly data: RuggableCitiesModel = RuggableCitiesModel as any;
    public readonly success: boolean = true;
    public readonly errors: string[] = [];

    constructor(data: Partial<RuggableCitiesResponseModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<RuggableCitiesResponseModel>): void {
        super.update(data);
    }
}
