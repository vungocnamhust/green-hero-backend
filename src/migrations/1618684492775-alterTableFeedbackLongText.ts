import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableFeedbackLongText1618684492775 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE feedback MODIFY COLUMN content LONGTEXT`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE feedback MODIFY COLUMN content varchar`);
  }
}
