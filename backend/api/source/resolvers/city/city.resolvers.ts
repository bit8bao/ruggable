import { IRuggableContext } from "../../context";
import { CityProvider } from "./city.provider";
import { InputCreateCity } from "@types";

export default {
  Query: {
    city: (parent: never, data: { id: string }, ctx: IRuggableContext) => {
      return ctx.get(CityProvider).loadOne(data.id);
    },
    cities: (
      _parent: never,
      params: { offset: number; limit: number },
      ctx: IRuggableContext
    ) => {
      return ctx.get(CityProvider).getMany({
        skip: params.offset || 0,
        take: params.limit || 50,
      });
    },
  },
  Mutation: {
    createCity: (
      parent: never,
      data: { input: InputCreateCity },
      ctx: IRuggableContext
    ) => {
      return ctx.get(CityProvider).create(data.input);
    },
  },
};
