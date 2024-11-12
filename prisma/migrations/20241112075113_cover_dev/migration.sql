/*
  Warnings:

  - The values [PAGE] on the enum `co_menus_type` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `sort` on table `co_menus` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `co_menus` MODIFY `sort` INTEGER NOT NULL,
    MODIFY `type` ENUM('DIRECTORY', 'MENU', 'BUTTON') NOT NULL DEFAULT 'DIRECTORY';
