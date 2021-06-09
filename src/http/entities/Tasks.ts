import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import Users from './Users';

@Entity()
export default class Tasks {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  status: number;


  @ManyToOne(() => Users)
  user: Users;

}
