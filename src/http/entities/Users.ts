import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Users {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  status: number;

}
