import { IRuggableContext } from "../../context";
import { ProductionProvider } from "./production.provider";
import { InputCreateProduction } from "@types";

export default {
  Query: {
    production: (parent: never, data: { id: string }, ctx: IRuggableContext) => {
      return ctx.get(ProductionProvider).loadOne(data.id);
    },
    productionByCity:  (parent: never, data: { city_id: string }, ctx: IRuggableContext) => {
      return ctx.get(ProductionProvider).getMany({ where: { city_id: data.city_id }});
    },
    productions: (
      _parent: never,
      params: { offset: number; limit: number },
      ctx: IRuggableContext
    ) => {
      return ctx.get(ProductionProvider).getMany({
        skip: params.offset || 0,
        take: params.limit || 50,
      });
    },
  },
  Mutation: {
    createProduction: (
      parent: never,
      data: { input: InputCreateProduction },
      ctx: IRuggableContext
    ) => {
      return ctx.get(ProductionProvider).create(data.input);
    },
  },
};
