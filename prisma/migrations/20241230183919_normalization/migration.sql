-- DropForeignKey
ALTER TABLE `Snippet` DROP FOREIGN KEY `Snippet_author_id_fkey`;

-- DropIndex
DROP INDEX `Snippet_author_id_idx` ON `Snippet`;

-- DropIndex
DROP INDEX `Snippet_author_id_is_private_idx` ON `Snippet`;

-- CreateTable
CREATE TABLE `UserSnippet` (
    `user_id` INTEGER NOT NULL,
    `snippet_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_id`, `snippet_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserSnippet` ADD CONSTRAINT `UserSnippet_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSnippet` ADD CONSTRAINT `UserSnippet_snippet_id_fkey` FOREIGN KEY (`snippet_id`) REFERENCES `Snippet`(`snippet_id`) ON DELETE CASCADE ON UPDATE CASCADE;
