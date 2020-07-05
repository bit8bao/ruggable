import {IRuggableContext} from "../../context";
import {Inject, Service} from "typedi";
import {Repository} from "typeorm";
import {Production} from "@entity/production";
import {BaseProvider} from "../base.provider";
import {InputCreateProduction} from "@types";
import {createFrom} from "@shared/injector";

@Service()
export class ProductionProvider extends BaseProvider<Production> {
    repository: Repository<Production>;

    constructor(@Inject("context") context: IRuggableContext) {
        super(context);
        this.repository = context.connection.getRepository(Production);
    }

    async create(input: InputCreateProduction) : Promise<Production> {
        const production = createFrom(Production, input);
        production.created_at = new Date();
        production.updated_at = new Date();
        return this.repository.save(production);
    }
}
