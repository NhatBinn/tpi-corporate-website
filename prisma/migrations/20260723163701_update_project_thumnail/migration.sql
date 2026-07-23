/*
  Warnings:

  - Made the column `thumbnail_url` on table `project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "project" ALTER COLUMN "thumbnail_url" SET NOT NULL;
