import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnStatus1630206221655 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE media ADD COLUMN status varchar(255) DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
