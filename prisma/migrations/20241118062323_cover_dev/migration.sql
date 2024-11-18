-- CreateTable
CREATE TABLE `co_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `nickname` VARCHAR(191) NULL,
    `salt` VARCHAR(191) NOT NULL DEFAULT '',
    `roleId` INTEGER NOT NULL,
    `enable` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `co_users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `co_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `co_roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `co_menus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `locale` VARCHAR(50) NULL DEFAULT '',
    `icon` VARCHAR(50) NULL,
    `code` VARCHAR(191) NOT NULL,
    `sort` INTEGER NOT NULL,
    `type` ENUM('DIRECTORY', 'MENU', 'ACTION') NOT NULL DEFAULT 'DIRECTORY',
    `path` VARCHAR(191) NULL DEFAULT '',
    `parentId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `co_menus_name_key`(`name`),
    UNIQUE INDEX `co_menus_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_menu_to_role` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_menu_to_role_AB_unique`(`A`, `B`),
    INDEX `_menu_to_role_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `co_users` ADD CONSTRAINT `co_users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `co_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `co_menus` ADD CONSTRAINT `co_menus_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `co_menus`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_menu_to_role` ADD CONSTRAINT `_menu_to_role_A_fkey` FOREIGN KEY (`A`) REFERENCES `co_menus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_menu_to_role` ADD CONSTRAINT `_menu_to_role_B_fkey` FOREIGN KEY (`B`) REFERENCES `co_roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
