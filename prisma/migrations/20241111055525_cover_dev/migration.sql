/*
  Warnings:

  - You are about to drop the column `menu_code` on the `co_menus` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `co_menus` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `co_menus` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to drop the `co_permission_relation_role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `co_permissions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `co_menus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `co_menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `co_menus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `co_permission_relation_role` DROP FOREIGN KEY `co_permission_relation_role_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `co_permission_relation_role` DROP FOREIGN KEY `co_permission_relation_role_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `co_permissions` DROP FOREIGN KEY `co_permissions_parentId_fkey`;

-- DropIndex
DROP INDEX `co_menus_menu_code_key` ON `co_menus`;

-- AlterTable
ALTER TABLE `co_menus` DROP COLUMN `menu_code`,
    DROP COLUMN `order`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `path` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `sort` INTEGER NULL,
    ADD COLUMN `type` ENUM('DIRECTORY', 'PAGE', 'BUTTON') NOT NULL DEFAULT 'DIRECTORY',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `name` VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE `co_permission_relation_role`;

-- DropTable
DROP TABLE `co_permissions`;

-- CreateTable
CREATE TABLE `_menu_to_role` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_menu_to_role_AB_unique`(`A`, `B`),
    INDEX `_menu_to_role_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `co_menus_code_key` ON `co_menus`(`code`);

-- AddForeignKey
ALTER TABLE `_menu_to_role` ADD CONSTRAINT `_menu_to_role_A_fkey` FOREIGN KEY (`A`) REFERENCES `co_menus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_menu_to_role` ADD CONSTRAINT `_menu_to_role_B_fkey` FOREIGN KEY (`B`) REFERENCES `co_roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
