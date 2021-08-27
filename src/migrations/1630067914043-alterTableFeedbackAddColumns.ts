import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableFeedbackAddColumns1630067914043 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE feedback ADD COLUMN userName varchar(255) DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE feedback ADD COLUMN userPhone varchar(255) DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
