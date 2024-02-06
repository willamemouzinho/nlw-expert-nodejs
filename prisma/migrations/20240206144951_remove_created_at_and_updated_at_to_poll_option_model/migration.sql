/*
  Warnings:

  - You are about to drop the column `createdAt` on the `poll_options` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `poll_options` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "poll_options" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
