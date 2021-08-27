import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createMediaTable1629880436078 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'media',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'url',
                        type: 'varchar',
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                    },
                    {
                        name: 'feedbackId',
                        type: 'int',
                    },
                ],
            }),
            true,
        );
        queryRunner.clearSqlMemory();
        const foreignKey = new TableForeignKey({
            columnNames: ['feedbackId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'feedback',
            onDelete: 'CASCADE',
        });
        await queryRunner.createForeignKey('media', foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('media');
    }

}
