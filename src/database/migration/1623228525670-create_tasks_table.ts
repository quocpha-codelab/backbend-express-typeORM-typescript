import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

import { TaskStatus } from '../../enums/Task';

export class createTasksTable1623228525670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connect();

    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'content',
            type: 'varchar(255)',
          },
          {
            name: 'status',
            type: 'tinyint',
            default: TaskStatus.OPEN,
          },
          {
            name: 'position',
            type: 'int',
          },
          {
            name: 'date',
            type: 'date',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );

    await queryRunner.createIndex(
      'tasks',
      new TableIndex({
        columnNames: ['date', 'userId'],
      }),
    );

    await queryRunner.query(`ALTER TABLE tasks ADD CONSTRAINT uniqueTaskPosition UNIQUE (date, position, userId)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
