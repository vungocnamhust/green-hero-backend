import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableColumnValidateStatus1630126107182 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE feedback ADD COLUMN validateStatus varchar(255) DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
