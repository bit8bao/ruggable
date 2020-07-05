import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { createServer } from "http";

import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";
import Container from "typedi";
import { createConnection, useContainer, Connection } from "typeorm";

import typeDefs from "./source/schema";
import resolvers from "./source/resolvers";
import { IRuggableContext } from "./source/context";

let apollo: ApolloServer;
let connection: Connection;

async function startServer(
  port: number,
  ctx: (req: express.Request, connection: Connection) => IRuggableContext
) {
  useContainer(Container);
  connection = await createConnection();
  Container.set("connection", connection);

  apollo = new ApolloServer({
    schema: buildFederatedSchema([
      {
        typeDefs: gql`
          ${typeDefs}
        `,
        resolvers
      }
    ]),

    context: ({ req }): IRuggableContext => {
      return ctx(req, connection);
    },

    formatError(error) {
      return error;
    },

    // formatResponse: (
    //   response: any,
    //   { context }: ResolverData<IRuggableContext>
    // ) => {
    //   Container.reset(context.requestId);
    //   return response;
    // }
  });

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  // todo just use npm
  app.get("/healthz/live", (req, res) => {
    res.send("Alive");
  });

  const server = createServer(app);
  apollo.installSubscriptionHandlers(server);

  await apollo.listen(port);
  console.log(`server is running at http://localhost:${port}/graphql`);
}

async function stopServer() {
  await connection.close();
  await apollo.stop();
  console.log(`server has shut down`);
}

export { startServer, stopServer };
