/*
  Warnings:

  - Made the column `message` on table `contact` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "contact" ALTER COLUMN "message" SET NOT NULL;
