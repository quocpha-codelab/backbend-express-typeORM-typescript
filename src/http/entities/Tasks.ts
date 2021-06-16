import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import Users from './Users';

@Entity()
export default class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  status: number;

  @Column({ type: Date })
  date: string;

  @Column()
  rank: number | null;

  @ManyToOne(() => Users)
  user: Users;
}
