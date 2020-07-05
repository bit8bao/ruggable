import { Connection } from "typeorm";
import { ContainerInstance, ObjectType } from "typedi";

export interface IRuggableContext {
  container: ContainerInstance;
  connection: Connection;

  requestId: string;
  username: string;

  get<T>(type: ObjectType<T>): T;
}

export class RuggableContext implements IRuggableContext {
  container: ContainerInstance;
  connection: Connection;

  requestId: string;
  username: string;

  constructor(
    container: ContainerInstance,
    connection: Connection,
    requestId: string,
    username: string
  ) {
    this.container = container;
    this.connection = connection;
    this.requestId = requestId;
    this.username = username;
  }

  get<T>(type: ObjectType<T>): T {
    return this.container.get(type);
  }
}

export interface ArgsDictionary {
  [argName: string]: any;
}

export interface ResolverData<ContextType = {}> {
  root: any;
  args: ArgsDictionary;
  context: ContextType;
  info: any;
}
