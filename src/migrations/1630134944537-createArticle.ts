import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createArticle1630134944537 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'article',
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
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'content',
            type: 'longtext',
          },
          {
            name: 'avatar',
            type: 'varchar',
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
            name: 'adminId',
            type: 'int',
          },
        ],
      }),
      true,
    );
    queryRunner.clearSqlMemory();
    const foreignKey = new TableForeignKey({
      columnNames: ['adminId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'admin',
      onDelete: 'CASCADE',
    });
    await queryRunner.createForeignKey('article', foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
