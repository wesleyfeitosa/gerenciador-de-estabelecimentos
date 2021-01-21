import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateAvatarEstablishment1611169289908
  implements MigrationInterface {
  name = 'CreateAvatarEstablishment1611169289908';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "establishments" ADD "avatar" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "establishments" DROP COLUMN "avatar"`,
    );
  }
}
