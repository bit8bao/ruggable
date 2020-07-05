import { BaseModel } from 'sjs-base-model';
import RuggableModel from './RuggableModel';
import CityModel from "./CityModel";

export default class RuggableCitiesModel extends BaseModel {
    public readonly cities: CityModel[] = [CityModel as any];

    constructor(data: Partial<RuggableCitiesModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<RuggableCitiesModel>): void {
        super.update(data);
    }
}
