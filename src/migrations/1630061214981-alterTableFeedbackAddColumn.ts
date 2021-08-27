import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableFeedbackAddColumn1630061214981 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE feedback ADD COLUMN status varchar(10000) DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
