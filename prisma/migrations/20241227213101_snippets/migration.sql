-- CreateTable
CREATE TABLE `Language` (
    `language_id` INTEGER NOT NULL,
    `language_name` VARCHAR(191) NOT NULL,
    `extension` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Language_language_name_key`(`language_name`),
    UNIQUE INDEX `Language_extension_key`(`extension`),
    PRIMARY KEY (`language_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Snippet` (
    `snippet_id` VARCHAR(191) NOT NULL,
    `author_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `source_code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_private` BOOLEAN NOT NULL DEFAULT false,
    `language_id` INTEGER NOT NULL,

    INDEX `Snippet_created_at_idx`(`created_at`),
    INDEX `Snippet_author_id_idx`(`author_id`),
    INDEX `Snippet_language_id_idx`(`language_id`),
    INDEX `Snippet_author_id_is_private_idx`(`author_id`, `is_private`),
    PRIMARY KEY (`snippet_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `Snippet` ADD CONSTRAINT `Snippet_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `Language`(`language_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Snippet` ADD CONSTRAINT `Snippet_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
