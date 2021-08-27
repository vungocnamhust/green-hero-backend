import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableFeedback1618682902840 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE feedback MODIFY COLUMN content varchar(10000)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE feedback MODIFY COLUMN content varchar`);
  }
}
