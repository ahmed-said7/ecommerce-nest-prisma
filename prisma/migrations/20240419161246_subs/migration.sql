/*
  Warnings:

  - You are about to drop the `product_subcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_subcategory" DROP CONSTRAINT "product_subcategory_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_subcategory" DROP CONSTRAINT "product_subcategory_subcategoryId_fkey";

-- DropTable
DROP TABLE "product_subcategory";

-- CreateTable
CREATE TABLE "_productTosubcategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_productTosubcategory_AB_unique" ON "_productTosubcategory"("A", "B");

-- CreateIndex
CREATE INDEX "_productTosubcategory_B_index" ON "_productTosubcategory"("B");

-- AddForeignKey
ALTER TABLE "_productTosubcategory" ADD CONSTRAINT "_productTosubcategory_A_fkey" FOREIGN KEY ("A") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_productTosubcategory" ADD CONSTRAINT "_productTosubcategory_B_fkey" FOREIGN KEY ("B") REFERENCES "subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
