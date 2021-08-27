import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserTable1616162823072 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: false,
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'province',
            type: 'varchar',
            isUnique: false,
            isNullable: true,
          },
          {
            name: 'district',
            type: 'varchar',
            isUnique: false,
            isNullable: true,
          },
          {
            name: 'ward',
            type: 'varchar',
            isUnique: false,
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            isUnique: false,
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
