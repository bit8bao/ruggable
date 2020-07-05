import {IRuggableContext} from "../../context";
import {Inject, Service} from "typedi";
import {Repository} from "typeorm";
import {Sample} from "@entity/sample";
import {BaseProvider} from "../base.provider";
import {InputCreateSample} from "@types";
import {createFrom} from "@shared/injector";

@Service()
export class SampleProvider extends BaseProvider<Sample> {
    repository: Repository<Sample>;

    constructor(@Inject("context") context: IRuggableContext) {
        super(context);
        this.repository = context.connection.getRepository(Sample);
    }

    async create(input: InputCreateSample) : Promise<Sample> {
        const sample = createFrom(Sample, input);
        sample.created_at = new Date();
        sample.updated_at = new Date();
        return this.repository.save(sample);
    }
}
