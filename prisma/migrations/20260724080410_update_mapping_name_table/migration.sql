/*
  Warnings:

  - You are about to drop the `ProjectProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectProduct" DROP CONSTRAINT "ProjectProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectProduct" DROP CONSTRAINT "ProjectProduct_projectId_fkey";

-- DropTable
DROP TABLE "ProjectProduct";

-- CreateTable
CREATE TABLE "project_product" (
    "projectId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "project_product_pkey" PRIMARY KEY ("projectId","productId")
);

-- AddForeignKey
ALTER TABLE "project_product" ADD CONSTRAINT "project_product_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_product" ADD CONSTRAINT "project_product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
