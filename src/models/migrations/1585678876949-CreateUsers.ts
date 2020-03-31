import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsers1585678876949 implements MigrationInterface {
    name = 'CreateUsers1585678876949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "passwordHash" character varying(256) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "passwordSalt" character varying(256) NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordSalt"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordHash"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(256) NOT NULL`, undefined);
    }

}
