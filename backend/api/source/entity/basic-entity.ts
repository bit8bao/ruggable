import {
  BaseEntity,
  Column
} from "typeorm";

export abstract class BasicEntity extends BaseEntity {
  abstract id: string;

  @Column( {type: "timestamp"})
  created_at: Date;

  @Column({type: "timestamp"})
  updated_at: Date;

  // tslint:disable-next-line: ban-types
  abstract self: Function;
}
