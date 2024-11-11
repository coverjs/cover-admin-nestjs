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
    `name` VARCHAR(191) NOT NULL,
    `menu_code` VARCHAR(191) NOT NULL,
    `order` INTEGER NULL,
    `parentId` INTEGER NULL,

    UNIQUE INDEX `co_menus_name_key`(`name`),
    UNIQUE INDEX `co_menus_menu_code_key`(`menu_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `co_permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `order` INTEGER NULL,
    `parentId` INTEGER NULL,
    `icon` VARCHAR(191) NULL,
    `component` VARCHAR(191) NULL,
    `path` VARCHAR(191) NULL,
    `type` ENUM('MENU', 'BUTTON') NOT NULL DEFAULT 'MENU',
    `status` INTEGER NOT NULL DEFAULT 1,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `co_permissions_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `co_permission_relation_role` (
    `permissionId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`permissionId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `co_users` ADD CONSTRAINT `co_users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `co_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `co_menus` ADD CONSTRAINT `co_menus_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `co_menus`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `co_permissions` ADD CONSTRAINT `co_permissions_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `co_permissions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `co_permission_relation_role` ADD CONSTRAINT `co_permission_relation_role_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `co_permissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `co_permission_relation_role` ADD CONSTRAINT `co_permission_relation_role_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `co_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
