/*
  Warnings:

  - You are about to drop the column `categoryId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `isBestSeller` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `isFeatured` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `isNew` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `salePrice` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `seoDescription` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `seoTitle` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `product_image` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product_image` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `product_image` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `solution` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `solution` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `solution` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `solution` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `solution` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `solution` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `solution_category` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `solution_category` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `solution_category` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `solution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `solution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `solution_category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_parentId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "product_image" DROP CONSTRAINT "product_image_productId_fkey";

-- DropForeignKey
ALTER TABLE "solution" DROP CONSTRAINT "solution_categoryId_fkey";

-- DropIndex
DROP INDEX "product_isBestSeller_idx";

-- DropIndex
DROP INDEX "product_isFeatured_idx";

-- DropIndex
DROP INDEX "product_isNew_idx";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "categoryId",
DROP COLUMN "createdAt",
DROP COLUMN "isBestSeller",
DROP COLUMN "isFeatured",
DROP COLUMN "isNew",
DROP COLUMN "salePrice",
DROP COLUMN "seoDescription",
DROP COLUMN "seoTitle",
DROP COLUMN "updatedAt",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_best_seller" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_new" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sale_price" DECIMAL(12,2),
ADD COLUMN     "seo_description" TEXT,
ADD COLUMN     "seo_title" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "product_image" DROP COLUMN "createdAt",
DROP COLUMN "productId",
DROP COLUMN "sortOrder",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "solution" DROP COLUMN "categoryId",
DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
DROP COLUMN "isPublished",
DROP COLUMN "sortOrder",
DROP COLUMN "updatedAt",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "solution_category" DROP COLUMN "createdAt",
DROP COLUMN "sortOrder",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "category";

-- CreateTable
CREATE TABLE "product_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "parent_id" TEXT,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "description" TEXT,
    "thumbnail_url" TEXT,
    "location" TEXT,
    "investor" TEXT,
    "contractor" TEXT,
    "area" TEXT,
    "construction_time" TEXT,
    "completed_year" INTEGER,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "project_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_category_slug_key" ON "product_category"("slug");

-- CreateIndex
CREATE INDEX "product_category_parent_id_idx" ON "product_category"("parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "project_slug_key" ON "project"("slug");

-- CreateIndex
CREATE INDEX "project_is_published_idx" ON "project"("is_published");

-- CreateIndex
CREATE INDEX "project_is_featured_idx" ON "project"("is_featured");

-- CreateIndex
CREATE INDEX "project_category_id_idx" ON "project"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "project_category_slug_key" ON "project_category"("slug");

-- CreateIndex
CREATE INDEX "project_image_project_id_idx" ON "project_image"("project_id");

-- CreateIndex
CREATE INDEX "product_is_featured_idx" ON "product"("is_featured");

-- CreateIndex
CREATE INDEX "product_is_new_idx" ON "product"("is_new");

-- CreateIndex
CREATE INDEX "product_is_best_seller_idx" ON "product"("is_best_seller");

-- CreateIndex
CREATE INDEX "product_category_id_idx" ON "product"("category_id");

-- CreateIndex
CREATE INDEX "product_image_product_id_idx" ON "product_image"("product_id");

-- CreateIndex
CREATE INDEX "solution_category_id_idx" ON "solution"("category_id");

-- CreateIndex
CREATE INDEX "solution_is_published_idx" ON "solution"("is_published");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "product_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solution" ADD CONSTRAINT "solution_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "solution_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "project_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_image" ADD CONSTRAINT "project_image_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
