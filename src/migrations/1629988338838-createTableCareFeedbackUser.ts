import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createTableCareFeedbackUser1629988338838 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'care_feedback_user',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'feedbackId',
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
        await queryRunner.createForeignKey('care_feedback_user', userForeignKey);

        const feedbackForeignKey = new TableForeignKey({
            columnNames: ['feedbackId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'feedback',
            onDelete: 'CASCADE',
        });
        await queryRunner.createForeignKey('care_feedback_user', feedbackForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('care_feedback_user');
    }

}
