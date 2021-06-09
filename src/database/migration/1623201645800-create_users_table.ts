import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsersTable1623201645800 implements MigrationInterface {

	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "users",
			columns: [
				{
					name: "id",
					type: "int",
					isPrimary: true
				},
				{
					name: "firstName",
					type: "varchar(15)",
				},
				{
					name: "lastName",
					type: "varchar(31)",
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
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users");
	}

}