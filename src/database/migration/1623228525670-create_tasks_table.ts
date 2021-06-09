import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createTasksTable1623228525670 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.connect();

		await queryRunner.createTable(new Table({
			name: "tasks",
			columns: [
				{
					name: "id",
					type: "int",
					isPrimary: true
				},
				{
					name: "title",
					type: "varchar(63)",
				},
				{
					name: "content",
					type: "varchar(255)",
				},
				{
					name: "status",
					type: "tinyint",
				},
				{
					name: "age",
					type: "int",
				},
				{
					name: "userId",
					type: "int"
				},
				{
					name: 'created_at',
					type: 'timestamp',
					default: 'now()'
				},
				{
					name: 'updated_at',
					type: 'timestamp',
					default: 'now()'
				}
			]
		}), true)

		await queryRunner.createForeignKey("tasks", new TableForeignKey({
			columnNames: ["userId"],
			referencedColumnNames: ["id"],
			referencedTableName: "users",
		}));

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("tasks");
	}

}
