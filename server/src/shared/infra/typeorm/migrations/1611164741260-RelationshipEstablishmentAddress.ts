import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationshipEstablishmentAddress1611164741260
  implements MigrationInterface {
  name = 'RelationshipEstablishmentAddress1611164741260';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "establishments" ADD "addressId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "establishments" ADD CONSTRAINT "UQ_06edbd9c4ab6f29aaa067f04993" UNIQUE ("addressId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "establishments" ADD CONSTRAINT "FK_06edbd9c4ab6f29aaa067f04993" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "establishments" DROP CONSTRAINT "FK_06edbd9c4ab6f29aaa067f04993"`,
    );
    await queryRunner.query(
      `ALTER TABLE "establishments" DROP CONSTRAINT "UQ_06edbd9c4ab6f29aaa067f04993"`,
    );
    await queryRunner.query(
      `ALTER TABLE "establishments" DROP COLUMN "addressId"`,
    );
  }
}
