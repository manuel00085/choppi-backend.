import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1764224033160 implements MigrationInterface {
    name = 'Init1764224033160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "description" character varying, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store_product" ("id" SERIAL NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "storeId" integer, "productId" integer, CONSTRAINT "PK_de6af3a8762c59860794f42d8f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "store_product" ADD CONSTRAINT "FK_8988ebd2c1c321738c3bfa4c9b4" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_product" ADD CONSTRAINT "FK_13e275149d7414c2694da12dcf7" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_product" DROP CONSTRAINT "FK_13e275149d7414c2694da12dcf7"`);
        await queryRunner.query(`ALTER TABLE "store_product" DROP CONSTRAINT "FK_8988ebd2c1c321738c3bfa4c9b4"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "store_product"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
