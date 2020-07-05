import {IRuggableContext} from "../../context";
import {Inject, Service} from "typedi";
import {Repository} from "typeorm";
import {City} from "@entity/city";
import {BaseProvider} from "../base.provider";
import {InputCreateCity} from "@types";
import {createFrom} from "@shared/injector";

@Service()
export class CityProvider extends BaseProvider<City> {
    repository: Repository<City>;

    constructor(@Inject("context") context: IRuggableContext) {
        super(context);
        this.repository = context.connection.getRepository(City);
    }

    async create(input: InputCreateCity) : Promise<City> {
        const city = createFrom(City, input);
        city.created_at = new Date();
        city.updated_at = new Date();
        return this.repository.save(city);
    }
}
