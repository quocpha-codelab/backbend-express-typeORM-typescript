import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Users {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  status: number;

}
