CREATE TABLE `RuleDocument` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `scope` ENUM('GENERAL', 'SERIES') NOT NULL DEFAULT 'GENERAL',
    `seriesSlug` VARCHAR(100) NULL,
    `bodyHtml` LONGTEXT NOT NULL,
    `publishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RuleDocument_slug_key`(`slug`),
    INDEX `RuleDocument_scope_seriesSlug_idx`(`scope`, `seriesSlug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
