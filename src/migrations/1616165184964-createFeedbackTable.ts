import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createfeedbacksTable1616165184964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'feedback',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'content',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'location',
            type: 'varchar',
            isNullable: true,
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
          {
            name: 'updatedAt',
            type: 'datetime',
          },
          {
            name: 'createdAt',
            type: 'datetime',
          },
          {
            name: 'isDeleted',
            type: 'boolean',
          },
          {
            name: 'userId',
            type: 'int',
          },
        ],
      }),
      true,
    );
    queryRunner.clearSqlMemory();
    const foreignKey = new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user',
      onDelete: 'CASCADE',
    });
    await queryRunner.createForeignKey('feedback', foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('feedback');
  }
}
