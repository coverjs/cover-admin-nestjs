/*
  Warnings:

  - You are about to drop the column `enName` on the `co_menus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `co_menus` DROP COLUMN `enName`,
    ADD COLUMN `locale` VARCHAR(50) NULL DEFAULT '';
