import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableModifyUser1630129343206 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE user MODIFY COLUMN name varchar(255) DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE user MODIFY COLUMN phone varchar(255) DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
