-- CreateTable
CREATE TABLE "ProjectProduct" (
    "projectId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProjectProduct_pkey" PRIMARY KEY ("projectId","productId")
);

-- AddForeignKey
ALTER TABLE "ProjectProduct" ADD CONSTRAINT "ProjectProduct_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectProduct" ADD CONSTRAINT "ProjectProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
