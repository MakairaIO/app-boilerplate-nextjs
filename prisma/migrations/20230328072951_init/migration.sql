-- CreateTable
CREATE TABLE `app_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `makaira_domain` VARCHAR(191) NOT NULL,
    `makaira_instance` VARCHAR(191) NOT NULL,
    `app_slug` VARCHAR(191) NOT NULL,
    `app_secret` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
