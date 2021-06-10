import { UserStatus } from "../../enums/UserStatus";
import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class createUsersTable1623201645800 implements MigrationInterface {

	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "users",
			columns: [
				{
					name: "id",
					type: "int",
					isPrimary: true,
				},
				{
					name: "username",
					type: "varchar(31)",
				},
				{
					name: "password",
					type: "varchar",
				},
				{
					name: "fullName",
					type: "varchar(127)",
				},
				{
					name: "status",
					type: "tinyint",
					default: UserStatus.ACTIVE,
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
		}), true);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users");
	}

}