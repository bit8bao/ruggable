import * as DataLoader from "dataloader";
import {Repository, FindManyOptions, FindOneOptions} from "typeorm";
import { Inject } from "typedi";
import { IRuggableContext } from "../context";
import {BasicEntity} from "@entity/basic-entity";

export abstract class BaseProvider<T extends BasicEntity> {
  context: IRuggableContext;
  repository: Repository<T>;
  loader: DataLoader<string, T[]>;
  loadRelations: string[];

  constructor(@Inject("context") context: IRuggableContext) {
    this.context = context;
    this.loader = this.getLoader();
  }

  async loadOne(id: string): Promise<T | null > {
      if(!id){
          return null;
      }
    return this.loader.load(id).then(x => (x ? x[0] : null));
  }

  async loadMany(id: string): Promise<T[]> {
    return this.loader.load(id);
  }

  async getOne(options?: FindOneOptions<T>): Promise<T> {
    return this.repository.findOneOrFail(options);
  }

  async getMany(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  getLoader() {
    return new DataLoader(async ids => {
      const data =
        this.loadRelations && this.loadRelations.length > 0
          ? await this.repository.findByIds(ids, {
              relations: this.loadRelations
            })
          : await this.repository.findByIds(ids);

      const map = ids.map((id: any) =>
        data.filter(x => id.toString() === x.id.toString())
      );
      return map;
    });
  }
}
