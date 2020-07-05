import { BaseModel } from 'sjs-base-model';

export default class CityModel extends BaseModel {
    public readonly id: string = '';
    public readonly city_name: string = '';

    constructor(data: Partial<CityModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<CityModel>): void {
        super.update(data);
    }
}
