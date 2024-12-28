/*
  Warnings:

  - You are about to alter the column `author_id` on the `Snippet` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `Snippet` DROP FOREIGN KEY `Snippet_author_id_fkey`;

-- AlterTable
ALTER TABLE `Snippet` MODIFY `author_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Snippet` ADD CONSTRAINT `Snippet_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
