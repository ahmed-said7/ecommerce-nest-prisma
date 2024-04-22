/*
  Warnings:

  - A unique constraint covering the columns `[cartId,productId,color]` on the table `cart_product` will be added. If there are existing duplicate values, this will fail.
  - Made the column `color` on table `cart_product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "cart_product" DROP CONSTRAINT "cart_product_cartId_fkey";

-- DropForeignKey
ALTER TABLE "cart_product" DROP CONSTRAINT "cart_product_productId_fkey";

-- DropIndex
DROP INDEX "cart_product_cartId_productId_key";

-- AlterTable
ALTER TABLE "cart_product" ALTER COLUMN "color" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cart_product_cartId_productId_color_key" ON "cart_product"("cartId", "productId", "color");

-- AddForeignKey
ALTER TABLE "cart_product" ADD CONSTRAINT "cart_product_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_product" ADD CONSTRAINT "cart_product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
