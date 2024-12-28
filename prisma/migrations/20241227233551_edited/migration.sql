-- DropForeignKey
ALTER TABLE `Snippet` DROP FOREIGN KEY `Snippet_author_id_fkey`;

-- AlterTable
ALTER TABLE `Snippet` MODIFY `author_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Snippet` ADD CONSTRAINT `Snippet_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
