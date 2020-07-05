import { IRuggableContext } from "../../context";
import { OrderProvider } from "./order.provider";
import { InputCreateOrder } from "@types";
import { resolvers } from 'graphql-scalars';


export default {
  ...resolvers,
  Query: {
    order: (parent: never, data: { id: string }, ctx: IRuggableContext) => {
      return ctx.get(OrderProvider).loadOne(data.id);
    },
    orderByProduction:  (parent: never, data: { production_id: string }, ctx: IRuggableContext) => {
      return ctx.get(OrderProvider).getMany({where: {production_id: data.production_id}});
    },
    orders: (
      _parent: never,
      params: { offset: number; limit: number },
      ctx: IRuggableContext
    ) => {
      return ctx.get(OrderProvider).getMany({
        skip: params.offset || 0,
        take: params.limit || 50,
      });
    },
  },
  Mutation: {
    createOrder: (
      parent: never,
      data: { input: InputCreateOrder },
      ctx: IRuggableContext
    ) => {
      return ctx.get(OrderProvider).create(data.input);
    },
  },
};
