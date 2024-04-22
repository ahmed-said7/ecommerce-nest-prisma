/*
  Warnings:

  - A unique constraint covering the columns `[cartId,productId]` on the table `cart_product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cart_product_cartId_productId_key" ON "cart_product"("cartId", "productId");
