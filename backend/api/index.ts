import "reflect-metadata";
import "module-alias/register";

import * as uuidv4 from "uuid/v4";
import * as express from "express";
import Container from "typedi";

import { Connection } from "typeorm";
import { RuggableContext, IRuggableContext } from "./source/context";
import { startServer } from "./server";

// * build our context that gets passed through each request
const buildContext = (
  req: express.Request,
  connection: Connection
): IRuggableContext => {
  const requestId = req.headers["x-request-id"] || uuidv4();
  const username = req.headers.username
    ? req.headers.username.toString()
    : "unknown";

  const container = Container.of(requestId.toString());
  container.set("connection", connection);

  const context = new RuggableContext(
    container,
    connection,
    requestId.toString(),
    username
  );
  container.set("context", context);

  return context;
};

// * let's start the server
startServer(4004, buildContext);
