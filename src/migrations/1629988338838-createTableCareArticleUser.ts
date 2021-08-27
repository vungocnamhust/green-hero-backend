import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createTableCareArticleUser1629988338838 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'care_article_user',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'articleId',
                        type: 'int',
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
        const userForeignKey = new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        });
        await queryRunner.createForeignKey('care_article_user', userForeignKey);

        const articleForeignKey = new TableForeignKey({
            columnNames: ['articleId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'article',
            onDelete: 'CASCADE',
        });
        await queryRunner.createForeignKey('care_article_user', articleForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('care_article_user');
    }

}
