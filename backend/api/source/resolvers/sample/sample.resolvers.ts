import { IRuggableContext } from "../../context";
import { SampleProvider } from "./sample.provider";
// @ts-ignore
import { InputCreateSample } from "@types";

export default {
  Query: {
    sample: (parent: never, data: { id: string }, ctx: IRuggableContext) => {
      return ctx.get(SampleProvider).loadOne(data.id);
    },
    samples: (
      _parent: never,
      params: { offset: number; limit: number },
      ctx: IRuggableContext
    ) => {
      return ctx.get(SampleProvider).getMany({
        skip: params.offset || 0,
        take: params.limit || 50,
      });
    },
  },
  Mutation: {
    createSample: (
      parent: never,
      data: { input: InputCreateSample },
      ctx: IRuggableContext
    ) => {
      return ctx.get(SampleProvider).create(data.input);
    },
  },
};
